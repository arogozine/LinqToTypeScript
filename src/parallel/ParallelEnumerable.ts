import { IAsyncEnumerable } from "../async/IAsyncEnumerable"
import {
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
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"
import { DataType } from "./DataType"
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable"
import { IParallelEnumerable } from "./IParallelEnumerable"
import { OrderedParallelEnumerable } from "./OrderedParallelEnumerable"
import { OrderedParallelEnumerableDescending } from "./OrderedParallelEnumerableDescending"

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

    public static async averageAsync<TSource>(
        source: IAsyncParallel<TSource>, func: (x: TSource) => Promise<number>): Promise<number> {
        let value: number | undefined
        let count: number | undefined
        for await (const item of source) {
            value = (value || 0) + await func(item)
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

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
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

        const generator = async () => {
            const results = new Array()
            for await (const x of iterator(source)) {
                results.push(x)
            }
            return results
        }

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    public static from<TSource>(
        type: DataType.ArrayOfPromises,
        generator: () => Array<Promise<TSource>>): IParallelEnumerable<TSource>
    public static from<TSource>(
        type: DataType.PromiseToArray,
        generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>
    public static from<TSource>(
        type: DataType.PromiseOfPromises,
        generator: () => Promise<Array<Promise<TSource>>>): IParallelEnumerable<TSource>
    public static from<TSource>(
        type: DataType,
        generator: () => any) {
        return new BasicParallelEnumerable<TSource>({
            type,
            generator,
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

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    private static groupBy_0<TSource, TKey>(
        source: IAsyncParallel<TSource>,
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
            return results as Array<IGrouping<TKey, TSource>>
        }

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
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
            const results = new Array<IGrouping<string | number, TElement>>()
            for (const value in keyMap) {
                results.push(keyMap[value])
            }
            /* tslint:enable:forin */
            return results
        }

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    private static groupBy_1<TSource, TKey, TElement>(
        source: IAsyncParallel<TSource>,
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

            const results = new Array<IGrouping<TKey, TElement>>()
            for (const value of keyMap) {
                results.push(value)
            }
            return results
        }

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
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

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    public static intersect<TSource>(
        first: IParallelEnumerable<TSource>,
        second: IAsyncParallel<TSource>,
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

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    public static skip<TSource>(source: IAsyncParallel<TSource>, count: number): IParallelEnumerable<TSource> {
        const generator = async () => {
            return (await source.toArray()).slice(count)
        }
        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    public static skipWhile<TSource>(
        source: IAsyncParallel<TSource>,
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

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    public static skipWhileAsync<TSource>(
        source: IAsyncParallel<TSource>,
        predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        const generator = async () => {
            const values = await source.toArray()
            let i = 0
            for (; i < values.length; i++) {
                const value = values[i]
                if (await predicate(value, i) === false) {
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
            type: DataType.PromiseToArray,
            generator,
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
            type: DataType.PromiseToArray,
            generator: data as any,
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
        const generator = async () => {
            const items = new Array<Promise<number>>(count)
            const max = start + count
            for (let i = start, j = 0; i < max; i++, j++) {
                items[j] = new Promise<number>((resolve) => resolve(i))
            }
            return items
        }

        return new BasicParallelEnumerable<number>({
            type: DataType.PromiseOfPromises,
            generator,
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
        const generator = async () => {
            const values = new Array<T>(count)
            for (let i = 0; i < count; i++) {
                values[i] = element
            }
            return values
        }

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    private static repeat_2<T>(element: T, count: number, delay: number): IParallelEnumerable<T> {
        const generator = async () => {
            const values = new Array<Promise<T>>(count)
            for (let i = 0; i < count; i++) {
                values[i] = new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
            }
            return values
        }

        return new BasicParallelEnumerable<T>({
            type: DataType.PromiseOfPromises,
            generator,
        })
    }

    public static reverse<TSource>(
        source: IAsyncParallel<TSource>): IParallelEnumerable<TSource> {
        const generator = async () => {
            const values = await source.toArray()
            return values.reverse()
        }

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
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

    public static async sumAsync<TSource>(
        source: IAsyncParallel<TSource>,
        selector: (x: TSource) => Promise<number>): Promise<number> {
        let sum = 0
        for (const value of await source.toArray()) {
            sum += await selector(value)
        }

        return sum
    }

    public static take<TSource>(
        source: IAsyncParallel<TSource>,
        amount: number): IParallelEnumerable<TSource> {
        const generator = async () => {
            // negative amounts should yield empty
            const amountLeft = amount > 0 ? amount : 0
            const values = await source.toArray()
            return values.splice(0, amountLeft)
        }

        return new BasicParallelEnumerable<TSource>({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    public static takeWhile<TSource>(
        source: IAsyncParallel<TSource>,
        predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        const generator = async () => {
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
            type: DataType.PromiseToArray,
            generator,
        })
    }

    public static takeWhileAsync<TSource>(
        source: IAsyncParallel<TSource>,
        predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        const generator = async () => {
            const values = await source.toArray()
            const results = new Array<TSource>()
            if (predicate.length === 1) {
                const sPredicate = predicate as (x: TSource) => Promise<boolean>
                for (const value of values) {
                    if (await sPredicate(value) === true) {
                        results.push(value)
                    } else {
                        break
                    }
                }
            } else {
                for (let i = 0; i < values.length; i++) {
                    const value = values[i]
                    if (await predicate(value, i) === true) {
                        results.push(value)
                    } else {
                        break
                    }
                }
            }
            return results
        }

        return new BasicParallelEnumerable<TSource>({
            type: DataType.PromiseToArray,
            generator,
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

    public static thenByAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<string>): IOrderedParallelEnumerable<TSource>
    public static thenByAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<string>,
        comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>
    public static thenByAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<number>): IOrderedParallelEnumerable<TSource>
    public static thenByAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<number>,
        comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>
    public static thenByAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => Promise<number>) | ((x: TSource) => Promise<string>),
        comparer?: IComparer<number> | IComparer<string>): IOrderedParallelEnumerable<TSource> {

        async function sortInnerMost(item: TSource[] | RecOrdMap<TSource>): Promise<RecOrdMap<TSource>> {

            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, await sortInnerMost(item.get(key) as TSource[] | RecOrdMap<TSource>))
                }

                return item
            } else {
                const map = new Map<number | string, TSource[]>()
                for (let i = 0; i < item.length; i++) {
                    const value = item[i]
                    const key = await keySelector(value)

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

        return new OrderedParallelEnumerable(async () => await sortInnerMost(await source.getMap()), comparer as any)
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

    public static thenByDescendingAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<string>): IOrderedParallelEnumerable<TSource>
    public static thenByDescendingAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<string>,
        comparer: IComparer<string>): IOrderedParallelEnumerable<TSource>
    public static thenByDescendingAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<number>): IOrderedParallelEnumerable<TSource>
    public static thenByDescendingAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<number>,
        comparer: IComparer<number>): IOrderedParallelEnumerable<TSource>
    public static thenByDescendingAsync<TSource>(
        source: IOrderedParallelEnumerable<TSource>,
        keySelector: ((x: TSource) => Promise<number>) | ((x: TSource) => Promise<string>),
        comparer?: IComparer<number> | IComparer<string>): IOrderedParallelEnumerable<TSource> {

        async function sortInnerMost(item: TSource[] | RecOrdMap<TSource>): Promise<RecOrdMap<TSource>> {

            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, await sortInnerMost(item.get(key) as TSource[] | RecOrdMap<TSource>))
                }

                return item
            } else {
                const map = new Map<number | string, TSource[]>()
                for (let i = 0; i < item.length; i++) {
                    const value = item[i]
                    const key = await keySelector(value)

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

    public static async toMapAsync<K, V>(
        source: AsyncIterable<V>,
        selector: (x: V) => Promise<K>): Promise<Map<K, V[]>> {
        const map = new Map<K, V[]>()

        for await (const value of source) {
            const key = await selector(value)
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

        async function generator() {

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
            type: DataType.PromiseToArray,
            generator,
        })
    }

    private static union_2<TSource>(
        first: IAsyncParallel<TSource>,
        second: IAsyncParallel<TSource>,
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

        return new BasicParallelEnumerable({
            type: DataType.PromiseToArray,
            generator,
        })
    }

    public static whereAsync<T>(
        source: IAsyncParallel<T>,
        predicate: (x: T, index: number) => Promise<boolean>) {
        const generator = async () => {
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
            type: DataType.PromiseToArray,
            generator,
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
        async function generator() {
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
            type: DataType.PromiseToArray,
            generator,
        })
    }

    private static zip_2<T, Y, OUT>(
        source: IAsyncParallel<T>,
        second: IAsyncParallel<Y>,
        resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT> {
        async function generator() {
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
            type: DataType.PromiseToArray,
            generator,
        })
    }

    //#endregion
}
