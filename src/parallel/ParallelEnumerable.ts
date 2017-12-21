import { IAsyncEnumerable } from "../async/IAsyncEnumerable"
import {
    ArgumentOutOfRangeException,
    AsTuple,
    EqualityComparer,
    ErrorString,
    IAsyncParallel,
    IComparer,
    IConstructor,
    IEqualityComparer,
    IGrouping,
    InvalidOperationException,
    ITuple,
    RecOrdMap,
    StrictEqualityComparer } from "../shared/shared"
import { Grouping } from "../sync/sync"
import { DataType } from "./DataType"
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable"
import { IParallelEnumerable } from "./IParallelEnumerable"

export class BasicParallelEnumerable<TSource> implements IParallelEnumerable<TSource> {
    private readonly dataFunc: DataType<TSource>

    public constructor(dataFunc: DataType<TSource>) {
        this.dataFunc = dataFunc
    }

    public aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>
    public aggregate<TAccumulate>(
        seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
    public aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): Promise<TResult>
    public async aggregate(seed: any, func?: any, resultSelector?: any): Promise<any> {
        return ParallelEnumerable.aggregate(this, seed, func, resultSelector)
    }

    public all(predicate: (x: TSource) => boolean): Promise<boolean> {
        const nextIteration = this.nextIteration((x) => {
            if (!predicate(x)) {
                throw new Error(String(false))
            }
            return true
        })

        switch (nextIteration.type) {
            case "PromiseToArray":
               return nextIteration.data().then(() => true, () => false)
            case "ArrayOfPromises":
                return Promise.all(nextIteration.data()).then(() => true, () => false)
            case "PromiseOfPromises":
                return nextIteration.data().then(Promise.all).then(() => true, () => false)
        }
    }

    public async any(predicate?: (x: TSource) => boolean): Promise<boolean> {
        const nextIteration = this.nextIteration(predicate || ((_) => true))

        switch (nextIteration.type) {
            case "PromiseToArray":
               return nextIteration.data().then((values) => {
                   return values.some((x) => x)
               })
            case "ArrayOfPromises":
                return Promise.all(nextIteration.data()).then((values) => {
                    return values.some((x) => x)
                })
            case "PromiseOfPromises":
                return nextIteration.data().then(Promise.all).then((values) => {
                    return values.some((x) => x)
                })
        }
    }

    public average(this: IParallelEnumerable<number>): Promise<number>
    public average(selector: (x: TSource) => number): Promise<number>
    public average(selector?: any): Promise<number> {
        return ParallelEnumerable.average(selector)
    }

    public concat(second: IAsyncParallel<TSource>): IParallelEnumerable<TSource> {
        const generator = async () => {
            // Wait for both enumerables
            const promiseResults = await Promise.all([ this.toArray(), second.toArray() ])
            // Concat
            const firstData = promiseResults[0]
            const secondData = promiseResults[1]
            const data = new Array(firstData.length + secondData.length)
            let i = 0
            for (; i < firstData.length; i++) {
                data[i] = firstData[i]
            }

            for (let j = 0; j < secondData.length; j++, i++) {
                data[i] = secondData[j]
            }

            return data
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data: generator,
        })
    }

    public async contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        let values: DataType<boolean>
        if (comparer) {
            values = this.nextIteration((x) => comparer(value, x))
        } else {
            values = this.nextIteration((x) => x === value)
        }

        switch (values.type) {
            case "PromiseToArray":
            {
                const data = await values.data()
                return data.some((x) => x)
            }
            case "ArrayOfPromises":
            {
                const data = await Promise.all(values.data())
                return data.some((x) => x)
            }
            case "PromiseOfPromises":
            {
                const data = await Promise.all(await values.data())
                return data.some((x) => x)
            }
        }
    }

    public count(predicate?: (x: TSource) => boolean): Promise<number> {
        if (predicate) {
            return this.count_2(predicate)
        } else {
            return this.count_1()
        }
    }

    private async count_1(): Promise<number> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            case "PromiseOfPromises":
                const arrayData = await this.toArray()
                return arrayData.length
            case "ArrayOfPromises":
                const promises = dataFunc.data()
                return promises.length
        }
    }

    private async count_2(predicate: (x: TSource) => boolean): Promise<number> {
        const values = await this.toArray()
        let count = 0
        for (let i = 0; i < values.length; i++) {
            if (predicate(values[i]) === true) {
                count ++
            }
        }
        return count
    }

    public distinct(comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {
        const data = async () => {
            const distinctElements: TSource[] = []
            for (const item of await this.toArray()) {
                const foundItem = distinctElements.find((x) => comparer(x, item))
                if (!foundItem) {
                    distinctElements.push(item)
                }
            }
            return distinctElements
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public each(action: (x: TSource) => void): IParallelEnumerable<TSource> {
        return new BasicParallelEnumerable(this.nextIteration((x) => {
                action(x)
                return x
            }))
    }

    public async elementAt(index: number): Promise<TSource> {
        const dataFunc = this.dataFunc

        switch (dataFunc.type) {
            case "PromiseToArray":
               return dataFunc.data().then((values) => {
                    if (index >= values.length) {
                        throw new ArgumentOutOfRangeException("index")
                    } else {
                        return values[index]
                    }
                })
            case "ArrayOfPromises":
                return Promise.all(dataFunc.data()).then((values) => {
                    if (index >= values.length) {
                        throw new ArgumentOutOfRangeException("index")
                    } else {
                        return values[index]
                    }
                })
            case "PromiseOfPromises":
                return dataFunc.data().then(async (values) => {
                    if (index >= values.length) {
                        throw new ArgumentOutOfRangeException("index")
                    } else {
                        return await values[index]
                    }
                })
        }
    }

    public async elementAtOrDefault(index: number): Promise<TSource | null> {
        const dataFunc = this.dataFunc

        switch (dataFunc.type) {
            case "PromiseToArray":
               return dataFunc.data().then((values) => {
                    if (index >= values.length) {
                        return null
                    } else {
                        return values[index]
                    }
                })
            case "ArrayOfPromises":
                return Promise.all(dataFunc.data()).then((values) => {
                    if (index >= values.length) {
                        return null
                    } else {
                        return values[index]
                    }
                })
            case "PromiseOfPromises":
                return dataFunc.data().then(async (values) => {
                    if (index >= values.length) {
                        return null
                    } else {
                        return await values[index]
                    }
                })
        }
    }

    public except(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.except(this, second, comparer)
    }

    public first(predicate?: (x: TSource) => boolean): Promise<TSource> {
        if (predicate) {
            return this.first_2(predicate)
        } else {
            return this.first_1()
        }
    }

    private async first_1(): Promise<TSource> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const values = await dataFunc.data()
                if (values.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return values[0]
                }
            }
            case "ArrayOfPromises":
            {
                const promises = dataFunc.data()
                if (promises.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await promises[0]
                }
            }
            case "PromiseOfPromises":
            {
                const promises = await dataFunc.data()
                if (promises.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await promises[0]
                }
            }
        }
    }

    private async first_2(predicate: (x: TSource) => boolean): Promise<TSource> {
        const data = await this.toArray()
        for (const value of data) {
            if (predicate(value) === true) {
                return value
            }
        }

        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    public firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        if (predicate) {
            return this.firstOrDefault_2(predicate)
        } else {
            return this.firstOrDefault_1()
        }
    }

    private async firstOrDefault_1(): Promise<TSource | null> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const values = await dataFunc.data()
                if (values.length === 0) {
                    return null
                } else {
                    return values[0]
                }
            }
            case "ArrayOfPromises":
            {
                const promises = dataFunc.data()
                if (promises.length === 0) {
                    return null
                } else {
                    return await promises[0]
                }
            }
            case "PromiseOfPromises":
            {
                const promises = await dataFunc.data()
                if (promises.length === 0) {
                    return null
                } else {
                    return await promises[0]
                }
            }
        }
    }

    private async firstOrDefault_2(predicate: (x: TSource) => boolean): Promise<TSource | null> {
        const data = await this.toArray()
        for (const value of data) {
            if (predicate(value) === true) {
                return value
            }
        }

        return null
    }

    public groupBy(keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>
    public groupBy(keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
    public groupBy(keySelector: any, comparer?: any): IParallelEnumerable<any> {
        return ParallelEnumerable.groupBy(this, keySelector, comparer as any)
    }

    public groupByWithSel<TElement>(
        keySelector: (x: TSource) => number,
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>
    public groupByWithSel<TElement>(
        keySelector: (x: TSource) => string,
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel(keySelector: any, elementSelector: any, comparer?: any): IParallelEnumerable<any> {
        return ParallelEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer as any)
    }

    public intersect(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.intersect(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
        inner: IAsyncParallel<TInner>,
        outerKeySelector: (x: TSource) => TKey,
        innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult> {
        return ParallelEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: TSource) => boolean): Promise<TSource> {
        if (predicate) {
            return this.last_2(predicate)
        } else {
            return this.last_1()
        }
    }

    private async last_1(): Promise<TSource> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const values = await dataFunc.data()
                if (values.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return values[values.length - 1]
                }
            }
            case "ArrayOfPromises":
            {
                const promises = dataFunc.data()
                if (promises.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await promises[promises.length - 1]
                }
            }
            case "PromiseOfPromises":
            {
                const promises = await dataFunc.data()
                if (promises.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await promises[promises.length - 1]
                }
            }
        }
    }

    private async last_2(predicate: (x: TSource) => boolean): Promise<TSource> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const values = await dataFunc.data()
                // Promise Array - Predicate
                for (let i = values.length - 1; i >= 0; i--) {
                    const value = values[i]
                    if (predicate(value)) {
                        return value
                    }
                }
                break
            }
            case "ArrayOfPromises":
            {
                const promises = dataFunc.data()
                // Promise Array - Predicate
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (predicate(value)) {
                        return value
                    }
                }
                break
            }
            case "PromiseOfPromises":
            {
                const promises = await dataFunc.data()
                // Promise Array - Predicate
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (predicate(value)) {
                        return value
                    }
                }
                break
            }
        }

        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    public async lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        if (predicate) {
            return this.lastOrDefault_2(predicate)
        } else {
            return this.lastOrDefault_1()
        }
    }

    private async lastOrDefault_1(): Promise<TSource | null> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const values = await dataFunc.data()
                if (values.length === 0) {
                    return null
                } else {
                    return values[values.length - 1]
                }
            }
            case "ArrayOfPromises":
            {
                const promises = dataFunc.data()
                if (promises.length === 0) {
                    return null
                } else {
                    return await promises[promises.length - 1]
                }
            }
            case "PromiseOfPromises":
            {
                const promises = await dataFunc.data()
                if (promises.length === 0) {
                    return null
                } else {
                    return await promises[promises.length - 1]
                }
            }
        }
    }

    private async lastOrDefault_2(predicate: (x: TSource) => boolean): Promise<TSource | null> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const values = await dataFunc.data()
                for (let i = values.length - 1; i >= 0; i--) {
                    const value = values[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                break
            }
            case "ArrayOfPromises":
            {
                const promises = dataFunc.data()
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                break
            }
            case "PromiseOfPromises":
            {
                const promises = await dataFunc.data()
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                break
            }
        }

        return null
    }

    public async max(this: IParallelEnumerable<number>): Promise<number>
    public async max(selector: (x: TSource) => number): Promise<number>
    public async max(selector?: any): Promise<number> {
        let maxInfo: any[]
        if (selector) {
            const dataFunc = this.nextIteration<number>(selector)
            maxInfo = await new BasicParallelEnumerable(dataFunc).toArray()
        } else {
            maxInfo = await this.toArray()
        }

        if (maxInfo.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return Math.max.apply(null, maxInfo)
    }

    public async min(this: IParallelEnumerable<number>): Promise<number>
    public async min(selector: (x: TSource) => number): Promise<number>
    public async min(selector?: any): Promise<number> {
        let minInfo: any[]
        if (selector) {
            const dataFunc = this.nextIteration<number>(selector)
            minInfo = await new BasicParallelEnumerable(dataFunc).toArray()
        } else {
            minInfo = await this.toArray()
        }

        if (minInfo.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return Math.min.apply(null, minInfo)
    }

    // tslint:disable:ban-types
    public ofType(type: "object"): IParallelEnumerable<Object>
    public ofType(type: "function"): IParallelEnumerable<Function>
    public ofType(type: "symbol"): IParallelEnumerable<Symbol>
    public ofType(type: "boolean"): IParallelEnumerable<boolean>
    public ofType(type: "number"): IParallelEnumerable<number>
    public ofType(type: "string"): IParallelEnumerable<string>
    public ofType<TResult>(type: IConstructor<TResult>): IParallelEnumerable<TResult>
    public ofType<TResult>(type: string | IConstructor<TResult>): IParallelEnumerable<any> {
        return ParallelEnumerable.ofType(this, type)
    }

    public orderBy(predicate: (x: TSource) => string | number): IParallelEnumerable<TSource>
    public orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IParallelEnumerable<TSource>
    public orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IParallelEnumerable<TSource>
    public orderBy(predicate: any, comparer?: any): IParallelEnumerable<TSource> {
        return ParallelEnumerable.orderBy(this, predicate, comparer)
    }

    public orderByDescending(
        predicate: (x: TSource) => string | number): IParallelEnumerable<TSource>
    public orderByDescending(
        predicate: (x: TSource) => number, comparer: IComparer<number>): IParallelEnumerable<TSource>
    public orderByDescending(
        predicate: (x: TSource) => string, comparer: IComparer<string>): IParallelEnumerable<TSource>
    public orderByDescending(predicate: any, comparer?: any): IParallelEnumerable<TSource> {
        return ParallelEnumerable.orderByDescending(this, predicate, comparer)
    }

    public reverse(): IParallelEnumerable<TSource> {
        return ParallelEnumerable.reverse(this)
    }

    public select<OUT>(selector: (x: TSource) => OUT): IParallelEnumerable<OUT>
    public select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>
    public select<OUT>(key: string | ((x: TSource) => OUT)): IParallelEnumerable<any> {
        if (typeof key === "string") {
            return new BasicParallelEnumerable(this.nextIteration((x: any) => x[key] as OUT))
        } else {
            return new BasicParallelEnumerable(this.nextIteration(key))
        }
    }

    public selectAsync<OUT>(selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT> {
        const generator = this.nextIterationAsync(selector)
        return new BasicParallelEnumerable(generator)
    }

    public selectMany<OUT>(
        selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>
    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut> }, TOut>(
        this: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>
    public selectMany<OUT>(selector: ((x: TSource) => Iterable<OUT>) | string): IParallelEnumerable<any> {
        const data = async () => {
            let values: DataType<Iterable<OUT>>
            if (typeof selector === "string") {
                values = await this.nextIteration((x: any) => x[selector])
            } else {
                values = await this.nextIteration(selector)
            }

            const valuesArray = []
            switch (values.type) {
                case "PromiseToArray":
                {
                    for (const outer of await values.data()) {
                        for (const y of outer) {
                            valuesArray.push(y)
                        }
                    }

                    break
                }
                case "ArrayOfPromises":
                {
                    for (const outer of values.data()) {
                        for (const y of await outer) {
                            valuesArray.push(y)
                        }
                    }

                    break
                }
                case "PromiseOfPromises":
                {
                    for (const outer of await values.data()) {
                        for (const y of await outer) {
                            valuesArray.push(y)
                        }
                    }

                    break
                }
            }
            return valuesArray
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public sequenceEquals(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return ParallelEnumerable.sequenceEquals(this, second, comparer)
    }

    public async single(predicate?: (x: TSource) => boolean): Promise<TSource> {
        if (predicate) {
            return this.single_2(predicate)
        } else {
            return this.single_1()
        }
    }

    private async single_1(): Promise<TSource> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const results = await dataFunc.data()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                }

                return results[0]
            }
            case "ArrayOfPromises":
            {
                const results = dataFunc.data()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                }

                return results[0]
            }
            case "PromiseOfPromises":
            {
                const results = await dataFunc.data()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                }

                return await results[0]
            }
        }
    }

    private async single_2(predicate: (x: TSource) => boolean): Promise<TSource> {
        const results = await this.toArray()

        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of results) {
            if (predicate(value)) {
                if (hasValue === true) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else {
                    hasValue = true
                    singleValue = value
                }
            }
        }

        if (hasValue === false) {
            throw new InvalidOperationException(ErrorString.NoMatch)
        }

        return singleValue as TSource
    }

    public singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        if (predicate) {
            return this.singleOrDefault_2(predicate)
        } else {
            return this.singleOrDefault_1()
        }
    }

    private async singleOrDefault_1(): Promise<TSource | null> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const results = await dataFunc.data()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    return null
                }

                return results[0]
            }
            case "ArrayOfPromises":
            {
                const results = dataFunc.data()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    return null
                }

                return results[0]
            }
            case "PromiseOfPromises":
            {
                const results = await dataFunc.data()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    return null
                }

                return await results[0]
            }
        }
    }

    private async singleOrDefault_2(predicate: (x: TSource) => boolean): Promise<TSource | null> {
        const results = await this.toArray()

        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of results) {
            if (predicate(value)) {
                if (hasValue === true) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else {
                    hasValue = true
                    singleValue = value
                }
            }
        }

        return singleValue
    }

    public skip(count: number): IParallelEnumerable<TSource> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const data = async () => (await dataFunc.data()).slice(count)
                return new BasicParallelEnumerable({
                    type: "PromiseToArray",
                    data,
                })
            }
            case "ArrayOfPromises":
            {
                const data = () => dataFunc.data().slice(count)
                return new BasicParallelEnumerable({
                    type: "ArrayOfPromises",
                    data,
                })
            }
            case "PromiseOfPromises":
            {
                const data = async () => {
                    const dataInner = await dataFunc.data()
                    return dataInner.slice(count)
                }
                const dataFuncNew: DataType<TSource> = {
                    type: "PromiseOfPromises",
                    data,
                }
                // TODO: No Idea
                return new BasicParallelEnumerable(dataFuncNew as any)
            }
        }
    }

    public skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return ParallelEnumerable.skipWhile(this, predicate)
    }

    public sum(this: IParallelEnumerable<number>): Promise<number>
    public sum(this: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>
    public sum(selector?: any): Promise<number> {
        return ParallelEnumerable.sum(this, selector)
    }

    public take(amount: number): IParallelEnumerable<TSource> {
        return ParallelEnumerable.take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return ParallelEnumerable.takeWhile(this, predicate)
    }

    public toArray(): Promise<TSource[]> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
                return dataFunc.data()
            case "ArrayOfPromises":
                return Promise.all(dataFunc.data())
            case "PromiseOfPromises":
                return (async () => {
                    const data = await dataFunc.data()
                    return Promise.all(data)
                })()
            default:
                throw new Error("Not Implemented")
        }
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>> {
        return ParallelEnumerable.toMap(this, selector)
    }

    public toSet(): Promise<Set<TSource>> {
        return ParallelEnumerable.toSet(this)
    }

    public union(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.union(this, second, comparer)
    }

    public where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        const data = async () => {
            const values = await this.toArray()
            return values.filter(predicate)
        }
        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.whereAsync(this, predicate)
    }

    public zip<TSecond, TResult>(
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>
    public zip<TSecond>(
        second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSecond>): IParallelEnumerable<ITuple<TSource, TSecond>>
    public zip(second: any, resultSelector?: any): IParallelEnumerable<any> {
        return ParallelEnumerable.zip(this, second, resultSelector)
    }

    private nextIterationAsync<TOut>(
        onfulfilled: (x: TSource) => Promise<TOut>): DataType<TOut> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const data = async () => {
                    const results = await dataFunc.data()
                    const newPromises = new Array<Promise<TOut>>(results.length)
                    for (let i = 0; i < results.length; i++) {
                        newPromises[i] = onfulfilled(results[i])
                    }
                    return newPromises
                }
                return {
                    type: "PromiseOfPromises",
                    data,
                }
            }
            case "ArrayOfPromises":
            {
                const data = () => dataFunc
                    .data()
                    .map((promise) => promise.then(onfulfilled))
                return {
                    type: "ArrayOfPromises",
                    data,
                }
            }
            case "PromiseOfPromises":
            {
                const data = async () => {
                    const promises = await dataFunc.data()
                    return promises.map((promise) => promise.then(onfulfilled))
                }
                return {
                    type: "PromiseOfPromises",
                    data,
                }
            }
        }
    }

    private nextIteration<TOut>(onfulfilled: (x: TSource) => TOut): DataType<TOut> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case "PromiseToArray":
            {
                const data = () => dataFunc.data().then((x) => x.map(onfulfilled))
                return {
                    type: "PromiseToArray",
                    data,
                }
            }
            case "ArrayOfPromises":
            {
                const data = () => {
                    const previousData = dataFunc.data()
                    const newPromises = new Array<Promise<TOut>>(previousData.length)
                    for (let i = 0; i < previousData.length; i++) {
                        newPromises[i] = previousData[i].then(onfulfilled)
                    }
                    return newPromises
                }
                return {
                    type: "ArrayOfPromises",
                    data,
                }
            }
            case "PromiseOfPromises":
            {
                const data = async () => {
                    const previousData = await dataFunc.data()
                    const newPromises = new Array<Promise<TOut>>(previousData.length)
                    for (let i = 0; i < previousData.length; i++) {
                        newPromises[i] = previousData[i].then(onfulfilled)
                    }
                    return newPromises
                }
                return {
                    type: "PromiseOfPromises",
                    data,
                }
            }
        }
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TSource> {
        const toArray = this.toArray
        const thisOuter = this
        async function *iterator() {
            for (const value of await toArray.apply(thisOuter)) {
                yield value
            }
        }

        return iterator()
    }
}

class OrderedParallelEnumerable<T> extends BasicParallelEnumerable<T> implements IOrderedParallelEnumerable<T> {
    private static async unrollAndSort<T>(
        mapPromise: Promise<RecOrdMap<T>> | RecOrdMap<T>,
        comparer?: IComparer<string | number>): Promise<T[]> {

        const map = await mapPromise
        const returnValues = new Array<T>()

        for (const key of [...map.keys()].sort(comparer ? comparer : undefined)) {
            const values = map.get(key)

            if (values instanceof Map) {
                for (const value of await OrderedParallelEnumerable.unrollAndSort(values as RecOrdMap<T>, comparer)) {
                    returnValues.push(value)
                }
            } else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values as T[]) {
                    returnValues.push(value)
                }
            }
        }
        return returnValues
    }

    private static generate<T>(
        mapFunc: () => Promise<RecOrdMap<T>>,
        comparer?: IComparer<number | string>): DataType<T> {
        const data = () => OrderedParallelEnumerable.unrollAndSort(mapFunc(), comparer)
        return {
            type: "PromiseToArray",
            data,
        }
    }

    constructor(private readonly map: () => Promise<RecOrdMap<T>>, comparer?: IComparer<number | string>) {
        super(OrderedParallelEnumerable.generate(map, comparer))
    }

    public getMap(): Promise<RecOrdMap<T>> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: any, comparer?: any): IOrderedParallelEnumerable<T> {
        return ParallelEnumerable.thenBy(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any): IOrderedParallelEnumerable<T> {
        return ParallelEnumerable.thenByDescending(this, keySelector, comparer)
    }
}

class OrderedParallelEnumerableDescending<T> extends BasicParallelEnumerable<T>
    implements IOrderedParallelEnumerable<T> {
    private static async unrollAndSort<T>(
        mapPromise: Promise<RecOrdMap<T>> | RecOrdMap<T>,
        comparer?: IComparer<string | number>): Promise<T[]> {

        const map = await mapPromise

        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

        const returnValues = new Array<T>()
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i]
            const values = map.get(key)

            if (values instanceof Map) {
                for (const value of await OrderedParallelEnumerableDescending.unrollAndSort(values, comparer)) {
                    returnValues.push(value as any)
                }
            } else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values as T[]) {
                    returnValues.push(value)
                }
            }
        }
        return returnValues
    }

    private static generate<T>(
        mapFunc: () => Promise<RecOrdMap<T>>,
        comparer?: IComparer<number | string>): DataType<T> {
        const data = () => OrderedParallelEnumerableDescending.unrollAndSort(mapFunc(), comparer)
        return {
            type: "PromiseToArray",
            data,
        }
    }

    constructor(private readonly map: () => Promise<RecOrdMap<T>>, comparer?: IComparer<number | string>) {
        super(OrderedParallelEnumerableDescending.generate(map, comparer))
    }

    public getMap(): Promise<RecOrdMap<T>> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: any, comparer?: any): IOrderedParallelEnumerable<T> {
        return ParallelEnumerable.thenBy(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any): IOrderedParallelEnumerable<T> {
        return ParallelEnumerable.thenByDescending(this, keySelector, comparer)
    }
}

export class ParallelEnumerable {

    private constructor() {
        //
    }

    //#region Static Members

    public static aggregate<TSource>(
        source: AsyncIterable<TSource>,
        func: (x: TSource, y: TSource) => TSource): Promise<TSource>
    public static aggregate<TSource, TAccumulate>(
        source: AsyncIterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
    public static aggregate<TSource, TAccumulate, TResult>(
        source: AsyncIterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): Promise<TResult>
    public static aggregate<TSource, TAccumulate, TResult>(
        source: AsyncIterable<TSource>,
        seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
        func?: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector?: (x: TAccumulate) => TResult): Promise<TSource | TAccumulate | TResult | null> {
        if (resultSelector) {
            if (!func) {
                throw new ReferenceError(`TAccumulate function is undefined`)
            }

            return ParallelEnumerable.aggregate_3(source, seedOrFunc as TAccumulate, func, resultSelector)
        } else if (func) {
            return ParallelEnumerable.aggregate_2(source, seedOrFunc as TAccumulate, func)
        } else {
            return ParallelEnumerable.aggregate_1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
        }
    }

    private static async aggregate_1<TSource>(
        source: AsyncIterable<TSource>,
        func: (x: TSource, y: TSource) => TSource): Promise<TSource> {
        let aggregateValue: TSource | undefined

        for await (const value of source) {
            if (aggregateValue) {
                aggregateValue = func(aggregateValue, value)
            } else {
                aggregateValue = value
            }
        }

        if (aggregateValue === undefined) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return aggregateValue
    }

    private static async aggregate_2<TSource, TAccumulate>(
        source: AsyncIterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate> {
        let aggregateValue = seed

        for await (const value of source) {
            aggregateValue = func(aggregateValue, value)
        }

        return aggregateValue
    }

    private static async aggregate_3<TSource, TAccumulate, TResult>(
        source: AsyncIterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): Promise<TResult> {
        let aggregateValue = seed

        for await (const value of source) {
            aggregateValue = func(aggregateValue, value)
        }

        return resultSelector(aggregateValue)
    }

    public static average(
        source: IAsyncParallel<number>): Promise<number>
    public static average<TSource>(
        source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>
    public static average<TSource>(
        source: IAsyncParallel<TSource> | IAsyncParallel<number>,
        selector?: (x: TSource) => number): Promise<number> {
        if (selector) {
            return ParallelEnumerable.average_2(source as IAsyncParallel<TSource>, selector)
        } else {
            return ParallelEnumerable.average_1(source as IAsyncParallel<number>)
        }
    }

    private static async average_1(source: IAsyncParallel<number>): Promise<number> {
        let value: number | undefined
        let count: number | undefined
        for await (const item of source) {
            value = (value || 0) + item
            count = (count || 0) + 1
        }

        if (value === undefined) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return value / (count as number)
    }

    private static async average_2<TSource>(
        source: IAsyncParallel<TSource>, func: (x: TSource) => number): Promise<number> {
        let value: number | undefined
        let count: number | undefined
        for await (const item of source) {
            value = (value || 0) + func(item)
            count = (count || 0) + 1
        }

        if (value === undefined) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return value / (count as number)
    }

    public static except<TSource>(
        first: IAsyncParallel<TSource>,
        second: IAsyncParallel<TSource>,
        comparer: IEqualityComparer<TSource> = EqualityComparer): IParallelEnumerable<TSource> {

        const data = async () => {
            const values = await Promise.all([ first.toArray(), second.toArray() ])
            const firstValues = values[0]
            const secondValues = values[1]
            const resultValues = []

            for (const firstItem of firstValues) {

                let exists = false
                for (let j = 0; j < secondValues.length; j++) {
                    const secondItem = secondValues[j]

                    if (comparer(firstItem, secondItem) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    resultValues.push(firstItem)
                }
            }

            return resultValues
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static flatten<TSource>(
        source: IAsyncParallel<TSource | IAsyncParallel<TSource>>): IParallelEnumerable<TSource>
    public static flatten<TSource>(
        source: IAsyncParallel<TSource | IAsyncParallel<TSource>>,
        shallow: false): IParallelEnumerable<TSource>
    public static flatten<TSource>(
        source: IAsyncParallel<TSource | IAsyncParallel<TSource>>,
        shallow: true): IParallelEnumerable<TSource | AsyncIterable<TSource>>
    public static flatten<TSource>(
        source: IAsyncParallel<TSource | IAsyncParallel<TSource>>,
        shallow?: boolean): IParallelEnumerable<TSource | AsyncIterable<TSource>> {

        async function* iterator(sourceInner: AsyncIterable<any>)
            : AsyncIterableIterator<TSource | AsyncIterable<TSource>> {
            for await (const item of sourceInner) {
                if (item[Symbol.asyncIterator] !== undefined) {
                    const items = shallow ? item : iterator(item as AsyncIterable<any>)
                    for await (const inner of items) {
                        yield inner
                    }
                } else {
                    yield item
                }
            }
        }

        const data = async () => {
            const results = new Array()
            for await (const x of iterator(source)) {
                results.push(x)
            }
            return results
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static from<TSource>(
        type: "ArrayOfPromises",
        generator: () => Array<Promise<TSource>>): IParallelEnumerable<TSource>
    public static from<TSource>(
        type: "PromiseToArray",
        generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>
    public static from<TSource>(
        type: "PromiseOfPromises",
        generator: () => Promise<Array<Promise<TSource>>>): IParallelEnumerable<TSource>
    public static from<TSource>(
        type: string,
        generator: () => any) {
        return new BasicParallelEnumerable<TSource>({
            type,
            data: generator,
        } as any)
    }

    public static groupBy<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
    public static groupBy<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
    public static groupBy<TSource, TKey>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
    public static groupBy<TSource, TKey>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<any, TSource>> {

        if (comparer) {
            return ParallelEnumerable.groupBy_0<TSource, TKey>(source,
                keySelector as (x: TSource) => TKey, comparer)
        } else {
            return ParallelEnumerable.groupBy_0_Simple(source,
                keySelector as ((x: TSource) => number) | ((x: TSource) => string))
        }
    }

    private static groupBy_0_Simple<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
            IParallelEnumerable<IGrouping<string | number, TSource>> {

        const data = async () => {
            const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
            for (const value of await source.toArray()) {

                const key = keySelector(value)
                const grouping: Grouping<string | number, TSource> = keyMap[key]

                if (grouping) {
                    grouping.push(value)
                } else {
                    keyMap[key] = new Grouping<string | number, TSource>(key, value)
                }
            }

            const results = new Array<IGrouping<string | number, TSource>>()
            /* tslint:disable:forin */
            for (const value in keyMap) {
                results.push(keyMap[value])
            }
            /* tslint:enable:forin */
            return results
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    private static groupBy_0<TSource, TKey>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>> {

        const data = async () => {

            const keyMap = new Array<Grouping<TKey, TSource>>()

            for (const value of await source.toArray()) {
                const key = keySelector(value)
                let found = false

                for (let i = 0; i < keyMap.length; i++) {
                    const group = keyMap[i]
                    if (comparer(group.key, key)) {
                        group.push(value)
                        found = true
                        break
                    }
                }

                if (found === false) {
                    keyMap.push(new Grouping<TKey, TSource>(key, value))
                }

            }

            const results = new Array<Grouping<TKey, TSource>>()
            for (const g of keyMap) {
                results.push(g)
            }
            return results as Array<IGrouping<TKey, TSource>>
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static groupByWithSel<TSource, TElement>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>
    public static groupByWithSel<TSource, TElement>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement,
        comparer?: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<any, TElement>> {

        if (comparer) {
            return ParallelEnumerable.groupBy_1(source,
                keySelector as (x: TSource) => TKey, elementSelector, comparer)
        } else {
            return ParallelEnumerable.groupBy_1_Simple(source,
                keySelector as (x: TSource) => number | string, elementSelector)
        }
    }

    private static groupBy_1_Simple<TSource, TElement>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => string | number,
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string | number, TElement>> {

        // generate(): AsyncIterableIterator<IGrouping<string | number, TElement>>
        const data = async () => {
            const keyMap: { [key: string]: Grouping<string | number, TElement> } = {}
            for (const value of await source.toArray()) {

                const key = keySelector(value)
                const grouping: Grouping<string | number, TElement> = keyMap[key]
                const element = elementSelector(value)

                if (grouping) {
                    grouping.push(element)
                } else {
                    keyMap[key] = new Grouping<string | number, TElement>(key, element)
                }
            }

            /* tslint:disable:forin */
            const results = new Array<IGrouping<string | number, TElement>>()
            for (const value in keyMap) {
                results.push(keyMap[value])
            }
            /* tslint:enable:forin */
            return results
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    private static groupBy_1<TSource, TKey, TElement>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>> {

        const data = async () => {
            const keyMap = new Array<Grouping<TKey, TElement>>()
            for await (const value of source) {
                const key = keySelector(value)
                let found = false

                for (let i = 0; i < keyMap.length; i++) {
                    const group = keyMap[i]
                    if (comparer(group.key, key)) {
                        group.push(elementSelector(value))
                        found = true
                        break
                    }
                }

                if (found === false) {
                    const element = elementSelector(value)
                    keyMap.push(new Grouping<TKey, TElement>(key, element))
                }

            }

            const results = new Array<IGrouping<TKey, TElement>>()
            for (const value of keyMap) {
                results.push(value)
            }
            return results
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncParallel<TOuter>,
        inner: IAsyncParallel<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult): IParallelEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncParallel<TOuter>,
        inner: IAsyncParallel<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncParallel<TOuter>,
        inner: IAsyncParallel<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IParallelEnumerable<TResult> {
        const data = async () => {
            const innerOuter = await Promise.all([inner.toArray(), outer.toArray()])
            const innerArray = innerOuter[0]
            const outerArray = innerOuter[1]

            const results = new Array<TResult>()
            for (const o of outerArray) {
                const outerKey = outerKeySelector(o)

                for (const i of innerArray) {
                    const innerKey = innerKeySelector(i)
                    if (comparer(outerKey, innerKey) === true) {
                        results.push(resultSelector(o, i))
                    }
                }
            }
            return results
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static intersect<TSource>(
        first: IParallelEnumerable<TSource>,
        second: IAsyncParallel<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {

        const data = async () => {

            const firstResults = await first.distinct(comparer).toArray()

            if (firstResults.length === 0) {
                return []
            }

            const secondResults = await second.toArray()

            const results = new Array<TSource>()
            for (let i = 0; i < firstResults.length; i++) {
                const firstValue = firstResults[i]

                for (let j = 0; j < secondResults.length; j++) {
                    const secondValue = secondResults[j]

                    if (comparer(firstValue, secondValue) === true) {
                        results.push(firstValue)
                        break
                    }
                }
            }
            return results
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static skip<TSource>(source: IAsyncParallel<TSource>, count: number): IParallelEnumerable<TSource> {
        const data = async () => {
            return (await source.toArray()).slice(count)
        }
        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static skipWhile<TSource>(
        source: IAsyncParallel<TSource>,
        predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        const data = async () => {
            const values = await source.toArray()
            let i = 0
            for (; i < values.length; i++) {
                const value = values[i]
                if (predicate(value, i) === false) {
                    break
                }
            }

            const returnedValues = []
            for (; i < values.length; i++) {
                returnedValues.push(values[i])
            }
            return returnedValues
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static ofType<TSource, TResult>(
        source: IAsyncParallel<TSource>,
        type?: IConstructor<TResult> | string): IParallelEnumerable<TResult> {

        const typeCheck: (x: TSource) => boolean = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof (type as any))

        const data = async () =>
            (await source.toArray()).filter(typeCheck)

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data: data as any,
        })
    }

    public static orderBy<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => string): IOrderedParallelEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => number): IOrderedParallelEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedParallelEnumerable<TSource> {
        return new OrderedParallelEnumerable(ParallelEnumerable.orderByInner(source, keySelector), comparer as any)
    }

    private static orderByInner<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => number | string): () => Promise<Map<number | string, TSource[]>> {
        return async function lazyMap(): Promise<Map<number | string, TSource[]>> {
            const map = new Map<number | string, TSource[]>()
            for await (const item of source) {
                const key = keySelector(item)
                const currentMapping = map.get(key)

                if (currentMapping) {
                    currentMapping.push(item)
                } else {
                    map.set(key, [item])
                }
            }

            return map
        }
    }

    public static orderByDescending<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => string): IOrderedParallelEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => number): IOrderedParallelEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncParallel<TSource>,
        keySelector: (x: TSource) => number | string,
        comparer?: IComparer<number> | IComparer<string>): IOrderedParallelEnumerable<TSource> {
        return new OrderedParallelEnumerableDescending(
            ParallelEnumerable.orderByInner(source, keySelector), comparer as any)
    }

    public static range(start: number, count: number): IParallelEnumerable<number> {
        const data = async () => {
            const items = new Array<Promise<number>>(count)
            const max = start + count
            for (let i = start, j = 0; i < max; i++, j++) {
                items[j] = new Promise<number>((resolve) => resolve(i))
            }
            return items
        }

        return new BasicParallelEnumerable<number>({
            type: "PromiseOfPromises",
            data,
        })
    }

    public static repeat<T>(
        element: T, count: number, delay?: number): IParallelEnumerable<T> {
        if (delay) {
            return ParallelEnumerable.repeat_2(element, count, delay)
        } else {
            return ParallelEnumerable.repeat_1(element, count)
        }
    }

    private static repeat_1<T>(element: T, count: number): IParallelEnumerable<T> {
        const data = async () => {
            const values = new Array<T>(count)
            for (let i = 0; i < count; i++) {
                values[i] = element
            }
            return values
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    private static repeat_2<T>(element: T, count: number, delay: number): IParallelEnumerable<T> {
        const data = async () => {
            const values = new Array<Promise<T>>(count)
            for (let i = 0; i < count; i++) {
                values[i] = new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
            }
            return values
        }

        return new BasicParallelEnumerable<T>({
            type: "PromiseOfPromises",
            data,
        })
    }

    public static reverse<TSource>(
        source: IAsyncParallel<TSource>): IParallelEnumerable<TSource> {
        const data = async () => {
            const values = await source.toArray()
            return values.reverse()
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static async sequenceEquals<TSource>(
        first: IAsyncParallel<TSource>,
        second: IAsyncParallel<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {

        const firstArray = await first.toArray()
        const secondArray = await second.toArray()

        if (firstArray.length !== secondArray.length) {
            return false
        }

        for (let i = 0; i < firstArray.length; i++) {
            const firstResult = firstArray[i]
            const secondResult = secondArray[i]

            if (comparer(firstResult, secondResult) === false) {
                return false
            }
        }

        return true
    }

    public static sum(
        source: IAsyncParallel<number>): Promise<number>
    public static sum<TSource>(
        source: IAsyncParallel<TSource>,
        selector: (x: TSource) => number): Promise<number>
    public static sum<TSource>(
        source: IAsyncParallel<TSource> | IAsyncParallel<number>,
        selector?: (x: TSource) => number): Promise<number> {

        if (selector) {
            return ParallelEnumerable.sum_2(source as IAsyncParallel<TSource>, selector)
        } else {
            return ParallelEnumerable.sum_1(source as IAsyncParallel<number>)
        }
    }

    private static async sum_1(
        source: IAsyncParallel<number>): Promise<number> {
        let sum = 0
        for (const value of await source.toArray()) {
            sum += value
        }

        return sum
    }

    private static async sum_2<TSource>(
        source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number> {
        let sum = 0
        for (const value of await source.toArray()) {
            sum += selector(value)
        }

        return sum
    }

    public static take<TSource>(
        source: IAsyncParallel<TSource>,
        amount: number): IParallelEnumerable<TSource> {
        const data = async () => {
            // negative amounts should yield empty
            const amountLeft = amount > 0 ? amount : 0
            const values = await source.toArray()
            return values.splice(0, amountLeft)
        }

        return new BasicParallelEnumerable<TSource>({
            type: "PromiseToArray",
            data,
        })
    }

    public static takeWhile<TSource>(
        source: IAsyncParallel<TSource>,
        predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        const data = async () => {
            const values = await source.toArray()
            const results = new Array<TSource>()
            if (predicate.length === 1) {
                for (const value of values) {
                    if ((predicate as (x: TSource) => boolean)(value) === true) {
                        results.push(value)
                    } else {
                        break
                    }
                }
            } else {
                for (let i = 0; i < values.length; i++) {
                    const value = values[i]
                    if (predicate(value, i) === true) {
                        results.push(value)
                    } else {
                        break
                    }
                }
            }
            return results
        }

        return new BasicParallelEnumerable<TSource>({
            type: "PromiseToArray",
            data,
        })
    }

    public static thenBy<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedParallelEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedParallelEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedParallelEnumerable<TSource> {

        function sortInnerMost(item: TSource[] | RecOrdMap<TSource>): RecOrdMap<TSource> {

            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, sortInnerMost(item.get(key) as TSource[] | RecOrdMap<TSource>))
                }

                return item
            } else {
                const map = new Map<number | string, TSource[]>()
                for (let i = 0; i < item.length; i++) {
                    const value = item[i]
                    const key = keySelector(value)

                    const mapping = map.get(key)
                    if (mapping) {
                        mapping.push(value)
                    } else {
                        map.set(key, [value])
                    }
                }

                return map
            }
        }

        return new OrderedParallelEnumerable(async () => sortInnerMost(await source.getMap()), comparer as any)
    }

    public static thenByDescending<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedParallelEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedParallelEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedParallelEnumerable<TSource> {

        function sortInnerMost(item: TSource[] | RecOrdMap<TSource>): RecOrdMap<TSource> {

            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, sortInnerMost(item.get(key) as TSource[] | RecOrdMap<TSource>))
                }

                return item
            } else {
                const map = new Map<number | string, TSource[]>()
                for (let i = 0; i < item.length; i++) {
                    const value = item[i]
                    const key = keySelector(value)

                    const mapping = map.get(key)
                    if (mapping) {
                        mapping.push(value)
                    } else {
                        map.set(key, [value])
                    }
                }

                return map
            }
        }

        return new OrderedParallelEnumerableDescending(
            async () => sortInnerMost(await source.getMap()), comparer as any)
    }

    public static async toMap<K, V>(
        source: AsyncIterable<V>,
        selector: (x: V) => K): Promise<Map<K, V[]>> {
        const map = new Map<K, V[]>()

        for await (const value of source) {
            const key = selector(value)
            const array = map.get(key)

            if (array === undefined) {
                map.set(key, [value])
            } else {
                array.push(value)
            }
        }

        return map
    }

    public static async toObject<TSource>(
        source: AsyncIterable<TSource>,
        selector: (x: TSource) => string): Promise<{[key: string]: TSource}> {

        const map: {[key: string]: TSource} = {}

        for await (const value of source) {
            map[selector(value)] = value
        }

        return map
    }

    public static async toSet<TSource>(
        source: AsyncIterable<TSource>): Promise<Set<TSource>> {
        const set = new Set<TSource>()
        for await (const item of source) {
            set.add(item)
        }
        return set
    }

    public static union<TSource>(
        first: IAsyncParallel<TSource>,
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        if (comparer) {
            return ParallelEnumerable.union_2(first, second, comparer)
        } else {
            return ParallelEnumerable.union_1(first, second)
        }
    }

    private static union_1<TSource>(
        first: IAsyncParallel<TSource>,
        second: IAsyncParallel<TSource>) {

        async function data() {

            const set = new Set<TSource>()
            const secondPromise = second.toArray()

            for await (const item of first) {
                if (set.has(item) === false) {
                    set.add(item)
                }
            }

            const secondValues = await secondPromise
            for (const item of secondValues) {
                if (set.has(item) === false) {
                    set.add(item)
                }
            }

            return [... set.keys()]
        }

        return new BasicParallelEnumerable<TSource>({
            type: "PromiseToArray",
            data,
        })
    }

    private static union_2<TSource>(
        first: IAsyncParallel<TSource>,
        second: IAsyncParallel<TSource>,
        comparer: IEqualityComparer<TSource>) {

        const data = async () => {
            const result: TSource[] = []
            const values = await Promise.all([ first.toArray(), second.toArray() ])
            for (const source of values) {
                for (const value of source) {
                    let exists = false

                    for (const resultValue of result) {
                        if (comparer(value, resultValue) === true) {
                            exists = true
                            break
                        }
                    }

                    if (exists === false) {
                        result.push(value)
                    }
                }
            }

            return result
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static whereAsync<T>(
        source: IAsyncParallel<T>,
        predicate: (x: T, index: number) => Promise<boolean>) {
        const data = async () => {
            const values = await source.toArray()
            const valuesAsync = values.map(async (x, i) => {
                const keep = await predicate(x, i)
                return {
                    keep,
                    x,
                }
            })
            const filteredValues = []
            for (const value of await Promise.all(valuesAsync)) {
                if (value.keep) {
                    filteredValues.push(value.x)
                }
            }
            return filteredValues
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    public static zip<T, Y>(
        source: IAsyncParallel<T>,
        second: IAsyncParallel<Y>): IParallelEnumerable<ITuple<T, Y>>
    public static zip<T, Y, OUT>(
        source: IAsyncParallel<T>,
        second: IAsyncParallel<Y>,
        resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT>
    public static zip<T, Y, OUT>(
        source: IAsyncParallel<T>,
        second: IAsyncParallel<Y>,
        resultSelector?: (x: T, y: Y) => OUT): IParallelEnumerable<OUT> | IParallelEnumerable<ITuple<T, Y>> {
        if (resultSelector) {
            return ParallelEnumerable.zip_2(source, second, resultSelector)
        } else {
            return ParallelEnumerable.zip_1(source, second)
        }
    }

    private static zip_1<T, Y>(
        source: IAsyncParallel<T>,
        second: IAsyncParallel<Y>): IParallelEnumerable<ITuple<T, Y>> {
        async function data() {
            const items = await Promise.all([source.toArray(), second.toArray()])
            const max = items[0].length > items[1].length ? items[0].length : items[1].length
            const results = new Array<ITuple<T, Y>>(max)
            for (let i = 0; i < max; i++) {
                const a = items[0][i]
                const b = items[1][i]
                results[i] = AsTuple(a, b)
            }
            return results
        }
        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    private static zip_2<T, Y, OUT>(
        source: IAsyncParallel<T>,
        second: IAsyncParallel<Y>,
        resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT> {
        async function data() {
            const items = await Promise.all([source.toArray(), second.toArray()])
            const max = items[0].length > items[1].length ? items[0].length : items[1].length
            const results = new Array<OUT>(max)
            for (let i = 0; i < max; i++) {
                const a = items[0][i]
                const b = items[1][i]
                results[i] = resultSelector(a, b)
            }
            return results
        }

        return new BasicParallelEnumerable({
            type: "PromiseToArray",
            data,
        })
    }

    //#endregion
}
