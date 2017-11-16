// import 'core-js/shim'
import "core-js/modules/es7.symbol.async-iterator"
import { IAsyncEnumerable, IAsyncGrouping, IOrderedAsyncEnumerable } from "./AsyncInterfaces"
import { Grouping } from "./Enumerable"
import { IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple, RecOrdMap } from "./Interfaces"
import {
    ArgumentOutOfRangeException, AsTuple,
    EqualityComparer, ErrorString, InvalidOperationException, StrictEqualityComparer } from "./TypesAndHelpers"

export class BasicAsyncEnumerable<TSource> implements IAsyncEnumerable<TSource> {
    constructor(private readonly iterator: () => AsyncIterableIterator<TSource>) {
        //
    }

    public aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>
    public aggregate<TAccumulate>(
        seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
    public aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): Promise<TResult>
    public aggregate<TAccumulate, TResult>(
        seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
        func?: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector?: (x: TAccumulate) => TResult): Promise<any> {
        return AsyncEnumerable.aggregate(this, seedOrFunc, func as any, resultSelector as any)
    }

    public all(predicate: (x: TSource) => boolean): Promise<boolean> {
        return AsyncEnumerable.all(this, predicate)
    }

    public any(predicate?: (x: TSource) => boolean): Promise<boolean> {
        return AsyncEnumerable.any(this, predicate)
    }

    public average(this: IAsyncEnumerable<number>): Promise<number>
    public average(selector: (x: TSource) => number): Promise<number>
    public average(selector?: (x: TSource) => number): Promise<number> {
        return AsyncEnumerable.average(this, selector as any)
    }

    public concat(second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.concat(this, second)
    }

    public contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return AsyncEnumerable.contains(this, value, comparer)
    }

    public count(predicate?: (x: TSource) => boolean): Promise<number> {
        return AsyncEnumerable.count(this, predicate)
    }

    public distinct(comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.distinct(this, comparer)
    }

    public elementAt(index: number): Promise<TSource> {
        return AsyncEnumerable.elementAt(this, index)
    }

    public elementAtOrDefault(index: number): Promise<TSource | null> {
        return AsyncEnumerable.elementAtOrDefault(this, index)
    }

    public each(action: (x: TSource) => void): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.each(this, action)
    }

    public except(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.except(this, second, comparer)
    }

    public first(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return AsyncEnumerable.first(this, predicate)
    }

    public firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return AsyncEnumerable.firstOrDefault(this, predicate)
    }

    public groupBy(keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
    public groupBy(keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey | string | number,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey | string | number, TSource>> {
        return AsyncEnumerable.groupBy(this, keySelector, comparer as any)
    }

    public groupByWithSel<TElement>(
        keySelector: ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>
    public groupByWithSel<TElement>(
        keySelector: ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>> {
        return AsyncEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer as any)
    }

    public intersect(
        second: IAsyncEnumerable<TSource>,
        comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.intersect(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
        inner: IAsyncEnumerable<TInner>,
        outerKeySelector: (x: TSource) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TSource, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult> {
        return AsyncEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return AsyncEnumerable.last(this, predicate)
    }

    public lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return AsyncEnumerable.lastOrDefault(this, predicate)
    }

    public max(this: IAsyncEnumerable<number>): Promise<number | never>
    public max(selector: (x: TSource) => number): Promise<number | never>
    public max(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number | never> {
        return AsyncEnumerable.max(this as any, selector as any)
    }

    public min(this: IAsyncEnumerable<number>): Promise<number | never>
    public min(selector: (x: TSource) => number): Promise<number | never>
    public min(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number | never> {
        return AsyncEnumerable.min<TSource>(this as any, selector as any)
    }

    /* tslint:disable:ban-types */
    public ofType(type: "object"): IAsyncEnumerable<Object>
    public ofType(type: "function"): IAsyncEnumerable<Function>
    public ofType(type: "symbol"): IAsyncEnumerable<Symbol>
    /* tslint:enable:ban-types */
    public ofType(type: "boolean"): IAsyncEnumerable<boolean>
    public ofType(type: "number"): IAsyncEnumerable<number>
    public ofType(type: "string"): IAsyncEnumerable<string>
    public ofType<TResult>(type: IConstructor<TResult>): IAsyncEnumerable<TResult>
    public ofType<TResult>(type?: IConstructor<TResult> | string): IAsyncEnumerable<TResult> {
        return AsyncEnumerable.ofType(this, type)
    }

    public orderBy(predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
    public orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public orderBy(
        predicate: (x: TSource) => string | number,
        comparer?: IComparer<string> | IComparer<number>): IOrderedAsyncEnumerable<TSource> {
        return AsyncEnumerable.orderBy(this, predicate as any, comparer as any)
    }

    public orderByDescending(
        predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
    public orderByDescending(
        predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public orderByDescending(
        predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public orderByDescending(
        predicate: (x: TSource) => string | number,
        comparer?: IComparer<string> | IComparer<number>): IOrderedAsyncEnumerable<TSource> {
        return AsyncEnumerable.orderByDescending(this, predicate as any, comparer as any)
    }

    public reverse(): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.reverse(this)
    }

    public select<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT> {
        return AsyncEnumerable.select(this, selector)
    }

    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
        this: IAsyncEnumerable<TBindedSource>,
        selector: keyof TBindedSource): IAsyncEnumerable<TOut>
    public selectMany<Y>(selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>
    public selectMany<Y>(selector: ((x: TSource) => Iterable<Y>) | string): IAsyncEnumerable<Y> {
        return AsyncEnumerable.selectMany(this, selector as any)
    }

    public sequenceEquals(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return AsyncEnumerable.sequenceEquals(this, second, comparer)
    }

    public single(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return AsyncEnumerable.single(this, predicate)
    }

    public singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return AsyncEnumerable.singleOrDefault(this, predicate)
    }

    public skip(count: number): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.skip(this, count)
    }

    public skipWhile(
        predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.skipWhile(this, predicate)
    }

    public sum(this: IAsyncEnumerable<number>): Promise<number>
    public sum(this: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>
    public sum(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number> {
        return AsyncEnumerable.sum(this as any, selector as any)
    }

    public take(amount: number): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.takeWhile(this, predicate)
    }

    public toArray(): Promise<TSource[]> {
        return AsyncEnumerable.toArray(this)
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>> {
        return AsyncEnumerable.toMap(this, selector)
    }

    public toSet(): Promise<Set<TSource>> {
        return AsyncEnumerable.toSet(this)
    }

    public union(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.union(this, second, comparer)
    }

    public where(predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>
    public where(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    public where(
        predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.where(this, predicate)
    }

    public zip<TSecond, TResult>(
        second: IAsyncEnumerable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>
        public zip<TSecond>(second: IAsyncEnumerable<TSecond>): IAsyncEnumerable<ITuple<TSource, TSecond>>
    public zip<Y, OUT>(
        second: IAsyncEnumerable<Y>,
        resultSelector?: (x: TSource, y: Y) => OUT): IAsyncEnumerable<any>  {
        return AsyncEnumerable.zip(this, second, resultSelector as any)
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TSource> {
        return this.iterator()
    }
}

class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    private static async *unrollAndSort<T>(
        mapPromise: Promise<RecOrdMap<T>> | RecOrdMap<T>,
        comparer?: IComparer<string | number>): AsyncIterableIterator<T> {

        const map = await mapPromise

        for (const key of [...map.keys()].sort(comparer ? comparer : undefined))
        {
            const values = map.get(key)

            if (values instanceof Map) {
                yield* OrderedAsyncEnumerable.unrollAndSort(values as RecOrdMap<T>, comparer)
            } else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values as T[]) {
                    yield value
                }
            }
        }
    }

    private static generate<T>(
        mapFunc: () => Promise<RecOrdMap<T>>,
        comparer?: IComparer<number | string>): () => AsyncIterableIterator<T> {
        return () => OrderedAsyncEnumerable.unrollAndSort(mapFunc(), comparer)
    }

    constructor(private readonly map: () => Promise<RecOrdMap<T>>, comparer?: IComparer<number | string>) {
        super(OrderedAsyncEnumerable.generate(map, comparer))
    }

    public getMap(): Promise<RecOrdMap<T>> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenBy(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenByDescending(this, keySelector, comparer)
    }
}

class OrderedAsyncEnumerableDescending<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    private static async *unrollAndSort<T>(
        mapPromise: Promise<RecOrdMap<T>> | RecOrdMap<T>,
        comparer?: IComparer<string | number>): AsyncIterableIterator<T> {

        const map = await mapPromise

        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i]
            const values = map.get(key)

            if (values instanceof Map) {
                yield* OrderedAsyncEnumerableDescending.unrollAndSort(values as RecOrdMap<T>, comparer)
            } else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values as T[]) {
                    yield value
                }
            }
        }
    }

    private static generate<T>(
        mapFunc: () => Promise<RecOrdMap<T>>,
        comparer?: IComparer<number | string>): () => AsyncIterableIterator<T> {
        return () => OrderedAsyncEnumerableDescending.unrollAndSort(mapFunc(), comparer)
    }

    constructor(private readonly map: () => Promise<RecOrdMap<T>>, comparer?: IComparer<number | string>) {
        super(OrderedAsyncEnumerableDescending.generate(map, comparer))
    }

    public getMap(): Promise<RecOrdMap<T>> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenBy(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenByDescending(this, keySelector, comparer)
    }
}

export class AsyncGrouping<TKey, TValue> extends Array<Promise<TValue>> implements IAsyncGrouping<TKey, TValue> {
    private currentIndex = 0
    constructor(public readonly key: TKey, startingItem: Promise<TValue>) {
        super(1)
        this[0] = startingItem
    }

    public next(): Promise<IteratorResult<TValue>> {
        return new Promise<IteratorResult<TValue>>(async (resolve) => {
            const value = await this[this.currentIndex++]
            resolve({
                done: this.currentIndex === this.length,
                value,
            })
        })
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TValue> {
        return this
    }
}

export class AsyncEnumerable {

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

            return AsyncEnumerable.aggregate_3(source, seedOrFunc as TAccumulate, func, resultSelector)
        } else if (func) {
            return AsyncEnumerable.aggregate_2(source, seedOrFunc as TAccumulate, func)
        } else {
            return AsyncEnumerable.aggregate_1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
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

    public static async all<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: (x: TSource) => boolean): Promise<boolean> {
        for await (const item of source) {
            if (predicate(item) === false) {
                return false
            }
        }

        return true
    }

    public static any<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate?: (x: TSource) => boolean): Promise<boolean> {
        if (predicate) {
            return AsyncEnumerable.any_2(source, predicate)
        } else {
            return AsyncEnumerable.any_1(source)
        }
    }

    private static async any_1<TSource>(source: IAsyncEnumerable<TSource>): Promise<boolean> {
        for await (const _ of source) {
            return true
        }

        return false
    }

    private static async any_2<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: (x: TSource) => boolean): Promise<boolean> {
        for await (const item of source) {
            if (predicate(item) === true) {
                return true
            }
        }

        return false
    }

    public static average(
        source: IAsyncEnumerable<number>): Promise<number>
    public static average<TSource>(
        source: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>
    public static average<TSource>(
        source: IAsyncEnumerable<TSource> | IAsyncEnumerable<number>,
        selector?: (x: TSource) => number): Promise<number> {
        if (selector) {
            return AsyncEnumerable.average_2(source as IAsyncEnumerable<TSource>, selector)
        } else {
            return AsyncEnumerable.average_1(source as IAsyncEnumerable<number>)
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

    public static concat<TSource>(
        first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource> {
        async function* iterator() {
            yield* first
            yield* second
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static async contains<TSource>(
        source: AsyncIterable<TSource>,
        value: TSource,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {

        for await (const item of source) {
            if (comparer(value, item)) {
                return true
            }
        }

        return false
    }

    public static count<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<number> {
        if (predicate) {
            return AsyncEnumerable.count_2(source, predicate)
        } else {
            return AsyncEnumerable.count_1(source)
        }
    }

    private static async count_1<T>(source: AsyncIterable<T>): Promise<number> {
        let count = 0

        for await (const _ of source) {
            count++
        }

        return count
    }

    private static async count_2<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<number> {
        let count = 0
        for await (const value of source) {
            if (predicate(value) === true) {
                count++
            }
        }
        return count
    }

    public static distinct<TSource>(
        source: IAsyncEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IAsyncEnumerable<TSource> {

        async function* iterator() {
            const distinctElements: TSource[] = []
            for await (const item of source) {

                const foundItem = distinctElements.find((x) => comparer(x, item))

                if (!foundItem) {
                    distinctElements.push(item)
                    yield item
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static async elementAt<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource> {
        let i = 0
        for await (const item of source) {
            if (index === i++) {
                return item
            }
        }

        throw new ArgumentOutOfRangeException("index")
    }

    public static async elementAtOrDefault<TSource>(
        source: AsyncIterable<TSource>, index: number): Promise<TSource | null> {
        let i = 0
        for await (const item of source) {
            if (index === i++) {
                return item
            }
        }

        return null
    }

    public static enumerateObject<TInput>(
        source: TInput): IAsyncEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>> {
        async function *iterable() {
            /* tslint:disable */
            for (const key in source) {
                yield {
                    first: key,
                    second: source[key]
                }
            }
            /* tslint: enable */
        }

        return new BasicAsyncEnumerable(iterable)
    }

    public static except<TSource>(
        first: IAsyncEnumerable<TSource>,
        second: IAsyncEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = EqualityComparer): IAsyncEnumerable<TSource> {

        async function *iterator() {
            // TODO: async eq of [...second] ?
            const secondArray = []
            for await (const x of second) {
                secondArray.push(x)
            }

            for await (const firstItem of first) {

                let exists = false
                for (let j = 0; j < secondArray.length; j++) {
                    const secondItem = secondArray[j]

                    if (comparer(firstItem, secondItem) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    yield firstItem
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static first<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
        if (predicate) {
            return AsyncEnumerable.first_2(source, predicate)
        } else {
            return AsyncEnumerable.first_1(source)
        }
    }

    private static async first_1<T>(source: AsyncIterable<T>): Promise<T> {
        const first = await source[Symbol.asyncIterator]().next()

        if (first.done === true) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return first.value
    }

    private static async first_2<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T> {
        for await (const value of source) {
            if (predicate(value) === true) {
                return value
            }
        }

        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    public static firstOrDefault<T>(source: AsyncIterable<T>, predicate?: (x: T) => boolean): Promise<T | null> {
        if (predicate) {
            return AsyncEnumerable.firstOrDefault_2(source, predicate)
        } else {
            return AsyncEnumerable.firstOrDefault_1(source)
        }
    }

    private static async firstOrDefault_1<T>(source: AsyncIterable<T>): Promise<T | null> {
        const first = await source[Symbol.asyncIterator]().next()
        return first.value || null
    }

    private static async firstOrDefault_2<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T | null> {
        for await (const value of source) {
            if (predicate(value) === true) {
                return value
            }
        }

        return null
    }

    public static flatten<TSource>(source: IAsyncEnumerable<TSource | IAsyncEnumerable<TSource>>): IAsyncEnumerable<TSource>;
    public static flatten<TSource>(source: IAsyncEnumerable<TSource | IAsyncEnumerable<TSource>>, shallow: false): IAsyncEnumerable<TSource>;
    public static flatten<TSource>(source: IAsyncEnumerable<TSource | IAsyncEnumerable<TSource>>, shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>;
    public static flatten<TSource>(source: IAsyncEnumerable<TSource | IAsyncEnumerable<TSource>>, shallow?: boolean): IAsyncEnumerable<TSource | AsyncIterable<TSource>> {

        async function* iterator(source: AsyncIterable<any>): AsyncIterableIterator<TSource | AsyncIterable<TSource>> {
            for await (const item of source) {
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

        return new BasicAsyncEnumerable(() => iterator(source))
    }

    public static from<TSource>(promises: Promise<TSource>[]): IAsyncEnumerable<TSource>
    public static from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>
    public static from<TSource>(promisesOrIterable: Promise<TSource>[] | (() => AsyncIterableIterator<TSource>)) {
        if (Array.isArray(promisesOrIterable)) {           
            if (promisesOrIterable.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return new BasicAsyncEnumerable(async function*() {
                for await (const value of promisesOrIterable) {
                    yield value
                }
            })
        } else {
            return new BasicAsyncEnumerable(promisesOrIterable)
        }
    }

    public static fromEvent<K extends keyof HTMLElementEventMap>(element: Element, type: K): IAsyncEnumerable<HTMLElementEventMap[K]>
    public static fromEvent(element: Element, type: string): IAsyncEnumerable<Event>
    public static fromEvent(element: Element, type: string) {
        async function *eventGenerator() {
            let resolve: (e: Event) => void
            const nextPromise = () => new Promise<Event>((r) => resolve = r)
            let promise: Promise<Event> = nextPromise()

            element.addEventListener(type, (e) => {
                resolve(e)
                promise = nextPromise()
            })

            yield await promise
        }

        return new BasicAsyncEnumerable(eventGenerator);
    }

    public static each<TSource>(source: IAsyncEnumerable<TSource>, action: (x: TSource) => void): IAsyncEnumerable<TSource> {
        async function *iterator() {
            for await (const value of source) {
                action(value)
                yield value
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static groupBy<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>;
    public static groupBy<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>;
    public static groupBy<TSource, TKey>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
    public static groupBy<TSource, TKey>(
        source: IAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

        if (comparer) {
            return AsyncEnumerable.groupBy_0<TSource, TKey>(source,
                keySelector as (x: TSource) => TKey, comparer)
        } else {
            return AsyncEnumerable.groupBy_0_Simple(source,
                keySelector as ((x: TSource) => number) | ((x: TSource) => string))
        }
    }

    private static groupBy_0_Simple<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
            IAsyncEnumerable<IGrouping<string | number, TSource>> {

        async function *iterator(): AsyncIterableIterator<IGrouping<string | number, TSource>> {
            const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
            for await (const value of source) {

                const key = keySelector(value)
                const grouping: Grouping<string | number, TSource> = keyMap[key]

                if (grouping) {
                    grouping.push(value)
                } else {
                    keyMap[key] = new Grouping<string | number, TSource>(key, value)
                }
            }

            for (const value in keyMap) {
                yield keyMap[value]
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    private static groupBy_0<TSource, TKey> (
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

        async function *generate(): AsyncIterableIterator<IGrouping<TKey, TSource>> {

            const keyMap = new Array<Grouping<TKey, TSource>>()

            for await (const value of source) {
                const key = keySelector(value)
                let found = false

                for (let i = 0; i < keyMap.length; i++) {
                    const group = keyMap[i];
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

            for (const g of keyMap) {
                yield g
            }
        }

        return new BasicAsyncEnumerable(generate)
    }

    public static groupByWithSel<TSource, TElement>(
        source: IAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>
    public static groupByWithSel<TSource, TElement>(
        source: IAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: IAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: IAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TElement>> {

        if (comparer) {
            return AsyncEnumerable.GroupBy_1(source,
                keySelector as (x: TSource) => TKey, elementSelector, comparer)
        } else {
            return AsyncEnumerable.GroupBy_1_Simple(source,
                keySelector as (x: TSource) => number | string, elementSelector)
        }
    }

    private static GroupBy_1_Simple<TSource, TElement>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string | number,
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string | number, TElement>> {

        async function *generate(): AsyncIterableIterator<IGrouping<string | number, TElement>> {
            const keyMap: { [key: string]: Grouping<string | number, TElement> } = {}
            for await (const value of source) {

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
            for (const value in keyMap) {
                yield keyMap[value]
            }
            /* tslint:enable */
        }

        return new BasicAsyncEnumerable(generate)
    }

    private static GroupBy_1<TSource, TKey, TElement>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>> {

        async function *generate(): AsyncIterableIterator<IGrouping<TKey, TElement>> {
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

            for (const value of keyMap) {
                yield value
            }
        }

        return new BasicAsyncEnumerable(generate)
    }

    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncEnumerable<TOuter>,
        inner: IAsyncEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult): IAsyncEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncEnumerable<TOuter>,
        inner: IAsyncEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: IAsyncEnumerable<TOuter>,
        inner: IAsyncEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IAsyncEnumerable<TResult> {
        async function *iterator(): AsyncIterableIterator<TResult> {
            const innerArray = []
            for await (const i of inner) {
                innerArray.push(i)
            }

            for await (const o of outer) {
                const outerKey = outerKeySelector(o)

                for (const i of innerArray) {
                    const innerKey = innerKeySelector(i)
                    if (comparer(outerKey, innerKey) === true) {
                        yield resultSelector(o, i)
                    }
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static intersect<TSource>(
        first: IAsyncEnumerable<TSource>,
        second: IAsyncEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IAsyncEnumerable<TSource> {

        async function *iterator(): AsyncIterableIterator<TSource> {

            const firstResults = await first.distinct(comparer).toArray()

            if (firstResults.length === 0) {
                return
            }

            const secondResults = await second.toArray()

            for (let i = 0; i < firstResults.length; i++) {
                const firstValue = firstResults[i]

                for (let j = 0; j < secondResults.length; j++) {
                    const secondValue = secondResults[j]

                    if (comparer(firstValue, secondValue) === true) {
                        yield firstValue
                        break
                    }
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static select<TSource, TResult>(
        source: IAsyncEnumerable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult>
    public static select<TSource, TKey extends keyof TSource>(
        source: IAsyncEnumerable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
    public static select<T, Y>(source: IAsyncEnumerable<T>, selector: (x: T) => Y | string): IAsyncEnumerable<any> {

        if (typeof selector === "string") {
            return AsyncEnumerable.select_2(source, selector)
        } else {
            return AsyncEnumerable.select_1(source, selector)
        }
    }

    private static select_1<TSource, TResult>(
        source: IAsyncEnumerable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult> {
        async function* iterator() {
            for await (const value of source) {
                yield selector(value)
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    private static select_2<TSource, TKey extends keyof TSource>(
        source: IAsyncEnumerable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]> {
        async function* iterator() {
            for await (const value of source) {
                yield value[key]
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static selectMany
        <TSource extends { [key: string]: Iterable<Y> }, Y>(
        source: IAsyncEnumerable<TSource>,
        selector: keyof TSource): IAsyncEnumerable<Y>
    public static selectMany<TSource, Y>(
        source: IAsyncEnumerable<TSource>,
        selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>
    public static selectMany(
        source: IAsyncEnumerable<any>,
        selector: any): IAsyncEnumerable<any> {
        if (typeof selector === "string") {
            return AsyncEnumerable.selectMany_2(source, selector)
        } else {
            return AsyncEnumerable.selectMany_1(source, selector)
        }
    }

    private static selectMany_1<TSource, Y>(
        source: IAsyncEnumerable<TSource>,
        selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y> {
        async function* iterator() {
            for await (const value of source) {
                for (const selectorValue of selector(value)){
                    yield selectorValue
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    private static selectMany_2
        <TSource extends { [key: string]: Iterable<Y> }, Y>(
        source: IAsyncEnumerable<TSource>,
        selector: keyof TSource): IAsyncEnumerable<Y> {
        async function* iterator() {
            for await (const value of source) {
                for (const selectorValue of value[selector]){
                    yield selectorValue
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static single<TSource>(
        source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
        if (predicate) {
            return AsyncEnumerable.single_2(source, predicate)
        } else {
            return AsyncEnumerable.single_1(source)
        }
    }

    private static async single_1<TSource>(source: AsyncIterable<TSource>): Promise<TSource> {
        let hasValue = false
        let singleValue: TSource | null = null

        for await (const value of source) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }

        if (hasValue === false) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return singleValue as TSource
    }

    private static async single_2<TSource>(
        source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource> {
        let hasValue = false
        let singleValue: TSource | null = null

        for await (const value of source) {
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

    public static singleOrDefault<TSource>(
        source: AsyncIterable<TSource>,
        predicate?: (x: TSource) => boolean): Promise<TSource | null> {

        if (predicate) {
            return AsyncEnumerable.singleOrDefault_2(source, predicate)
        } else {
            return AsyncEnumerable.singleOrDefault_1(source)
        }
    }

    private static async singleOrDefault_1<TSource>(source: AsyncIterable<TSource>): Promise<TSource | null> {
        let hasValue = false
        let singleValue: TSource | null = null

        for await (const value of source) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }

        return singleValue
    }

    private static async singleOrDefault_2<TSource>(
        source: AsyncIterable<TSource>,
        predicate: (x: TSource) => boolean): Promise<TSource | null> {

        let hasValue = false
        let singleValue: TSource | null = null

        for await (const value of source) {
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

    public static skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource> {

        async function* iterator() {
            let i = 0
            for await (const item of source) {
                if (i++ >= count) {
                    yield item
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static skipWhile<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

        if (predicate.length === 1) {
            return AsyncEnumerable.skipWhile_1(source, predicate as any)
        } else {
            return AsyncEnumerable.skipWhile_2(source, predicate)
        }
    }

    private static skipWhile_1<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource> {

        async function* iterator() {
            let skip = true
            for await (const item of source) {

                if (skip === false) {
                    yield item
                } else if (predicate(item) === false) {
                    skip = false
                    yield item
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    private static skipWhile_2<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

        async function* iterator() {
            let index = 0
            let skip = true
            for await (const item of source) {

                if (skip === false) {
                    yield item
                } else if (predicate(item, index) === false) {
                    skip = false
                    yield item
                }

                index++
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static ofType<TSource, TResult>(
        source: AsyncIterable<TSource>,
        type?: IConstructor<TResult> | string): IAsyncEnumerable<TResult> {

        if (!type) {
            return source as any
        }

        const typeCheck: (x: TSource) => boolean = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof type)

        async function *iterator(): AsyncIterableIterator<TResult> {
            for await (const item of source) {
                if (typeCheck(item)) {
                    yield item as any
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    private static orderByInner<TSource>(
        source: IAsyncEnumerable<TSource>,
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

    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedAsyncEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedAsyncEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public static orderBy<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedAsyncEnumerable<TSource> {
        return new OrderedAsyncEnumerable(AsyncEnumerable.orderByInner(source, keySelector), comparer as any)
    }

    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedAsyncEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedAsyncEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number | string,
        comparer?: IComparer<number> | IComparer<string>): IOrderedAsyncEnumerable<TSource> {
        return new OrderedAsyncEnumerableDescending(AsyncEnumerable.orderByInner(source, keySelector), comparer as any)
    }

    public static async last<TSource>(
        source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
        if (predicate) {
            return AsyncEnumerable.last_2(source, predicate)
        } else {
            return AsyncEnumerable.last_1(source)
        }
    }

    private static async last_1<T>(source: AsyncIterable<T>): Promise<T> {
        let last: T | null = null

        for await (const value of source) {
            last = value
        }

        if (!last) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return last
    }

    private static async last_2<TSource>(
        source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource> {
        let last: TSource | null = null

        for await (const value of source) {
            if (predicate(value) === true) {
                last = value
            }
        }

        if (!last) {
            throw new InvalidOperationException(ErrorString.NoMatch)
        }

        return last
    }

    public static async lastOrDefault<TSource>(
        source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null> {

        if (predicate) {
            return AsyncEnumerable.lastOrDefault_2(source, predicate)
        } else {
            return AsyncEnumerable.lastOrDefault_1(source)
        }
    }

    private static async lastOrDefault_1<T>(source: AsyncIterable<T>): Promise<T | null> {
        let last: T | null = null

        for await (const value of source) {
            last = value
        }

        return last
    }

    private static async lastOrDefault_2<T>(
        source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T | null> {

        let last: T | null = null

        for await (const value of source) {
            if (predicate(value) === true) {
                last = value
            }
        }

        return last
    }

    public static max(source: IAsyncEnumerable<number>): Promise<number>
    public static max<TSource>(source: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>
    public static max<TSource>(
        source: IAsyncEnumerable<TSource> | IAsyncEnumerable<number>,
        selector?: (x: TSource) => number): Promise<number> {
        if (selector) {
            return AsyncEnumerable.max_2<TSource>(source as IAsyncEnumerable<TSource>, selector)
        } else {
            return AsyncEnumerable.max_1(source as IAsyncEnumerable<number>)
        }
    }

    private static async max_1(source: IAsyncEnumerable<number>): Promise<number> {
        let max: number | null = null
        for await (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, item)
        }

        if (max === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return max
        }
    }

    private static async max_2<TSource>(
        source: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number> {
        let max: number | null = null
        for await (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, selector(item))
        }

        if (max === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return max
        }
    }

    public static min(source: IAsyncEnumerable<number>): Promise<number>
    public static min<TSource>(source: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>
    public static min(source: IAsyncEnumerable<number>, selector?: (x: number) => number): Promise<number> {
        if (selector) {
            return AsyncEnumerable.min_2(source, selector)
        } else {
            return AsyncEnumerable.min_1(source)
        }
    }

    private static async min_1(source: IAsyncEnumerable<number>): Promise<number> {
        let min: number | null = null
        for await (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, item)
        }

        if (min === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return min
        }
    }

    private static async min_2(source: IAsyncEnumerable<number>, selector: (x: number) => number): Promise<number> {
        let min: number | null = null
        for await (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, selector(item))
        }

        if (min === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return min
        }
    }

    public static range(start: number, count: number): IAsyncEnumerable<number> {
        async function* iterator() {
            const max = start + count
            for (let i = start; i < max; i++) {
                yield i
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static repeat<T>(
        element: T, count: number, delay?: number): IAsyncEnumerable<T> {
        if (delay) {
            return AsyncEnumerable.repeat_2(element, count, delay)
        } else {
            return AsyncEnumerable.repeat_1(element, count)
        }
    }

    private static repeat_1<T>(element: T, count: number): IAsyncEnumerable<T> {
        async function* iterator() {
            for (let i = 0; i < count; i++) {
                yield element
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    private static repeat_2<T>(element: T, count: number, delay: number): IAsyncEnumerable<T> {
        async function* iterator() {
            for (let i = 0; i < count; i++) {
                await new Promise((resolve) => setTimeout(resolve, delay))
                yield element
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static reverse<TSource>(source: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource> {

        async function* iterator() {
            const values = []
            for await (const value of source) {
                values.push(value)
            }

            for (let i = values.length - 1; i >= 0; i--) {
                yield values[i]
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static async sequenceEquals<TSource>(
        first: IAsyncEnumerable<TSource>,
        second: IAsyncEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {

        const firstIterator = first[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        let results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
        let firstResult = results[0]
        let secondResult = results[1]

        while (!firstResult.done && !secondResult.done) {
            if (!comparer(firstResult.value, secondResult.value)) {
                return false
            }

            results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
            firstResult = results[0]
            secondResult = results[1]
        }

        return firstResult.done && secondResult.done
    }

    public static sum(
        source: IAsyncEnumerable<number>): Promise<number>
    public static sum<TSource>(
        source: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>
    public static sum<TSource>(
        source: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number> {

        if (selector) {
            return AsyncEnumerable.sum_2(source as IAsyncEnumerable<TSource>, selector)
        } else {
            return AsyncEnumerable.sum_1(source as IAsyncEnumerable<number>)
        }
    }

    private static async sum_1(
        source: IAsyncEnumerable<number>): Promise<number> {
        let sum = 0
        for await (const value of source) {
            sum += value
        }

        return sum
    }

    private static async sum_2<TSource>(
        source: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number> {
        let sum = 0
        for await (const value of source) {
            sum += selector(value)
        }

        return sum
    }

    public static take<TSource>(source: IAsyncEnumerable<TSource>, amount: number): IAsyncEnumerable<TSource> {
        async function* iterator() {
            // negative amounts should yield empty
            let amountLeft = amount > 0 ? amount : 0
            for await (const item of source) {
                if (amountLeft-- === 0) {
                    break
                } else {
                    yield item
                }
            }
        }

        return new BasicAsyncEnumerable<TSource>(iterator)
    }

    public static takeWhile<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

        if (predicate.length === 1) {
            return AsyncEnumerable.takeWhile_1(source, predicate as (x: TSource) => boolean)
        } else {
            return AsyncEnumerable.takeWhile_2(source, predicate as (x: TSource, index: number) => boolean)
        }
    }

    private static takeWhile_1<T>(source: IAsyncEnumerable<T>, predicate: (x: T) => boolean): IAsyncEnumerable<T> {
        async function* iterator() {
            for await (const item of source) {
                if (predicate(item)) {
                    yield item
                } else {
                    break
                }
            }
        }

        return new BasicAsyncEnumerable<T>(iterator)
    }

    private static takeWhile_2<T>(
        source: IAsyncEnumerable<T>, predicate: (x: T, index: number) => boolean): IAsyncEnumerable<T> {
        async function* iterator() {
            let index = 0
            for await (const item of source) {
                if (predicate(item, index++)) {
                    yield item
                } else {
                    break
                }
            }
        }

        return new BasicAsyncEnumerable<T>(iterator)
    }

    public static thenBy<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedAsyncEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedAsyncEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedAsyncEnumerable<TSource> {

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

        return new OrderedAsyncEnumerable(async () => sortInnerMost(await source.getMap()), comparer as any)
    }

    public static thenByDescending<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedAsyncEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedAsyncEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedAsyncEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedAsyncEnumerable<TSource> {

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

        return new OrderedAsyncEnumerableDescending(async () => sortInnerMost(await source.getMap()), comparer as any)
    }

    public static async toArray<TSource>(source: IAsyncEnumerable<TSource>): Promise<TSource[]> {
        const array = []
        for await (const item of source) {
            array.push(item)
        }
        return array
    }

    public static async toMap<K, V>(source: IAsyncEnumerable<V>, selector: (x: V) => K): Promise<Map<K, V[]>> {
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
        source: IAsyncEnumerable<TSource>,
        selector: (x: TSource) => string): Promise<{[key: string]: TSource}> {

        const map: {[key: string]: TSource} = {}

        for await (const value of source) {
            map[selector(value)] = value
        }

        return map
    }

    public static async toSet<TSource>(source: IAsyncEnumerable<TSource>): Promise<Set<TSource>> {
        const set = new Set<TSource>()
        for await (const item of source) {
            set.add(item)
        }
        return set
    }

    public static union<TSource>(
        first: IAsyncEnumerable<TSource>,
        second: IAsyncEnumerable<TSource>,
        comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        if (comparer) {
            return AsyncEnumerable.union_2(first, second, comparer)
        } else {
            return AsyncEnumerable.union_1(first, second)
        }
    }

    private static union_1<TSource>(
        first: IAsyncEnumerable<TSource>,
        second: IAsyncEnumerable<TSource>) {

        async function* iterator() {

            const set = new Set<TSource>()

            for await (const item of first) {
                if (set.has(item) === false) {
                    yield item
                    set.add(item)
                }
            }

            for await (const item of second) {
                if (set.has(item) === false) {
                    yield item
                    set.add(item)
                }
            }
        }

        return new BasicAsyncEnumerable<TSource>(iterator)
    }

    private static union_2<TSource>(
        first: IAsyncEnumerable<TSource>,
        second: IAsyncEnumerable<TSource>,
        comparer: IEqualityComparer<TSource>) {

        async function *iterator(): AsyncIterableIterator<TSource> {
            const result: TSource[] = []

            for (const source of [first, second]) {
                for await (const value of source) {
                    let exists = false

                    for (const resultValue of result) {
                        if (comparer(value, resultValue) === true) {
                            exists = true
                            break
                        }
                    }

                    if (exists === false) {
                        yield value
                        result.push(value)
                    }
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    public static where<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>
    public static where<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    public static where<TSource>(
        source: IAsyncEnumerable<TSource>,
        predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IAsyncEnumerable<TSource> {
        if (predicate.length === 1) {
            return AsyncEnumerable.where_1(source, predicate as (x: TSource) => boolean)
        } else {
            return AsyncEnumerable.where_2(source, predicate as (x: TSource, index: number) => boolean)
        }
    }

    private static where_1<T>(source: IAsyncEnumerable<T>, predicate: (x: T) => boolean): IAsyncEnumerable<T> {
        async function* iterator() {
            for await (const item of source) {
                if (predicate(item) === true) {
                    yield item
                }
            }
        }

        return new BasicAsyncEnumerable<T>(iterator)
    }

    private static where_2<T>(
        source: IAsyncEnumerable<T>, predicate: (x: T, index: number) => boolean): IAsyncEnumerable<T> {
        async function* iterator() {
            let i = 0
            for await (const item of source) {
                if (predicate(item, i++) === true) {
                    yield item
                }
            }
        }

        return new BasicAsyncEnumerable<T>(iterator)
    }

    public static zip<T, Y>(
        source: IAsyncEnumerable<T>,
        second: IAsyncEnumerable<Y>): IAsyncEnumerable<ITuple<T, Y>>
    public static zip<T, Y, OUT>(
        source: IAsyncEnumerable<T>,
        second: IAsyncEnumerable<Y>,
        resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT>
    public static zip<T, Y, OUT>(
        source: IAsyncEnumerable<T>,
        second: IAsyncEnumerable<Y>,
        resultSelector?: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT> | IAsyncEnumerable<ITuple<T, Y>> {
        if (resultSelector) {
            return AsyncEnumerable.zip_2(source, second, resultSelector)
        } else {
            return AsyncEnumerable.zip_1(source, second)
        }
    }

    private static zip_1<T, Y>(
        source: IAsyncEnumerable<T>, second: IAsyncEnumerable<Y>): IAsyncEnumerable<ITuple<T, Y>> {
        async function* iterator() {
            const firstIterator = source[Symbol.asyncIterator]()
            const secondIterator = second[Symbol.asyncIterator]()

            while (true) {
                const result = await Promise.all([firstIterator.next(), secondIterator.next()])
                const a = result[0]
                const b = result[1]

                if (a.done && b.done) {
                    break
                } else {
                    yield AsTuple(a.value, b.value)
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    private static zip_2<T, Y, OUT>(
        source: IAsyncEnumerable<T>,
        second: IAsyncEnumerable<Y>,
        resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT> {
        async function* iterator() {
            const firstIterator = source[Symbol.asyncIterator]()
            const secondIterator = second[Symbol.asyncIterator]()

            while (true) {
                const result = await Promise.all([firstIterator.next(), secondIterator.next()])
                const a = result[0]
                const b = result[1]

                if (a.done && b.done) {
                    break
                } else {
                    yield resultSelector(a.value, b.value)
                }
            }
        }

        return new BasicAsyncEnumerable(iterator)
    }

    private constructor() { }
}

// AsyncIterableIterator
