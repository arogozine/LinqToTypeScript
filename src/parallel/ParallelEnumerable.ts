import { IAsyncEnumerable } from "../async/IAsyncEnumerable"
import {
    ArgumentOutOfRangeException,
    AsTuple,
    EqualityComparer,
    ErrorString,
    IComparer,
    IConstructor,
    IEqualityComparer,
    IGrouping,
    InvalidOperationException,
    ITuple,
    RecOrdMap,
    StrictEqualityComparer } from "../shared/shared"
import { Grouping } from "../sync/sync"
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable"
import { IParallelEnumerable } from "./IParallelEnumerable"

export class BasicParallelEnumerable<TSource> implements IParallelEnumerable<TSource> {
    private readonly dataFunc: () => (Array<Promise<TSource>> | Promise<TSource[]>)

    public constructor(promise: () => Promise<TSource[]>)
    public constructor(dataFunc: () => Array<Promise<TSource>>)
    public constructor(dataFunc: () => (Array<Promise<TSource>> | Promise<TSource[]>)) {
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
        return ParallelEnumerable.aggregate(seed, func, resultSelector)
    }

    public all(predicate: (x: TSource) => boolean): Promise<boolean> {
        return this.nextIteration((x) => {
            if (!predicate(x)) {
                throw new Error(String(false))
            }
            return true
        }).then(() => true, () => false)
    }

    public async any(predicate?: (x: TSource) => boolean): Promise<boolean> {
        const promiseResults = await this.nextIteration(predicate || ((_) => true))

        if (predicate) {
            return promiseResults.length !== 0 && promiseResults.some((x) => x)
        } else {
            return promiseResults.length !== 0
        }
    }

    public average(this: IParallelEnumerable<number>): Promise<number>
    public average(selector: (x: TSource) => number): Promise<number>
    public average(selector?: any): Promise<number> {
        return ParallelEnumerable.average(selector)
    }

    public concat(second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>): IParallelEnumerable<TSource> {
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

        return new BasicParallelEnumerable(generator)
    }

    public async contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        let values: boolean[]
        if (comparer) {
            values = await this.nextIteration((x) => comparer(value, x))
        } else {
            values = await this.nextIteration((x) => x === value)
        }

        return values.some((x) => x)
    }

    public async count(predicate?: (x: TSource) => boolean): Promise<number> {
        if (predicate) {
            const values = await this.toArray()
            let count = 0
            for (let i = 0; i < values.length; i++) {
                if (predicate(values[i]) === true) {
                    count ++
                }
            }
            return count
        } else {
            const data = this.dataFunc()
            if (Array.isArray(data)) {
                return data.length
            } else {
                return (await data).length
            }
        }
    }

    public distinct(comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {
        const iterator = async () => {
            const distinctElements: TSource[] = []
            await this.nextIteration((item) => {
                const foundItem = distinctElements.find((x) => comparer(x, item))
                if (!foundItem) {
                    distinctElements.push(item)
                }
            })
            return distinctElements
        }

        return new BasicParallelEnumerable(iterator)
    }

    public each(action: (x: TSource) => void): IParallelEnumerable<TSource> {
        return new BasicParallelEnumerable(() => {
            return this.nextIteration((x) => {
                action(x)
                return x
            })
        })
    }

    public async elementAt(index: number): Promise<TSource> {
        const data = this.dataFunc()
        if (Array.isArray(data)) {
            if (index >= data.length) {
                throw new ArgumentOutOfRangeException("index")
            } else {
                return await data[index]
            }
        } else {
            const dataArray = await data
            if (index >= dataArray.length) {
                throw new ArgumentOutOfRangeException("index")
            } else {
                return await dataArray[index]
            }
        }
    }

    public async elementAtOrDefault(index: number): Promise<TSource | null> {
        const data = this.dataFunc()
        if (Array.isArray(data)) {
            if (index >= data.length) {
                return null
            } else {
                return await data[index]
            }
        } else {
            const dataArray = await data
            if (index >= dataArray.length) {
                return null
            } else {
                return await dataArray[index]
            }
        }
    }

    public except(
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>,
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
        const dataPromises = this.dataFunc()
        if (Array.isArray(dataPromises)) {
            if (dataPromises.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return await dataPromises[0]
        } else {
            const data = await dataPromises
            if (data.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return data[0]
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
        const dataPromises = this.dataFunc()
        if (Array.isArray(dataPromises)) {
            if (dataPromises.length === 0) {
                return null
            }

            return await dataPromises[0]
        } else {
            const data = await dataPromises
            if (data.length === 0) {
                return null
            } else {
                return data[0]
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
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.intersect(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
        inner: IAsyncEnumerable<TInner> | IParallelEnumerable<TInner>,
        outerKeySelector: (x: TSource) => TKey,
        innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult> {
        return ParallelEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public async last(predicate?: (x: TSource) => boolean): Promise<TSource> {

        const dataPromises = this.dataFunc()
        if (Array.isArray(dataPromises)) {
            if (predicate) {
                // Promise Array - Predicate
                for (let i = dataPromises.length - 1; i >= 0; i--) {
                    const value = await dataPromises[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                throw new InvalidOperationException(ErrorString.NoMatch)
            } else {
                // Promise Array - No Predicate
                if (dataPromises.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await dataPromises[dataPromises.length - 1]
                }
            }
        } else {
            const values = await dataPromises

            if (predicate) {
                for (let i = values.length - 1; i >= 0; i--) {
                    const value = values[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                throw new InvalidOperationException(ErrorString.NoMatch)
            } else {
                if (values.length === 0) {
                    throw new InvalidOperationException(ErrorString.NoElements)
                } else {
                    return await values[values.length - 1]
                }
            }
        }
    }

    public async lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        const dataPromises = this.dataFunc()
        if (Array.isArray(dataPromises)) {
            if (predicate) {
                // Promise Array - Predicate
                for (let i = dataPromises.length - 1; i >= 0; i--) {
                    const value = await dataPromises[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                return null
            } else {
                // Promise Array - No Predicate
                if (dataPromises.length === 0) {
                    return null
                } else {
                    return await dataPromises[dataPromises.length - 1]
                }
            }
        } else {
            const values = await dataPromises

            if (predicate) {
                for (let i = values.length - 1; i >= 0; i--) {
                    const value = values[i]
                    if (predicate(value)) {
                        return value
                    }
                }

                return null
            } else {
                if (values.length === 0) {
                    return null
                } else {
                    return await values[values.length - 1]
                }
            }
        }
    }

    public max(this: IParallelEnumerable<number>): Promise<number>
    public max(selector: (x: TSource) => number): Promise<number>
    public async max(selector?: any): Promise<number> {
        let maxInfo: number[]
        if (selector) {
            maxInfo = await this.nextIteration<number>(selector)
        } else {
            const data = this.dataFunc() as Array<Promise<any>>
            maxInfo = await Promise.all(data)
        }

        return Math.max.apply(null, maxInfo)
    }

    public min(this: IParallelEnumerable<number>): Promise<number>
    public min(selector: (x: TSource) => number): Promise<number>
    public async min(selector?: any): Promise<number> {
        let minInfo: number[]
        if (selector) {
            minInfo = await this.nextIteration<number>(selector)
        } else {
            const data = this.dataFunc() as Array<Promise<any>>
            minInfo = await Promise.all(data)
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
        const generator = async () => {
            let values: OUT[]
            if (typeof key === "string") {
                values = await this.nextIteration((x: any) => x[key] as OUT)
            } else {
                values = await this.nextIteration(key)
            }
            return values
        }

        return new BasicParallelEnumerable(generator)
    }

    public selectMany<OUT>(
        selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>
    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut> }, TOut>(
        this: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>
    public selectMany<OUT>(selector: ((x: TSource) => Iterable<OUT>) | string): IParallelEnumerable<any> {
        const generator = async () => {
            let values: Array<Iterable<OUT>>
            if (typeof selector === "string") {
                values = await this.nextIteration((x: any) => x[selector])
            } else {
                values = await this.nextIteration(selector)
            }

            const valuesArray = []
            for (const outer of values) {
                for (const y of outer) {
                    valuesArray.push(y)
                }
            }

            return valuesArray
        }

        return new BasicParallelEnumerable(generator)
    }

    public sequenceEquals(
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>,
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
        const dataPromises = this.dataFunc()
        if (Array.isArray(dataPromises)) {
            if (dataPromises.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (dataPromises.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return await dataPromises[0]
        } else {
            const results = await dataPromises
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return results[0]
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
        const dataPromises = this.dataFunc()
        if (Array.isArray(dataPromises)) {
            if (dataPromises.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (dataPromises.length === 0) {
                return null
            }

            return await dataPromises[0]
        } else {
            const results = await dataPromises
            if (results.length > 1) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else if (results.length === 0) {
                return null
            }

            return results[0]
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
        const promiseOrPromises = this.dataFunc()
        if (Array.isArray(promiseOrPromises)) {
            return new BasicParallelEnumerable(() => promiseOrPromises.slice(count))
        } else {
            return new BasicParallelEnumerable(async () => (await promiseOrPromises).slice(count))
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

    public async toArray(): Promise<TSource[]> {
        const promiseOrPromises = this.dataFunc()
        if (Array.isArray(promiseOrPromises)) {
            return Promise.all(promiseOrPromises)
        } else {
            return await promiseOrPromises
        }
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>> {
        return ParallelEnumerable.toMap(this, selector)
    }

    public toSet(): Promise<Set<TSource>> {
        return ParallelEnumerable.toSet(this)
    }

    public union(
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.union(this, second, comparer)
    }

    public where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        const generator = async () => {
            const values = await this.toArray()
            return values.filter(predicate)
        }
        return new BasicParallelEnumerable(generator)
    }

    public zip<TSecond, TResult>(
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>
    public zip<TSecond>(
        second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSecond>): IParallelEnumerable<ITuple<TSource, TSecond>>
    public zip(second: any, resultSelector?: any): IParallelEnumerable<any> {
        return ParallelEnumerable.zip(second, resultSelector)
    }

    private nextIteration<TOut>(onfulfilled: (x: TSource) => TOut): Promise<TOut[]> {
        const promiseOrPromises = this.dataFunc()
        if (Array.isArray(promiseOrPromises)) {
            const newPromises = new Array<Promise<TOut>>(promiseOrPromises.length)
            for (let i = 0; i < promiseOrPromises.length; i++) {
                newPromises[i] = promiseOrPromises[i].then(onfulfilled)
            }
            return Promise.all(newPromises)
        } else {
            return promiseOrPromises.then((data) => data.map(onfulfilled))
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

        for (const key of [...map.keys()].sort(comparer ? comparer : undefined))
        {
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
        comparer?: IComparer<number | string>): () => Promise<T[]> {
        return () => OrderedParallelEnumerable.unrollAndSort(mapFunc(), comparer)
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
        comparer?: IComparer<number | string>): () => Promise<T[]> {
        return () => OrderedParallelEnumerableDescending.unrollAndSort(mapFunc(), comparer)
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

        for await (const value of source)
        {
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
        source: IAsyncEnumerable<number>): Promise<number>
    public static average<TSource>(
        source: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>
    public static average<TSource>(
        source: IAsyncEnumerable<TSource> | IAsyncEnumerable<number>,
        selector?: (x: TSource) => number): Promise<number> {
        if (selector) {
            return ParallelEnumerable.average_2(source as IAsyncEnumerable<TSource>, selector)
        } else {
            return ParallelEnumerable.average_1(source as IAsyncEnumerable<number>)
        }
    }

    private static async average_1(source: IAsyncEnumerable<number>): Promise<number> {
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
        source: IAsyncEnumerable<TSource>, func: (x: TSource) => number): Promise<number> {
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
        first: IParallelEnumerable<TSource>,
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = EqualityComparer): IParallelEnumerable<TSource> {

        const generator = async () => {
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

        return new BasicParallelEnumerable(generator)
    }

    public static flatten<TSource>(
        source: IParallelEnumerable<TSource | IParallelEnumerable<TSource>>): IParallelEnumerable<TSource>
    public static flatten<TSource>(
        source: IParallelEnumerable<TSource | IParallelEnumerable<TSource>>,
        shallow: false): IParallelEnumerable<TSource>
    public static flatten<TSource>(
        source: IParallelEnumerable<TSource | IParallelEnumerable<TSource>>,
        shallow: true): IParallelEnumerable<TSource | AsyncIterable<TSource>>
    public static flatten<TSource>(
        source: IParallelEnumerable<TSource | IParallelEnumerable<TSource>>,
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

        const generator = async () => {
            const results = new Array()
            for await (const x of iterator(source)) {
                results.push(x)
            }
            return results
        }

        return new BasicParallelEnumerable(generator)
    }

    public static from<TSource>(promises: Array<Promise<TSource>>): IParallelEnumerable<TSource>
    public static from<TSource>(generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>
    public static from<TSource>(generator: () => Array<Promise<TSource>>): IParallelEnumerable<TSource>
    public static from<TSource>(
        promisesOrGenerator: Array<Promise<TSource>> | (() => Promise<TSource[]>) | (() => Array<Promise<TSource>>)) {
        if (Array.isArray(promisesOrGenerator)) {
            if (promisesOrGenerator.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return new BasicParallelEnumerable(() => promisesOrGenerator)
        } else {
            return new BasicParallelEnumerable(promisesOrGenerator as any)
        }
    }

    public static groupBy<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
    public static groupBy<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
    public static groupBy<TSource, TKey>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
    public static groupBy<TSource, TKey>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
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
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
            IParallelEnumerable<IGrouping<string | number, TSource>> {

        const generator = async () => {
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

        return new BasicParallelEnumerable(generator)
    }

    private static groupBy_0<TSource, TKey>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>> {

        const generator = async () => {

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
            return results
        }

        return new BasicParallelEnumerable(generator)
    }

    public static groupByWithSel<TSource, TElement>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>
    public static groupByWithSel<TSource, TElement>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
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
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string | number,
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string | number, TElement>> {

        // generate(): AsyncIterableIterator<IGrouping<string | number, TElement>>
        const generator = async () => {
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
            const results = new Array<Grouping<string | number, TElement>>()
            for (const value in keyMap) {
                results.push(keyMap[value])
            }
            return results
            /* tslint:enable */
        }

        return new BasicParallelEnumerable(generator)
    }

    private static groupBy_1<TSource, TKey, TElement>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>> {

        const generator = async () => {
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

            const results = new Array<Grouping<TKey, TElement>>()
            for (const value of keyMap) {
                results.push(value)
            }
            return results
        }

        return new BasicParallelEnumerable(generator)
    }

    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncEnumerable<TOuter> | IParallelEnumerable<TOuter>,
        inner: IAsyncEnumerable<TInner> | IParallelEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult): IParallelEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncEnumerable<TOuter> | IParallelEnumerable<TOuter>,
        inner: IAsyncEnumerable<TInner> | IParallelEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncEnumerable<TOuter> | IParallelEnumerable<TOuter>,
        inner: IAsyncEnumerable<TInner> | IParallelEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IParallelEnumerable<TResult> {
        const generator = async () => {
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

        return new BasicParallelEnumerable(generator)
    }

    public static intersect<TSource>(
        first: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {

        const generator = async () => {

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

        return new BasicParallelEnumerable(generator)
    }

    public static skip<TSource>(source: IParallelEnumerable<TSource>, count: number): IParallelEnumerable<TSource> {
        const generator = async () => {
            return (await source.toArray()).slice(count)
        }
        return new BasicParallelEnumerable(generator)
    }

    public static skipWhile<TSource>(
        source: IParallelEnumerable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        const generator = async () => {
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

        return new BasicParallelEnumerable(generator)
    }

    public static ofType<TSource, TResult>(
        source: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>,
        type?: IConstructor<TResult> | string): IParallelEnumerable<TResult> {

        const typeCheck: (x: TSource) => boolean = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof (type as any))

        const generator = async () =>
            (await source.toArray()).filter(typeCheck)

        return new BasicParallelEnumerable(generator) as any
    }

    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedParallelEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedParallelEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedParallelEnumerable<TSource> {
        return new OrderedParallelEnumerable(ParallelEnumerable.orderByInner(source, keySelector), comparer as any)
    }

    private static orderByInner<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
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
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedParallelEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedParallelEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        keySelector: (x: TSource) => number | string,
        comparer?: IComparer<number> | IComparer<string>): IOrderedParallelEnumerable<TSource> {
        return new OrderedParallelEnumerableDescending(
            ParallelEnumerable.orderByInner(source, keySelector), comparer as any)
    }

    public static range(start: number, count: number): IParallelEnumerable<number> {
        const generator = () => {
            const items = new Array<Promise<number>>(count)
            const max = start + count
            for (let i = start, j = 0; i < max; i++, j++) {
                items[j] = new Promise<number>((resolve) => resolve(i))
            }
            return items
        }

        return new BasicParallelEnumerable(generator)
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
        const generator = () => {
            const values = new Array<Promise<T>>(count)
            for (let i = 0; i < count; i++) {
                values[i] = new Promise((resolve) => resolve(element))
            }
            return values
        }

        return new BasicParallelEnumerable(generator)
    }

    private static repeat_2<T>(element: T, count: number, delay: number): IParallelEnumerable<T> {
        const generator = () => {
            const values = new Array<Promise<T>>(count)
            for (let i = 0; i < count; i++) {
                values[i] = new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
            }
            return values
        }

        return new BasicParallelEnumerable(generator)
    }

    public static reverse<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>): IParallelEnumerable<TSource> {
        const generator = async () => {
            const values = await source.toArray()
            return values.reverse()
        }

        return new BasicParallelEnumerable(generator)
    }

    public static async sequenceEquals<TSource>(
        first: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
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
        source: IAsyncEnumerable<number> | IParallelEnumerable<number>): Promise<number>
    public static sum<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        selector: (x: TSource) => number): Promise<number>
    public static sum<TSource>(
        source: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>
        | IParallelEnumerable<number> | IParallelEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number> {

        if (selector) {
            return ParallelEnumerable.sum_2(source as IAsyncEnumerable<TSource>, selector)
        } else {
            return ParallelEnumerable.sum_1(source as IAsyncEnumerable<number>)
        }
    }

    private static async sum_1(
        source: IAsyncEnumerable<number> | IParallelEnumerable<number>): Promise<number> {
        let sum = 0
        for (const value of await source.toArray()) {
            sum += value
        }

        return sum
    }

    private static async sum_2<TSource>(
        source: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number> {
        let sum = 0
        for (const value of await source.toArray()) {
            sum += selector(value)
        }

        return sum
    }

    public static take<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        amount: number): IParallelEnumerable<TSource> {
        const generator = async () => {
            // negative amounts should yield empty
            const amountLeft = amount > 0 ? amount : 0
            const values = await source.toArray()
            return values.splice(0, amountLeft)
        }

        return new BasicParallelEnumerable<TSource>(generator)
    }

    public static takeWhile<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        const generator = async () => {
            const values = await source.toArray()
            return values.filter(predicate)
        }

        return new BasicParallelEnumerable<TSource>(generator)
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
                for (const key of item.keys())
                {
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
                for (const key of item.keys())
                {
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
        source: IAsyncEnumerable<V> | IParallelEnumerable<V>,
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
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
        selector: (x: TSource) => string): Promise<{[key: string]: TSource}> {

        const map: {[key: string]: TSource} = {}

        for await (const value of source) {
            map[selector(value)] = value
        }

        return map
    }

    public static async toSet<TSource>(
        source: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>): Promise<Set<TSource>> {
        const set = new Set<TSource>()
        for await (const item of source) {
            set.add(item)
        }
        return set
    }

    public static union<TSource>(
        first: IParallelEnumerable<TSource>,
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        if (comparer) {
            return ParallelEnumerable.union_2(first, second, comparer)
        } else {
            return ParallelEnumerable.union_1(first, second)
        }
    }

    private static union_1<TSource>(
        first: IParallelEnumerable<TSource>,
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>) {

        async function iterator() {

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

        return new BasicParallelEnumerable<TSource>(iterator)
    }

    private static union_2<TSource>(
        first: IParallelEnumerable<TSource>,
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSource>,
        comparer: IEqualityComparer<TSource>) {

        const generator = async () => {
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

        return new BasicParallelEnumerable(generator)
    }

    public static zip<T, Y>(
        source: IAsyncEnumerable<T>,
        second: IAsyncEnumerable<Y>): IParallelEnumerable<ITuple<T, Y>>
    public static zip<T, Y, OUT>(
        source: IAsyncEnumerable<T>,
        second: IAsyncEnumerable<Y>,
        resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT>
    public static zip<T, Y, OUT>(
        source: IAsyncEnumerable<T>,
        second: IAsyncEnumerable<Y>,
        resultSelector?: (x: T, y: Y) => OUT): IParallelEnumerable<OUT> | IParallelEnumerable<ITuple<T, Y>> {
        if (resultSelector) {
            return ParallelEnumerable.zip_2(source, second, resultSelector)
        } else {
            return ParallelEnumerable.zip_1(source, second)
        }
    }

    private static zip_1<T, Y>(
        source: IAsyncEnumerable<T>, second: IAsyncEnumerable<Y>): IParallelEnumerable<ITuple<T, Y>> {
        async function iterator() {
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
        return new BasicParallelEnumerable(iterator)
    }

    private static zip_2<T, Y, OUT>(
        source: IAsyncEnumerable<T>,
        second: IAsyncEnumerable<Y>,
        resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT> {
        async function iterator() {
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

        return new BasicParallelEnumerable(iterator)
    }

    //#endregion
}
