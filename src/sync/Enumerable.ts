import { AsyncEnumerable } from "@async/AsyncEnumerable"
import {
    IAsyncEnumerable,
} from "@async/IAsyncEnumerable"
import { IOrderedAsyncEnumerable } from "@async/IOrderedAsyncEnumerable"
import { OrderedAsyncEnumerable } from "@async/OrderedAsyncEnumerable"
import { OrderedAsyncEnumerableDescending } from "@async/OrderedAsyncEnumerableDescending"
import { IAsyncEqualityComparer } from "@shared/IAsyncEqualityComparer"
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
    StrictEqualityComparer,
} from "../shared/shared"
import { BasicEnumerable } from "./BasicEnumerable"
import { Grouping } from "./Grouping"
import { IEnumerable } from "./IEnumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"
import { OrderedEnumerable } from "./OrderedEnumerable"
import { OrderedEnumerableDescending } from "./OrderedEnumerableDescending"

// Enumerable class based on,
// https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx

export class Enumerable {

    public static aggregate<TSource>(
        source: Iterable<TSource>,
        func: (x: TSource, y: TSource) => TSource): TSource
    public static aggregate<TSource, TAccumulate>(
        source: Iterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate
    public static aggregate<TSource, TAccumulate, TResult>(
        source: Iterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): TResult
    public static aggregate<TSource, TAccumulate, TResult>(
        source: Iterable<TSource>,
        seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
        func?: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector?: (x: TAccumulate) => TResult): TSource | TAccumulate | TResult | null {
        if (resultSelector) {
            if (!func) {
                throw new ReferenceError(`TAccumulate function is undefined`)
            }

            return Enumerable.aggregate_3(source, seedOrFunc as TAccumulate, func, resultSelector)
        } else if (func) {
            return Enumerable.aggregate_2(source, seedOrFunc as TAccumulate, func)
        } else {
            return Enumerable.aggregate_1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
        }
    }

    private static aggregate_1<TSource>(
        source: Iterable<TSource>,
        func: (x: TSource, y: TSource) => TSource): TSource | null {
        let aggregateValue: TSource | undefined

        for (const value of source) {
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

    private static aggregate_2<TSource, TAccumulate>(
        source: Iterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate {
        let aggregateValue = seed

        for (const value of source) {
            aggregateValue = func(aggregateValue, value)
        }

        return aggregateValue
    }

    private static aggregate_3<TSource, TAccumulate, TResult>(
        source: Iterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): TResult {
        let aggregateValue = seed

        for (const value of source) {
            aggregateValue = func(aggregateValue, value)
        }

        return resultSelector(aggregateValue)
    }

    public static all<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean {
        for (const item of source) {
            if (predicate(item) === false) {
                return false
            }
        }

        return true
    }

    public static async allAsync<TSource>(
        source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        for (const item of source) {
            if (await predicate(item) === false) {
                return false
            }
        }

        return true
    }

    public static any<TSource>(
        source: Iterable<TSource>,
        predicate?: (x: TSource) => boolean): boolean {
        if (predicate) {
            return Enumerable.any_2(source, predicate)
        } else {
            return Enumerable.any_1(source)
        }
    }

    private static any_1<TSource>(source: Iterable<TSource>): boolean {
        for (const _ of source) {
            return true
        }

        return false
    }

    private static any_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean {
        for (const item of source) {
            if (predicate(item) === true) {
                return true
            }
        }

        return false
    }

    public static async anyAsync<TSource>(
        source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        for (const item of source) {
            if (await predicate(item) === true) {
                return true
            }
        }

        return false
    }

    public static average(source: Iterable<number>): number
    public static average<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
    public static average<TSource>(
        source: Iterable<TSource> | Iterable<number>,
        selector?: (x: TSource) => number): number {
        if (selector) {
            return Enumerable.average_2(source as Iterable<TSource>, selector)
        } else {
            return Enumerable.average_1(source as Iterable<number>)
        }
    }

    private static average_1(source: Iterable<number>): number {
        let value: number | undefined
        let count: number | undefined
        for (const item of source) {
            value = (value || 0) + item
            count = (count || 0) + 1
        }

        if (value === undefined) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return value / (count as number)
    }

    private static average_2<TSource>(source: Iterable<TSource>, func: (x: TSource) => number): number {
        let value: number | undefined
        let count: number | undefined
        for (const item of source) {
            value = (value || 0) + func(item)
            count = (count || 0) + 1
        }

        if (value === undefined) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return value / (count as number)
    }

    public static async averageAsync<TSource>(
        source: Iterable<TSource>, func: (x: TSource) => Promise<number>): Promise<number> {
        let value: number | undefined
        let count: number | undefined
        for (const item of source) {
            value = (value || 0) + await func(item)
            count = (count || 0) + 1
        }

        if (value === undefined) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return value / (count as number)
    }

    public static concat<TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource> {
        function* iterator() {
            yield* first
            yield* second
        }

        return new BasicEnumerable(iterator)
    }

    public static contains<TSource>(
        source: Iterable<TSource>,
        value: TSource,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

        for (const item of source) {
            if (comparer(value, item)) {
                return true
            }
        }

        return false
    }

    public static count<TSource>(source: Iterable<TSource>): number
    public static count<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): number
    public static count<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): number {
        if (predicate) {
            return Enumerable.count_2(source, predicate)
        } else {
            return Enumerable.count_1(source)
        }
    }

    private static count_1<T>(source: Iterable<T>): number {
        let count = 0

        for (const _ of source) {
            count++
        }

        return count
    }

    private static count_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): number {
        let count = 0
        for (const value of source) {
            if (predicate(value) === true) {
                count++
            }
        }
        return count
    }

    public static async countAsync<T>(
        source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number> {
        let count = 0
        for (const value of source) {
            if (await predicate(value) === true) {
                count++
            }
        }
        return count
    }

    public static distinct<TSource>(
        source: Iterable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> {

        function* iterator() {
            const distinctElements: TSource[] = []
            for (const item of source) {

                const foundItem = distinctElements.find((x) => comparer(x, item))

                if (!foundItem) {
                    distinctElements.push(item)
                    yield item
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static each<TSource>(source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource> {
        function *generator() {
            for (const value of source) {
                action(value)
                yield value
            }
        }

        return new BasicEnumerable(generator)
    }

    public static eachAsync<TSource>(
        source: Iterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
        async function *generator() {
            for (const value of source) {
                await action(value)
                yield value
            }
        }

        return AsyncEnumerable.from(generator)
    }

    public static elementAt<TSource>(source: Iterable<TSource>, index: number): TSource {
        let i = 0
        for (const item of source) {
            if (index === i++) {
                return item
            }
        }

        throw new ArgumentOutOfRangeException("index")
    }

    public static elementAtOrDefault<TSource>(source: Iterable<TSource>, index: number): TSource | null {
        let i = 0
        for (const item of source) {
            if (index === i++) {
                return item
            }
        }

        return null
    }

    public static enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>> {
        function *iterable() {
            // tslint:disable-next-line:forin
            for (const key in source) {
                yield {
                    first: key,
                    second: source[key],
                }
            }
        }

        return new BasicEnumerable(iterable)
    }

    public static except<TSource>(
        first: Iterable<TSource>,
        second: Iterable<TSource>,
        comparer: IEqualityComparer<TSource> = EqualityComparer): IEnumerable<TSource> {

        function *iterator() {
            const secondArray = [...second]

            for (const firstItem of first) {

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

        return new BasicEnumerable(iterator)
    }

    public static first<TSource>(source: Iterable<TSource>): TSource
    public static first<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource
    public static first<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
        if (predicate) {
            return Enumerable.first_2(source, predicate)
        } else {
            return Enumerable.first_1(source)
        }
    }

    private static first_1<T>(source: Iterable<T>) {
        const first = source[Symbol.iterator]().next()

        if (first.done === true) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return first.value
    }

    private static first_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): T {
        for (const value of source) {
            if (predicate(value) === true) {
                return value
            }
        }

        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    public static async firstAsync<T>(
        source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T> {
        for (const value of source) {
            if (await predicate(value) === true) {
                return value
            }
        }

        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    public static firstOrDefault<T>(source: Iterable<T>): T | null
    public static firstOrDefault<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null
    public static firstOrDefault<T>(source: Iterable<T>, predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            return Enumerable.firstOrDefault_2(source, predicate)
        } else {
            return Enumerable.firstOrDefault_1(source)
        }
    }

    private static firstOrDefault_1<T>(source: Iterable<T>): T | null {
        const first = source[Symbol.iterator]().next()
        return first.value || null
    }

    private static firstOrDefault_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null {
        for (const value of source) {
            if (predicate(value) === true) {
                return value
            }
        }

        return null
    }

    public static async firstOrDefaultAsync<T>(
        source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null> {
        for (const value of source) {
            if (await predicate(value) === true) {
                return value
            }
        }

        return null
    }

    public static flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>): IEnumerable<TSource>
    public static flatten<TSource>(
        source: Iterable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>
    public static flatten<TSource>(
        source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>
    public static flatten<TSource>(
        source: Iterable<TSource | Iterable<TSource>>, shallow?: boolean): IEnumerable<TSource | Iterable<TSource>> {

        // tslint:disable-next-line:no-shadowed-variable
        function* iterator(source: Iterable<any>): IterableIterator<TSource | Iterable<TSource>> {
            for (const item of source) {
                // JS string is an Iterable.
                // We exclude it from being flattened
                if (item[Symbol.iterator] !== undefined && typeof item !== "string") {
                    yield* shallow ? item : iterator(item)
                } else {
                    yield item
                }
            }
        }

        return new BasicEnumerable(() => iterator(source))
    }

    public static from<TSource>(source: TSource[]): IEnumerable<TSource>
    public static from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>
    public static from<TSource>(source: TSource[] | IterableIterator<TSource>): IEnumerable<TSource> {
        if (Array.isArray(source)) {
            function *iterator() {
                for (const value of source) {
                    yield value
                }
            }
            return new BasicEnumerable(iterator)
        } else {
            return new BasicEnumerable(() => source)
        }
    }

    public static groupBy<TSource>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>
    public static groupBy<TSource>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>
    public static groupBy<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>
    public static groupBy<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<any, TSource>> {

        if (comparer) {
            return Enumerable.groupBy_0<TSource, TKey>(source,
                keySelector as (x: TSource) => TKey, comparer)
        } else {
            return Enumerable.groupBy_0_Simple(source,
                keySelector as ((x: TSource) => number) | ((x: TSource) => string))
        }
    }

    private static groupBy_0_Simple<TSource>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
            IEnumerable<IGrouping<string | number, TSource>> {

        function *iterator(): IterableIterator<IGrouping<string | number, TSource>> {
            const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
            for (const value of source) {

                const key = keySelector(value)
                const grouping: Grouping<string | number, TSource> = keyMap[key]

                if (grouping) {
                    grouping.push(value)
                } else {
                    keyMap[key] = new Grouping<string | number, TSource>(key, value)
                }
            }

            // tslint:disable-next-line:forin
            for (const value in keyMap) {
                yield keyMap[value]
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static groupBy_0<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>> {

        function *generate(): IterableIterator<IGrouping<TKey, TSource>> {

            const keyMap = new Array<Grouping<TKey, TSource>>()

            for (const value of source) {
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

            for (const keyValue of keyMap) {
                yield keyValue
            }
        }

        return new BasicEnumerable(generate)
    }

    public static groupByWithSel<TSource, TElement>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>
    public static groupByWithSel<TSource, TElement>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<any, TElement>> {

        if (comparer) {
            return Enumerable.groupBy_1(source,
                keySelector as (x: TSource) => TKey, elementSelector, comparer)
        } else {
            return Enumerable.groupBy_1_Simple(source,
                keySelector as (x: TSource) => number | string, elementSelector)
        }
    }

    private static groupBy_1_Simple<TSource, TElement>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => string | number,
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string | number, TElement>> {

        function *generate(): IterableIterator<IGrouping<string | number, TElement>> {
            const keyMap: { [key: string]: Grouping<string | number, TElement> } = {}
            for (const value of source) {

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

        return new BasicEnumerable(generate)
    }

    private static groupBy_1<TSource, TKey, TElement>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>> {

        function *generate(): IterableIterator<IGrouping<TKey, TElement>> {
            const keyMap = new Array<Grouping<TKey, TElement>>()
            for (const value of source) {
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

            for (const keyValue of keyMap) {
                yield keyValue
            }
        }

        return new BasicEnumerable(generate)
    }

    public static groupByWithResult<TSource, TResult>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => string,
        resultSelector: (x: string, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
    public static groupByWithResult<TSource, TResult>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => string,
        resultSelector: (x: string, values: IEnumerable<TSource>) => TResult,
        comparer: IEqualityComparer<string>): IEnumerable<TResult>

    public static groupByWithResult<TSource, TResult>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => number,
        resultSelector: (x: number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
    public static groupByWithResult<TSource, TResult>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => number,
        resultSelector: (x: number, values: IEnumerable<TSource>) => TResult,
        comparer: IEqualityComparer<number>): IEnumerable<TResult>

    public static groupByWithResult<TSource, TKey, TResult>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
    public static groupByWithResult<TSource, TKey, TResult>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => number,
        resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
        comparer: IEqualityComparer<TKey>): IEnumerable<TResult>

    public static groupByWithResult<TSource, TKey, TResult>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
        resultSelector: (x: string | number | TKey, values: IEnumerable<TSource>) => TResult,
        comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {

        if (comparer) {
            return Enumerable.groupBy_2(source,
                keySelector as (x: TSource) => TKey,
                resultSelector,
                comparer)
        } else {
            return Enumerable.groupBy_2_Simple(source,
                keySelector as ((x: TSource) => string) | ((x: TSource) => number),
                resultSelector)
        }
    }

    private static groupBy_2_Simple<TSource, TResult>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number),
        resultSelector: (x: string | number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult> {

        function *iterator(): IterableIterator<TResult> {
            const groupByResult = Enumerable.groupBy_0_Simple(source, keySelector)

            for (const group of groupByResult) {
                yield resultSelector(group.key, group)
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static groupBy_2<TSource, TKey, TResult>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

        function *iterator(): IterableIterator<TResult> {
            const groupByResult = Enumerable.groupBy_0(source, keySelector, comparer)

            for (const group of groupByResult) {
                yield resultSelector(group.key, group)
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static GroupByWithResultAndSelector<TSource, TKey, TElement, TResult>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement,
        resultSelector: ((key: TKey, values: IEnumerable<TElement>) => TResult) |
            ((key: string | number, values: IEnumerable<TElement>) => TResult),
        comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
        if (comparer) {
            return Enumerable.groupBy_3(source,
                keySelector as (x: TSource) => TKey,
                elementSelector,
                resultSelector as (key: TKey, values: IEnumerable<TElement>) => TResult)
        } else {
            return Enumerable.groupBy_3_Simple(source,
                keySelector as ((x: TSource) => string) | ((x: TSource) => number),
                elementSelector,
                resultSelector as (key: string | number, values: IEnumerable<TElement>) => TResult)
        }
    }

    private static groupBy_3<TSource, TKey, TElement, TResult>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        resultSelector: (key: TKey, values: IEnumerable<TElement>) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

        function *iterator(): IterableIterator<TResult> {
            const groupByResult = Enumerable.groupBy_1(source, keySelector, elementSelector, comparer)

            for (const group of groupByResult) {
                yield resultSelector(group.key, group)
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static groupBy_3_Simple<TSource, TElement, TResult>(
        source: Iterable<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement,
        resultSelector: (key: string | number, values: IEnumerable<TElement>) => TResult): IEnumerable<TResult> {

        function *iterator(): IterableIterator<TResult> {
            const groupByResult = Enumerable.groupBy_1_Simple(source, keySelector, elementSelector)

            for (const group of groupByResult) {
                yield resultSelector(group.key, group)
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static join<TOuter, TInner, TKey, TResult>(
        outer: Iterable<TOuter>,
        inner: Iterable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult): IEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: Iterable<TOuter>,
        inner: Iterable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey>): IEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: Iterable<TOuter>,
        inner: Iterable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {
        function *iterator(): IterableIterator<TResult> {
            const innerArray = [...inner]
            for (const o of outer) {
                const outerKey = outerKeySelector(o)

                for (const i of innerArray) {
                    const innerKey = innerKeySelector(i)
                    if (comparer(outerKey, innerKey) === true) {
                        yield resultSelector(o, i)
                    }
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static intersect<TSource>(
        first: IEnumerable<TSource>,
        second: Iterable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> {

        function *iterator(): IterableIterator<TSource> {

            const firstResults = [...first.distinct(comparer)]

            if (firstResults.length === 0) {
                return
            }

            const secondResults = [...second]

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

        return new BasicEnumerable(iterator)
    }

    public static partition<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource[][] {
        const fail: TSource[] = []
        const pass: TSource[] = []

        for (const value of source) {
            if (predicate(value) === true) {
                pass.push(value)
            } else {
                fail.push(value)
            }
        }

        return [fail, pass]
    }

    public static async partitionAsync<TSource>(
        source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource[][]> {
        const fail: TSource[] = []
        const pass: TSource[] = []

        for (const value of source) {
            if (await predicate(value) === true) {
                pass.push(value)
            } else {
                fail.push(value)
            }
        }

        return [fail, pass]
    }

    public static select<TSource, TResult>(
        source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>
    public static select<TSource, TKey extends keyof TSource>(
        source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>
    public static select<TSource, TKey extends keyof TSource, TResult>(
        source: Iterable<TSource>,
        selector: ((x: TSource) => TResult) | TKey): IEnumerable<TSource[TKey]> | IEnumerable<TResult> {

        if (typeof selector === "string") {
            return Enumerable.select_2(source, selector)
        } else {
            return Enumerable.select_1(source, selector)
        }
    }

    private static select_1<TSource, TResult>(
        source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult> {
        function* iterator() {
            for (const value of source) {
                yield selector(value)
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static select_2<TSource, TKey extends keyof TSource>(
        source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]> {
        function* iterator() {
            for (const value of source) {
                yield value[key]
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static selectAsync<TSource, TResult>(
        source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
    public static selectAsync<TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
        source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
    public static selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
        source: Iterable<TSource>,
        selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> {

        if (typeof selector === "string") {
            return Enumerable.selectAsync_2(source, selector)
        } else {
            return Enumerable.selectAsync_1(source, selector)
        }
    }

    private static selectAsync_1<TSource, TResult>(
        source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult> {
        async function* iterator() {
            for (const value of source) {
                yield selector(value)
            }
        }

        return AsyncEnumerable.from(iterator)
    }

    private static selectAsync_2<
        TSource extends { [ key: string]: Promise<TResult> },
        TKey extends keyof TSource, TResult>(
        source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TResult> {
        async function* iterator() {
            for (const value of source) {
                yield value[key]
            }
        }

        return AsyncEnumerable.from(iterator)
    }

    public static selectMany<TSource, TResult>(
        source: Iterable<TSource>,
        selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult>
    public static selectMany<
        TSource extends { [key: string]: Iterable<TResult>}, TResult>(
            source: Iterable<TSource>,
            selector: keyof TSource): IEnumerable<TResult>
    public static selectMany<TSource extends { [key: string]: Iterable<TResult>}, TResult>(
        source: Iterable<TSource>,
        selector: ((x: TSource) => Iterable<TResult>) | keyof TSource) {
        if (typeof selector === "string") {
            return Enumerable.selectMany_2(source, selector)
        } else {
            return Enumerable.selectMany_1(source, selector as (x: TSource) => Iterable<TResult>)
        }
    }

    private static selectMany_1<TSource, TResult>(
        source: Iterable<TSource>,
        selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult> {
        function* iterator() {
            for (const value of source) {
                for (const selectorValue of selector(value)) {
                    yield selectorValue
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static selectMany_2<TSource extends { [key: string]: Iterable<TResult> }, TResult>(
        source: Iterable<TSource>, selector: keyof TSource) {
        function* iterator() {
            for (const value of source) {
                for (const selectorValue of value[selector]) {
                    yield selectorValue
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static selectManyAsync<TSource, TResult>(
        source: Iterable<TSource>,
        selector: (x: TSource) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult> {
        async function* generator() {
            for (const value of source) {
                const innerValues = await selector(value)
                for (const innerValue of innerValues) {
                    yield innerValue
                }
            }
        }

        return AsyncEnumerable.from(generator)
    }

    public static single<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
        if (predicate) {
            return Enumerable.single_2(source, predicate)
        } else {
            return Enumerable.single_1(source)
        }
    }

    private static single_1<TSource>(source: Iterable<TSource>): TSource {
        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
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

    private static single_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource {
        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
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

    public static async singleAsync<TSource>(
        source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
            if (await predicate(value)) {
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
        source: Iterable<TSource>,
        predicate?: (x: TSource) => boolean): TSource | null {

        if (predicate) {
            return Enumerable.singleOrDefault_2(source, predicate)
        } else {
            return Enumerable.singleOrDefault_1(source)
        }
    }

    private static singleOrDefault_1<TSource>(source: Iterable<TSource>): TSource | null {
        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }

        return singleValue
    }

    private static singleOrDefault_2<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource) => boolean): TSource | null {

        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
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

    public static async singleOrDefaultAsync<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {

        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
            if (await predicate(value)) {
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

    public static skipWhile<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {

        if (predicate.length === 1) {
            return Enumerable.skipWhile_1(source, predicate as (x: TSource) => boolean)
        } else {
            return Enumerable.skipWhile_2(source, predicate)
        }
    }

    private static skipWhile_1<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource) => boolean): IEnumerable<TSource> {

        function* iterator() {
            let skip = true
            for (const item of source) {

                if (skip === false) {
                    yield item
                } else if (predicate(item) === false) {
                    skip = false
                    yield item
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static skipWhile_2<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {

        function* iterator() {
            let index = 0
            let skip = true
            for (const item of source) {

                if (skip === false) {
                    yield item
                } else if (predicate(item, index) === false) {
                    skip = false
                    yield item
                }

                index++
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static skipWhileAsync<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

        if (predicate.length === 1) {
            return Enumerable.skipWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
        } else {
            return Enumerable.skipWhileAsync_2(source, predicate)
        }
    }

    private static skipWhileAsync_1<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource> {

        async function* iterator() {
            let skip = true
            for (const item of source) {

                if (skip === false) {
                    yield item
                } else if (await predicate(item) === false) {
                    skip = false
                    yield item
                }
            }
        }

        return AsyncEnumerable.from(iterator)
    }

    private static skipWhileAsync_2<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

        async function* iterator() {
            let index = 0
            let skip = true
            for (const item of source) {

                if (skip === false) {
                    yield item
                } else if (await predicate(item, index) === false) {
                    skip = false
                    yield item
                }

                index++
            }
        }

        return AsyncEnumerable.from(iterator)
    }

    public static skip<TSource>(source: Iterable<TSource>, count: number): IEnumerable<TSource> {

        function* iterator() {
            let i = 0
            for (const item of source) {
                if (i++ >= count) {
                    yield item
                }
            }
        }

        return new BasicEnumerable<TSource>(iterator)
    }

    public static empty<TSource>(): IEnumerable<TSource> {
        const iterator = function*() {
            for (const x of [] as TSource[]) {
                yield x
            }
        }
        return new BasicEnumerable(iterator)
    }

    public static last<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
        if (predicate) {
            return Enumerable.last_2(source, predicate)
        } else {
            return Enumerable.last_1(source)
        }
    }

    private static last_1<TSource>(source: Iterable<TSource>): TSource {
        let last: TSource | undefined

        for (const value of source) {
            last = value
        }

        if (!last) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return last
    }

    private static last_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource {
        let last: TSource | undefined

        for (const value of source) {
            if (predicate(value) === true) {
                last = value
            }
        }

        if (!last) {
            throw new InvalidOperationException(ErrorString.NoMatch)
        }

        return last
    }

    public static async lastAsync<TSource>(
        source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        let last: TSource | undefined

        for (const value of source) {
            if (await predicate(value) === true) {
                last = value
            }
        }

        if (!last) {
            throw new InvalidOperationException(ErrorString.NoMatch)
        }

        return last
    }

    public static lastOrDefault<TSource>(
        source: Iterable<TSource>,
        predicate?: (x: TSource) => boolean): TSource | null {

        if (predicate) {
            return Enumerable.lastOrDefault_2(source, predicate)
        } else {
            return Enumerable.lastOrDefault_1(source)
        }
    }

    private static lastOrDefault_1<TSource>(source: Iterable<TSource>): TSource | null {
        let last: TSource | null = null

        for (const value of source) {
            last = value
        }

        return last
    }

    private static lastOrDefault_2<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource) => boolean): TSource | null {

        let last: TSource | null = null

        for (const value of source) {
            if (predicate(value) === true) {
                last = value
            }
        }

        return last
    }

    public static async lastOrDefaultAsync<TSource>(
        source: Iterable<TSource>,
        predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {

        let last: TSource | null = null

        for (const value of source) {
            if (await predicate(value) === true) {
                last = value
            }
        }

        return last
    }

    public static max(source: Iterable<number>): number
    public static max<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
    public static max<TSource>(
        source: Iterable<TSource> | Iterable<number>,
        selector?: (x: TSource) => number): number {
        if (selector) {
            return Enumerable.max_2<TSource>(source as Iterable<TSource>, selector)
        } else {
            return Enumerable.max_1(source as Iterable<number>)
        }
    }

    private static max_1(source: Iterable<number>): number {
        let max: number | null = null
        for (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, item)
        }

        if (max === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return max
        }
    }

    private static max_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number {
        let max: number | null = null
        for (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, selector(item))
        }

        if (max === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return max
        }
    }

    public static async maxAsync<TSource>(
        source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
        let max: number | null = null
        for (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, await selector(item))
        }

        if (max === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return max
        }
    }

    public static min(source: Iterable<number>): number
    public static min<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
    public static min(source: Iterable<number>, selector?: (x: number) => number): number {
        if (selector) {
            return Enumerable.min_2(source, selector)
        } else {
            return Enumerable.min_1(source)
        }
    }

    private static min_1(source: Iterable<number>) {
        let min: number | null = null
        for (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, item)
        }

        if (min === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return min
        }
    }

    private static min_2(source: Iterable<number>, selector: (x: number) => number) {
        let min: number | null = null
        for (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, selector(item))
        }

        if (min === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return min
        }
    }

    public static async minAsync<TSource>(
        source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
        let min: number | null = null
        for (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, await selector(item))
        }

        if (min === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return min
        }
    }

    public static ofType<TSource, TResult>(
        source: Iterable<TSource>,
        type: IConstructor<TResult> | string): IEnumerable<TResult> {

        const typeCheck = typeof type === "string" ?
            ((x) => typeof x === type) as (x: any) => x is TResult :
            ((x) => x instanceof type) as (x: any) => x is TResult

        function *iterator(): IterableIterator<TResult> {
            for (const item of source) {
                if (typeCheck(item)) {
                    yield item
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static orderByInner<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number | string): () => Map<number | string, TSource[]> {
        return function lazyMap(): Map<number | string, TSource[]> {
            const map = new Map<number | string, TSource[]>()
            for (const item of source) {
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

    /*
    private static orderByInnerAsync<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<number | string>): () => Promise<Map<number | string, TSource[]>> {
        const func = async function lazyMap() {
            const map = new Map<number | string, TSource[]>()
            for (const item of source) {
                const key = await keySelector(item)
                const currentMapping = map.get(key)

                if (currentMapping) {
                    currentMapping.push(item)
                } else {
                    map.set(key, [item])
                }
            }

            return map
        }

        return func
    }
    */

    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedEnumerable<TSource>
    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedEnumerable<TSource>
    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedEnumerable<TSource>
    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedEnumerable<TSource>
    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number | string,
        comparer?: IComparer<number> | IComparer<string>): IOrderedEnumerable<TSource> {
        return new OrderedEnumerable(Enumerable.orderByInner(source, keySelector), comparer as any)
    }

    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number | string,
        comparer?: IComparer<number> | IComparer<string>): IOrderedEnumerable<TSource> {
        return new OrderedEnumerableDescending(Enumerable.orderByInner(source, keySelector), comparer as any)
    }

    public static range(start: number, count: number): IEnumerable<number> {
        function* iterator() {
            const max = start + count
            for (let i = start; i < max; i++) {
                yield i
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static repeat<T>(element: T, count: number): IEnumerable<T> {
        function* iterator() {
            for (let i = 0; i < count; i++) {
                yield element
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static reverse<TSource>(source: Iterable<TSource>): IEnumerable<TSource> {
        function* iterator() {
            for (const x of [...source].reverse()) {
                yield x
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static sequenceEquals<TSource>(
        first: Iterable<TSource>,
        second: Iterable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

        const firstIterator = first[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        let firstResult = firstIterator.next()
        let secondResult = secondIterator.next()

        while (!firstResult.done && !secondResult.done) {
            if (!comparer(firstResult.value, secondResult.value)) {
                return false
            }

            firstResult = firstIterator.next()
            secondResult = secondIterator.next()
        }

        return firstResult.done && secondResult.done
    }

    public static async sequenceEqualsAsync<TSource>(
        first: Iterable<TSource>,
        second: Iterable<TSource>,
        comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

        const firstIterator = first[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        let firstResult = firstIterator.next()
        let secondResult = secondIterator.next()

        while (!firstResult.done && !secondResult.done) {
            const comparison = await comparer(firstResult.value, secondResult.value)
            if (comparison) {
                return false
            }

            firstResult = firstIterator.next()
            secondResult = secondIterator.next()
        }

        return firstResult.done && secondResult.done
    }

    public static sum(source: Iterable<number>): number
    public static sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
    public static sum<TSource>(
        source: Iterable<number> | Iterable<TSource>,
        selector?: (x: TSource) => number): number {

        if (selector) {
            return Enumerable.sum_2(source as Iterable<TSource>, selector)
        } else {
            return Enumerable.sum_1(source as Iterable<number>)
        }
    }

    private static sum_1(source: Iterable<number>): number {
        let sum = 0
        for (const value of source) {
            sum += value
        }

        return sum
    }

    private static sum_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number {
        let sum = 0
        for (const value of source) {
            sum += selector(value)
        }

        return sum
    }

    public static async sumAsync<TSource>(
        source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
        let sum = 0
        for (const value of source) {
            sum += await selector(value)
        }

        return sum
    }

    public static take<T>(source: Iterable<T>, amount: number): IEnumerable<T> {

        function* iterator() {
            // negative amounts should yield empty
            let amountLeft = amount > 0 ? amount : 0
            for (const item of source) {
                if (amountLeft-- === 0) {
                    break
                } else {
                    yield item
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    public static takeWhile<T>(
        source: Iterable<T>,
        predicate: (x: T, index: number) => boolean): IEnumerable<T> {

        if (predicate.length === 1) {
            return Enumerable.takeWhile_1(source, predicate as (x: T) => boolean)
        } else {
            return Enumerable.takeWhile_2(source, predicate as (x: T, index: number) => boolean)
        }
    }

    private static takeWhile_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
        function* iterator() {
            for (const item of source) {
                if (predicate(item)) {
                    yield item
                } else {
                    break
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    private static takeWhile_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        function* iterator() {
            let index = 0
            for (const item of source) {
                if (predicate(item, index++)) {
                    yield item
                } else {
                    break
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    public static takeWhileAsync<T>(
        source: Iterable<T>,
        predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {

        if (predicate.length === 1) {
            return Enumerable.takeWhileAsync_1(source, predicate as (x: T) => Promise<boolean>)
        } else {
            return Enumerable.takeWhileAsync_2(source, predicate as (x: T, index: number) => Promise<boolean>)
        }
    }

    private static takeWhileAsync_1<T>(
        source: Iterable<T>,
        predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
        async function* iterator() {
            for (const item of source) {
                if (await predicate(item)) {
                    yield item
                } else {
                    break
                }
            }
        }

        return AsyncEnumerable.from(iterator)
    }

    private static takeWhileAsync_2<T>(
        source: Iterable<T>,
        predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        async function* iterator() {
            let index = 0
            for (const item of source) {
                if (await predicate(item, index++)) {
                    yield item
                } else {
                    break
                }
            }
        }

        return AsyncEnumerable.from(iterator)
    }

    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedEnumerable<TSource> {

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

        return new OrderedEnumerable(() => sortInnerMost(source.getMap()), comparer as any)
    }

    public static thenByAsync<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: ((x: TSource) => Promise<number>) | ((x: TSource) => Promise<string>),
        comparer?: IComparer<number> | IComparer<string>): IOrderedAsyncEnumerable<TSource> {

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

        return new OrderedAsyncEnumerable(() => sortInnerMost(source.getMap()), comparer as any)
    }

    public static thenByDescendingAsync<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<string>): IOrderedAsyncEnumerable<TSource>
    public static thenByDescendingAsync<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<string>,
        comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public static thenByDescendingAsync<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<number>): IOrderedAsyncEnumerable<TSource>
    public static thenByDescendingAsync<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<number>,
        comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public static thenByDescendingAsync<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: ((x: TSource) => Promise<number>) | ((x: TSource) => Promise<string>),
        comparer?: IComparer<number> | IComparer<string>): IOrderedAsyncEnumerable<TSource> {

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

        return new OrderedAsyncEnumerableDescending(() => sortInnerMost(source.getMap()), comparer as any)
    }

    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number> | IComparer<string>): IOrderedEnumerable<TSource> {

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

        return new OrderedEnumerableDescending(() => sortInnerMost(source.getMap()), comparer as any)
    }

    public static toArray<TSource>(source: Iterable<TSource>): TSource[] {
        return [...source]
    }

    public static toMap<K, V>(source: Iterable<V>, selector: (x: V) => K): Map<K, V[]> {
        const map = new Map<K, V[]>()

        for (const value of source) {
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

    public static async toMapAsync<K, V>(source: Iterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>> {
        const map = new Map<K, V[]>()

        for (const value of source) {
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

    public static toObject<TSource>(
        source: Iterable<TSource>,
        selector: (x: TSource) => string): {[key: string]: TSource} {

        const map: {[key: string]: TSource} = {}

        for (const value of source) {
            map[selector(value)] = value
        }

        return map
    }

    public static async toObjectAsync<TSource>(
        source: Iterable<TSource>,
        selector: (x: TSource) => Promise<string>): Promise<{[key: string]: TSource}> {

        const map: {[key: string]: TSource} = {}

        for (const value of source) {
            map[await selector(value)] = value
        }

        return map
    }

    public static toSet<TSource>(source: Iterable<TSource>): Set<TSource> {
        return new Set<TSource>(source)
    }

    public static union<TSource>(
        first: Iterable<TSource>,
        second: Iterable<TSource>,
        comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
            if (comparer) {
                return Enumerable.union_2(first, second, comparer)
            } else {
                return Enumerable.union_1(first, second)
            }
    }

    private static union_1<TSource>(
        first: Iterable<TSource>,
        second: Iterable<TSource>) {

        function* iterator() {

            const set = new Set<TSource>()

            for (const item of first) {
                if (set.has(item) === false) {
                    yield item
                    set.add(item)
                }
            }

            for (const item of second) {
                if (set.has(item) === false) {
                    yield item
                    set.add(item)
                }
            }
        }

        return new BasicEnumerable<TSource>(iterator)
    }

    private static union_2<TSource>(
        first: Iterable<TSource>,
        second: Iterable<TSource>,
        comparer: IEqualityComparer<TSource>) {

        function *iterator(): IterableIterator<TSource> {
            const result: TSource[] = []

            for (const source of [first, second]) {
                for (const value of source) {
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

        return new BasicEnumerable(iterator)
    }

    public static unionAsync<TSource>(
        first: Iterable<TSource>,
        second: Iterable<TSource>,
        comparer: IAsyncEqualityComparer<TSource>) {

        async function *iterator(): AsyncIterableIterator<TSource> {
            const result: TSource[] = []

            for (const source of [first, second]) {
                for (const value of source) {
                    let exists = false

                    for (const resultValue of result) {
                        if (await comparer(value, resultValue) === true) {
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

        return AsyncEnumerable.from(iterator)
    }

    public static where<T>(
        source: Iterable<T>,
        predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        if (predicate.length === 1) {
            return Enumerable.where_1(source, predicate as (x: T) => boolean)
        } else {
            return Enumerable.where_2(source, predicate as (x: T, index: number) => boolean)
        }
    }

    private static where_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
        function* iterator() {
            for (const item of source) {
                if (predicate(item) === true) {
                    yield item
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    private static where_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        function* iterator() {
            let i = 0
            for (const item of source) {
                if (predicate(item, i++) === true) {
                    yield item
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    public static whereAsync<T>(
        source: Iterable<T>,
        predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        if (predicate.length === 1) {
            return Enumerable.whereAsync_1(source, predicate as (x: T) => Promise<boolean>)
        } else {
            return Enumerable.whereAsync_2(source, predicate)
        }
    }

    private static whereAsync_1<T>(
        source: Iterable<T>,
        predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
        async function* generator() {
            for (const item of source) {
                if (await predicate(item) === true) {
                    yield item
                }
            }
        }

        return AsyncEnumerable.from(generator)
    }

    private static whereAsync_2<T>(
        source: Iterable<T>,
        predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        async function* generator() {
            let i = 0
            for (const item of source) {
                if (await predicate(item, i++) === true) {
                    yield item
                }
            }
        }

        return AsyncEnumerable.from(generator)
    }

    public static zip<T, Y>(
        source: Iterable<T>,
        second: Iterable<Y>): IEnumerable<ITuple<T, Y>>
    public static zip<T, Y, OUT>(
        source: Iterable<T>,
        second: Iterable<Y>,
        resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT>
    public static zip<T, Y, OUT>(
        source: Iterable<T>,
        second: Iterable<Y>,
        resultSelector?: (x: T, y: Y) => OUT): IEnumerable<OUT> | IEnumerable<ITuple<T, Y>> {
        if (resultSelector) {
            return Enumerable.zip_2(source, second, resultSelector)
        } else {
            return Enumerable.zip_1(source, second)
        }
    }

    private static zip_1<T, Y>(source: Iterable<T>, second: Iterable<Y>): IEnumerable<ITuple<T, Y>> {
        function* iterator() {
            const firstIterator = source[Symbol.iterator]()
            const secondIterator = second[Symbol.iterator]()

            while (true) {
                const a = firstIterator.next()
                const b = secondIterator.next()

                if (a.done && b.done) {
                    break
                } else {
                    yield AsTuple(a.value, b.value)
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static zip_2<T, Y, OUT>(
        source: Iterable<T>,
        second: Iterable<Y>,
        resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT> {
        function* iterator() {
            const firstIterator = source[Symbol.iterator]()
            const secondIterator = second[Symbol.iterator]()

            while (true) {
                const a = firstIterator.next()
                const b = secondIterator.next()

                if (a.done && b.done) {
                    break
                } else {
                    yield resultSelector(a.value, b.value)
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static zipAsync<T, Y, OUT>(
        source: Iterable<T>,
        second: Iterable<Y>,
        resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT> {
        async function* generator() {
            const firstIterator = source[Symbol.iterator]()
            const secondIterator = second[Symbol.iterator]()

            while (true) {
                const a = firstIterator.next()
                const b = secondIterator.next()

                if (a.done && b.done) {
                    break
                } else {
                    yield resultSelector(a.value, b.value)
                }
            }
        }

        return AsyncEnumerable.from(generator)
    }

    private constructor() {
        /* */
    }
}
