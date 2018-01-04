import { IAsyncEnumerable } from "../async/IAsyncEnumerable"
import {
    ArgumentOutOfRangeException,
    ErrorString,
    IAsyncParallel,
    IComparer,
    IConstructor,
    IEqualityComparer,
    IGrouping,
    InvalidOperationException,
    ITuple,
    StrictEqualityComparer,
} from "../shared/shared"
import { DataType } from "./DataType"
import { IParallelEnumerable } from "./IParallelEnumerable"
import { ParallelEnumerable } from "./ParallelEnumerable"
import { TypedData } from "./TypedData"

export class BasicParallelEnumerable<TSource> implements IParallelEnumerable<TSource> {
    public readonly dataFunc: TypedData<TSource>

    public constructor(dataFunc: TypedData<TSource>) {
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
        return ParallelEnumerable.all(this, predicate)
    }

    public allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return ParallelEnumerable.allAsync(this, predicate)
    }

    public async any(predicate?: (x: TSource) => boolean): Promise<boolean> {
        return ParallelEnumerable.any(this, predicate)
    }

    public async anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return ParallelEnumerable.anyAsync(this, predicate)
    }

    public average(this: IParallelEnumerable<number>): Promise<number>
    public average(selector: (x: TSource) => number): Promise<number>
    public average(selector?: any): Promise<number> {
        return ParallelEnumerable.average(selector)
    }

    public averageAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return ParallelEnumerable.averageAsync(this, selector)
    }

    public concat(second: IAsyncParallel<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.concat(this, second)
    }

    public async contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return ParallelEnumerable.contains(this, value, comparer)
    }

    public count(predicate?: (x: TSource) => boolean): Promise<number> {
        return ParallelEnumerable.count(this, predicate)
    }

    public async countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number> {
        return ParallelEnumerable.countAsync(this, predicate)
    }

    public distinct(comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {
        return ParallelEnumerable.distinct(this, comparer)
    }

    public each(action: (x: TSource) => void): IParallelEnumerable<TSource> {
        return ParallelEnumerable.each(this, action)
    }

    public eachAsync(action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.eachAsync(this, action)
    }

    public async elementAt(index: number): Promise<TSource> {
        return ParallelEnumerable.elementAt(this, index)
    }

    public async elementAtOrDefault(index: number): Promise<TSource | null> {
        return ParallelEnumerable.elementAtOrDefault(this, index)
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
            case DataType.PromiseToArray:
            {
                const values = await dataFunc.generator()
                if (values.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return values[0]
                }
            }
            case DataType.ArrayOfPromises:
            {
                const promises = dataFunc.generator()
                if (promises.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await promises[0]
                }
            }
            case DataType.PromiseOfPromises:
            {
                const promises = await dataFunc.generator()
                if (promises.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await promises[0]
                }
            }
        }
    }

    public async firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        const data = await this.toArray()
        for (const value of data) {
            if (await predicate(value) === true) {
                return value
            }
        }

        throw new InvalidOperationException(ErrorString.NoMatch)
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
            case DataType.PromiseToArray:
            {
                const values = await dataFunc.generator()
                if (values.length === 0) {
                    return null
                } else {
                    return values[0]
                }
            }
            case DataType.ArrayOfPromises:
            {
                const promises = dataFunc.generator()
                if (promises.length === 0) {
                    return null
                } else {
                    return await promises[0]
                }
            }
            case DataType.PromiseOfPromises:
            {
                const promises = await dataFunc.generator()
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

    public async firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        const data = await this.toArray()
        for (const value of data) {
            if (await predicate(value) === true) {
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
            case DataType.PromiseToArray:
            {
                const values = await dataFunc.generator()
                if (values.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return values[values.length - 1]
                }
            }
            case DataType.ArrayOfPromises:
            {
                const promises = dataFunc.generator()
                if (promises.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await promises[promises.length - 1]
                }
            }
            case DataType.PromiseOfPromises:
            {
                const promises = await dataFunc.generator()
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
            case DataType.PromiseToArray:
            {
                const values = await dataFunc.generator()
                // Promise Array - Predicate
                for (let i = values.length - 1; i >= 0; i--) {
                    const value = values[i]
                    if (predicate(value)) {
                        return value
                    }
                }
                break
            }
            case DataType.ArrayOfPromises:
            {
                const promises = dataFunc.generator()
                // Promise Array - Predicate
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (predicate(value)) {
                        return value
                    }
                }
                break
            }
            case DataType.PromiseOfPromises:
            {
                const promises = await dataFunc.generator()
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

    public async lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case DataType.PromiseToArray:
            {
                const values = await dataFunc.generator()
                // Promise Array - Predicate
                for (let i = values.length - 1; i >= 0; i--) {
                    const value = values[i]
                    if (await predicate(value) === true) {
                        return value
                    }
                }
                break
            }
            case DataType.ArrayOfPromises:
            {
                const promises = dataFunc.generator()
                // Promise Array - Predicate
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (await predicate(value) === true) {
                        return value
                    }
                }
                break
            }
            case DataType.PromiseOfPromises:
            {
                const promises = await dataFunc.generator()
                // Promise Array - Predicate
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (await predicate(value) === true) {
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
            case DataType.PromiseToArray:
            {
                const values = await dataFunc.generator()
                if (values.length === 0) {
                    return null
                } else {
                    return values[values.length - 1]
                }
            }
            case DataType.ArrayOfPromises:
            {
                const promises = dataFunc.generator()
                if (promises.length === 0) {
                    return null
                } else {
                    return await promises[promises.length - 1]
                }
            }
            case DataType.PromiseOfPromises:
            {
                const promises = await dataFunc.generator()
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
            case DataType.PromiseToArray:
            {
                const values = await dataFunc.generator()
                for (let i = values.length - 1; i >= 0; i--) {
                    const value = values[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                break
            }
            case DataType.ArrayOfPromises:
            {
                const promises = dataFunc.generator()
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                break
            }
            case DataType.PromiseOfPromises:
            {
                const promises = await dataFunc.generator()
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

    public async lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case DataType.PromiseToArray:
            {
                const values = await dataFunc.generator()
                for (let i = values.length - 1; i >= 0; i--) {
                    const value = values[i]
                    if (await predicate(value) === true) {
                        return value
                    }
                }

                break
            }
            case DataType.ArrayOfPromises:
            {
                const promises = dataFunc.generator()
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (await predicate(value) === true) {
                        return value
                    }
                }

                break
            }
            case DataType.PromiseOfPromises:
            {
                const promises = await dataFunc.generator()
                for (let i = promises.length - 1; i >= 0; i--) {
                    const value = await promises[i]
                    if (await predicate(value) === true) {
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
        return ParallelEnumerable.max(this, selector)
    }

    public async maxAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return ParallelEnumerable.maxAsync(this, selector)
    }

    public async min(this: IParallelEnumerable<number>): Promise<number>
    public async min(selector: (x: TSource) => number): Promise<number>
    public async min(selector?: any): Promise<number> {
        return ParallelEnumerable.min(this, selector)
    }

    public async minAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return ParallelEnumerable.minAsync(this, selector)
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
        return ParallelEnumerable.select(this, key as any)
    }

    public selectAsync<OUT>(selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>
    public selectAsync<TKey extends keyof TSource, TResult>(
        this: IParallelEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IParallelEnumerable<TResult>
    public selectAsync<OUT>(keyOrSelector: string | ((x: TSource) => Promise<OUT>)): IParallelEnumerable<OUT> {
        return ParallelEnumerable.selectAsync(this as any, keyOrSelector as any)
    }

    public selectMany<OUT>(
        selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>
    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut> }, TOut>(
        this: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>
    public selectMany<OUT>(selector: ((x: TSource) => Iterable<OUT>) | string): IParallelEnumerable<OUT> {
        return ParallelEnumerable.selectMany(this as any, selector as any)
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
            case DataType.PromiseToArray:
            {
                const results = await dataFunc.generator()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                }

                return results[0]
            }
            case DataType.ArrayOfPromises:
            {
                const results = dataFunc.generator()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                }

                return results[0]
            }
            case DataType.PromiseOfPromises:
            {
                const results = await dataFunc.generator()
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

    public async singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        const results = await this.toArray()

        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of results) {
            if (await predicate(value) === true) {
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
            case DataType.PromiseToArray:
            {
                const results = await dataFunc.generator()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    return null
                }

                return results[0]
            }
            case DataType.ArrayOfPromises:
            {
                const results = dataFunc.generator()
                if (results.length > 1) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else if (results.length === 0) {
                    return null
                }

                return results[0]
            }
            case DataType.PromiseOfPromises:
            {
                const results = await dataFunc.generator()
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

    public async singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        const results = await this.toArray()

        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of results) {
            if (await predicate(value) === true) {
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
            case DataType.PromiseToArray:
            {
                const generator = async () => (await dataFunc.generator()).slice(count)
                return new BasicParallelEnumerable({
                    type: DataType.PromiseToArray,
                    generator,
                })
            }
            case DataType.ArrayOfPromises:
            {
                const generator = () => dataFunc.generator().slice(count)
                return new BasicParallelEnumerable({
                    type: DataType.ArrayOfPromises,
                    generator,
                })
            }
            case DataType.PromiseOfPromises:
            {
                const generator = async () => {
                    const dataInner = await dataFunc.generator()
                    return dataInner.slice(count)
                }
                const dataFuncNew: TypedData<TSource> = {
                    type: DataType.PromiseOfPromises,
                    generator,
                }
                // TODO: No Idea
                return new BasicParallelEnumerable(dataFuncNew as any)
            }
        }
    }

    public skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return ParallelEnumerable.skipWhile(this, predicate)
    }

    public skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.skipWhileAsync(this, predicate)
    }

    public sum(this: IParallelEnumerable<number>): Promise<number>
    public sum(selector: (x: TSource) => number): Promise<number>
    public sum(selector?: any): Promise<number> {
        return ParallelEnumerable.sum(this, selector)
    }

    public sumAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return ParallelEnumerable.sumAsync(this, selector)
    }

    public take(amount: number): IParallelEnumerable<TSource> {
        return ParallelEnumerable.take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return ParallelEnumerable.takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.takeWhileAsync(this, predicate)
    }

    public toArray(): Promise<TSource[]> {
        const dataFunc = this.dataFunc
        switch (dataFunc.type) {
            case DataType.PromiseToArray:
                return dataFunc.generator()
            case DataType.ArrayOfPromises:
                return Promise.all(dataFunc.generator())
            case DataType.PromiseOfPromises:
                return (async () => {
                    const data = await dataFunc.generator()
                    return Promise.all(data)
                })()
            default:
                throw new Error("Not Implemented")
        }
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>> {
        return ParallelEnumerable.toMap(this, selector)
    }

    public toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>> {
        return ParallelEnumerable.toMapAsync(this, selector)
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
        return ParallelEnumerable.where(this, predicate)
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
