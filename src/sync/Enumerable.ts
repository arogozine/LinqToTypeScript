import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
import { IParallelEnumerable, from as parallelFrom } from "../parallel/parallel"
import { ParallelGeneratorType } from "../parallel/ParallelGeneratorType"
import {
    ArgumentOutOfRangeException,
    EqualityComparer,
    ErrorString,
    IAsyncEqualityComparer,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    InvalidOperationException,
    ITuple,
    OfType,
    StrictEqualityComparer,
} from "../shared/shared"
import {
    from as fromAsync,
    IAsyncEnumerable,
} from "./../async/async"
import { BasicEnumerable } from "./BasicEnumerable"
import { IEnumerable } from "./IEnumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"
import { OrderedEnumerable } from "./OrderedEnumerable"
import * as EnumerablePrivate from "./EnumerablePrivate";

// tslint:disable:no-shadowed-variable

// Enumerable class based on,
// https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx

export function aggregate<TSource>(
    source: Iterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): TSource
export function aggregate<TSource, TAccumulate>(
    source: Iterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate
export function aggregate<TSource, TAccumulate, TResult>(
    source: Iterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): TResult
export function aggregate<TSource, TAccumulate, TResult>(
    source: Iterable<TSource>,
    seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
    func?: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector?: (x: TAccumulate) => TResult): TSource | TAccumulate | TResult | null {
    if (resultSelector) {
        if (!func) {
            throw new ReferenceError(`TAccumulate function is undefined`)
        }

        return EnumerablePrivate.aggregate_3(source, seedOrFunc as TAccumulate, func, resultSelector)
    } else if (func) {
        return EnumerablePrivate.aggregate_2(source, seedOrFunc as TAccumulate, func)
    } else {
        return EnumerablePrivate.aggregate_1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
    }
}

export function all<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean {
    for (const item of source) {
        if (predicate(item) === false) {
            return false
        }
    }

    return true
}

export async function allAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for (const item of source) {
        if (await predicate(item) === false) {
            return false
        }
    }

    return true
}

export function any<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): boolean {
    if (predicate) {
        return EnumerablePrivate.any_2(source, predicate)
    } else {
        return EnumerablePrivate.any_1(source)
    }
}

export async function anyAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for (const item of source) {
        if (await predicate(item) === true) {
            return true
        }
    }

    return false
}

/**
 * Converts the iterable to an @see {IAsyncEnumerable}
 */
export function asAsync<TSource>(source: Iterable<TSource>): IAsyncEnumerable<TSource> {
    async function* generator() {
        for (const value of source) {
            yield value
        }
    }

    return fromAsync(generator)
}

/**
 * Converts an iterable to @see {IAsyncParallel}
 */
export function asParallel<TSource>(source: Iterable<TSource>): IParallelEnumerable<TSource> {
    async function generator() {
        const array = []
        for (const value of source) {
            array.push(value)
        }
        return array
    }

    return parallelFrom(ParallelGeneratorType.PromiseToArray, generator)
}

/**
 * @throws {InvalidOperationException}
 * @param source Iteration of Numbers
 */
export function average(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException}
 */
export function average<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function average<TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number {
    if (selector) {
        return EnumerablePrivate.average_2(source as Iterable<TSource>, selector)
    } else {
        return EnumerablePrivate.average_1(source as Iterable<number>)
    }
}

/**
 * @throws {InvalidOperationException} No Elements
 */
export async function averageAsync<TSource>(
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

export function concat<TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource> {
    function* iterator() {
        yield* first
        yield* second
    }

    return new BasicEnumerable(iterator)
}

export function contains<TSource>(
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

export async function containsAsync<TSource>(
    source: Iterable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
    for (const item of source) {
        if (await comparer(value, item)) {
            return true
        }
    }

    return false
}

export function count<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): number {
    if (predicate) {
        return EnumerablePrivate.count_2(source, predicate)
    } else {
        return EnumerablePrivate.count_1(source)
    }
}

export async function countAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number> {
    let count = 0
    for (const value of source) {
        if (await predicate(value) === true) {
            count++
        }
    }
    return count
}

export function distinct<TSource>(
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

export function distinctAsync<TSource>(
    source: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        const distinctElements: TSource[] = []
        outerLoop:
        for (const item of source) {
            for (const distinctElement of distinctElements) {
                const found = await comparer(distinctElement, item)
                if (found) {
                    continue outerLoop
                }
            }

            distinctElements.push(item)
            yield item
        }
    }

    return fromAsync(iterator)
}

export function each<TSource>(source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource> {
    function *generator() {
        for (const value of source) {
            action(value)
            yield value
        }
    }

    return new BasicEnumerable(generator)
}

export function eachAsync<TSource>(
    source: Iterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
    async function *generator() {
        for (const value of source) {
            await action(value)
            yield value
        }
    }

    return fromAsync(generator)
}

/**
 * Returns Element at specified position
 * @throws {ArgumentOutOfRangeException} Index outside of iteration
 * @param source Iteration of Elements
 * @param index Index for Element
 */
export function elementAt<TSource>(source: Iterable<TSource>, index: number): TSource {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    throw new ArgumentOutOfRangeException("index")
}

export function elementAtOrDefault<TSource>(source: Iterable<TSource>, index: number): TSource | null {
    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    return null
}

/**
 * Empty Enumerable
 */
export function empty<TSource>(): IEnumerable<TSource> {
    const iterator = function*() {
        for (const x of [] as TSource[]) {
            yield x
        }
    }
    return new BasicEnumerable(iterator)
}

export function enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>> {
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

export function except<TSource>(
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

export function exceptAsync<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator() {
        const secondArray = [...second]

        for (const firstItem of first) {

            let exists = false
            for (let j = 0; j < secondArray.length; j++) {
                const secondItem = secondArray[j]

                if (await comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                yield firstItem
            }
        }
    }

    return fromAsync(iterator)
}

/**
 * @throws {InvalidOperationException} No Elements in Iteration
 */
export function first<TSource>(source: Iterable<TSource>): TSource
/**
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
export function first<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource
export function first<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return EnumerablePrivate.first_2(source, predicate)
    } else {
        return EnumerablePrivate.first_1(source)
    }
}

/**
 * @throws {InvalidOperationException} No Matching Elements in Iteration
 * @param source Source Iteration
 * @param predicate Predicate to Select First Element
 */
export async function firstAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T> {
    for (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}

export function firstOrDefault<T>(source: Iterable<T>): T | null
export function firstOrDefault<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null
export function firstOrDefault<T>(source: Iterable<T>, predicate?: (x: T) => boolean): T | null {
    if (predicate) {
        return EnumerablePrivate.firstOrDefault_2(source, predicate)
    } else {
        return EnumerablePrivate.firstOrDefault_1(source)
    }
}

export async function firstOrDefaultAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null> {
    for (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}

export function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>): IEnumerable<TSource>
export function flatten<TSource>(
    source: Iterable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>
export function flatten<TSource>(
    source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>
export function flatten<TSource>(
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

/**
 * Creates an IEnumerable from an array
 * @param source Array of Elements
 */
export function from<TSource>(source: TSource[]): IEnumerable<TSource>
/**
 * Creates an IEnumerable from an iteration of elements
 * @param source Iteration of Elements
 */
export function from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>
export function from<TSource>(source: TSource[] | IterableIterator<TSource>): IEnumerable<TSource> {
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

export function groupBy<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>
export function groupBy<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>
export function groupBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>
export function groupBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return EnumerablePrivate.groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        return EnumerablePrivate.groupBy_0_Simple(source,
            keySelector as ((x: TSource) => number) | ((x: TSource) => string))
    }
}

export function groupByWithSel<TSource, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>
export function groupByWithSel<TSource, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey),
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<any, TElement>> {

    if (comparer) {
        return EnumerablePrivate.groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return EnumerablePrivate.groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}

//#region GroupByAsync

export function groupByAsync<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>
export function groupByAsync<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>
export function groupByAsync<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupByAsync<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return EnumerablePrivate.groupByAsync_0<TSource, TKey>(source, keySelector, comparer)
    } else {
        return EnumerablePrivate.groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => Promise<any>)
    }
}

//#endregion

export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string,
    resultSelector: (x: string, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string,
    resultSelector: (x: string, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<string>): IEnumerable<TResult>

export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: number, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<number>): IEnumerable<TResult>

export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<TKey>): IEnumerable<TResult>

export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
    resultSelector: (x: string | number | TKey, values: IEnumerable<TSource>) => TResult,
    comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {

    if (comparer) {
        return EnumerablePrivate.groupBy_2<TSource, TKey, TResult>(source,
            keySelector as (x: TSource) => TKey,
            resultSelector,
            comparer)
    } else {
        return EnumerablePrivate.groupBy_2_Simple(source,
            keySelector as ((x: TSource) => string) | ((x: TSource) => number),
            resultSelector)
    }
}

export function GroupByWithResultAndSelector<TSource, TKey, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement,
    resultSelector: ((key: TKey, values: IEnumerable<TElement>) => TResult) |
        ((key: string | number, values: IEnumerable<TElement>) => TResult),
    comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
    if (comparer) {
        return EnumerablePrivate.groupBy_3(source,
            keySelector as (x: TSource) => TKey,
            elementSelector,
            resultSelector as (key: TKey, values: IEnumerable<TElement>) => TResult)
    } else {
        return EnumerablePrivate.groupBy_3_Simple(source,
            keySelector as ((x: TSource) => string) | ((x: TSource) => number),
            elementSelector,
            resultSelector as (key: string | number, values: IEnumerable<TElement>) => TResult)
    }
}

export function join<TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult): IEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey>): IEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
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

// tslint:disable:no-shadowed-variable

export function intersect<TSource>(
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

export function intersectAsync<TSource>(
    first: IEnumerable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const firstResults = []
        for await (const item of first.distinctAsync(comparer)) {
            firstResults.push(item)
        }

        if (firstResults.length === 0) {
            return
        }

        const secondResults = [...second]

        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (await comparer(firstValue, secondValue) === true) {
                    yield firstValue
                    break
                }
            }
        }
    }

    return fromAsync(iterator)
}

export function partition<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource[][] {
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

export async function partitionAsync<TSource>(
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

export function select<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>
export function select<TSource, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>
export function select<TSource, TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => TResult) | TKey): IEnumerable<TSource[TKey]> | IEnumerable<TResult> {

    if (typeof selector === "string") {
        return EnumerablePrivate.select_2(source, selector)
    } else {
        return EnumerablePrivate.select_1(source, selector as (x: TSource) => TResult)
    }
}

export function selectAsync<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
export function selectAsync<TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return EnumerablePrivate.selectAsync_2(source, selector)
    } else {
        return EnumerablePrivate.selectAsync_1(source, selector as (x: TSource) => Promise<TResult>)
    }
}

export function selectMany<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult>
export function selectMany<
    TSource extends { [key: string]: Iterable<TResult>}, TResult>(
        source: Iterable<TSource>,
        selector: keyof TSource): IEnumerable<TResult>
export function selectMany<TSource extends { [key: string]: Iterable<TResult>}, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => Iterable<TResult>) | keyof TSource) {
    if (typeof selector === "string") {
        return EnumerablePrivate.selectMany_2(source, selector)
    } else {
        return EnumerablePrivate.selectMany_1(source, selector as (x: TSource) => Iterable<TResult>)
    }
}

export function selectManyAsync<TSource, TResult>(
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

    return fromAsync(generator)
}

/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains more than one element
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export function single<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return EnumerablePrivate.single_2(source, predicate)
    } else {
        return EnumerablePrivate.single_1(source)
    }
}

/**
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export async function singleAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (await predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
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

/**
 * @throws {InvalidOperationException} More than one element
 */
export function singleOrDefault<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null {

    if (predicate) {
        return EnumerablePrivate.singleOrDefault_2(source, predicate)
    } else {
        return EnumerablePrivate.singleOrDefault_1(source)
    }
}


/**
 * @throws {InvalidOperationException} More than one element matchines predicate
 */
export async function singleOrDefaultAsync<TSource>(
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


export function skip<TSource>(source: Iterable<TSource>, count: number): IEnumerable<TSource> {

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

export function skipWhile<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {

    if (predicate.length === 1) {
        return EnumerablePrivate.skipWhile_1(source, predicate as (x: TSource) => boolean)
    } else {
        return EnumerablePrivate.skipWhile_2(source, predicate)
    }
}

export function skipWhileAsync<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return EnumerablePrivate.skipWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return EnumerablePrivate.skipWhileAsync_2(source, predicate)
    }
}

/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains no matching element
 */
export function last<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return EnumerablePrivate.last_2(source, predicate)
    } else {
        return EnumerablePrivate.last_1(source)
    }
}

/**
 * @throws {InvalidOperationException} No Matching Element
 */
export async function lastAsync<TSource>(
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

export function lastOrDefault<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null {

    if (predicate) {
        return EnumerablePrivate.lastOrDefault_2(source, predicate)
    } else {
        return EnumerablePrivate.lastOrDefault_1(source)
    }
}

export async function lastOrDefaultAsync<TSource>(
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

/**
 * @throws {InvalidOperationException} No Elements
 */
export function max(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function max<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function max<TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number {
    if (selector) {
        return EnumerablePrivate.max_2<TSource>(source as Iterable<TSource>, selector)
    } else {
        return EnumerablePrivate.max_1(source as Iterable<number>)
    }
}

export async function maxAsync<TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let max: number | null = null
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, await selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

/**
 * @throws {InvalidOperationException} No Elements
 */
export function min(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function min<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function min<TSource>(source: Iterable<TSource> | Iterable<number>,
                             selector?: (x: TSource) => number): number {
    if (selector) {
        return EnumerablePrivate.min_2(source as Iterable<TSource>, selector)
    } else {
        return EnumerablePrivate.min_1(source as Iterable<number>)
    }
}

/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export async function minAsync<TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let min: number | null = null
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, await selector(item))
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

export function ofType<TSource, TType extends OfType>(
    source: Iterable<TSource>,
    type: TType): IEnumerable<InferType<TType>> {

    const typeCheck = typeof type === "string" ?
        ((x: TSource) => typeof x === type) as (x: TSource) => x is InferType<TType> :
        ((x: TSource) => x instanceof (type as any)) as (x: TSource) => x is InferType<TType>

    function *iterator(): IterableIterator<InferType<TType>> {
        for (const item of source) {
            if (typeCheck(item)) {
                yield item
            }
        }
    }

    return new BasicEnumerable(iterator)
}

export function orderBy<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
    return OrderedEnumerable.generate<TSource, TKey>(source, keySelector, true, comparer)
}

export function orderByAsync<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedEnumerable.generateAsync<TSource, TKey>(source, keySelector, true, comparer)
}

export function orderByDescending<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
    return OrderedEnumerable.generate<TSource, TKey>(source, keySelector, false, comparer)
}

export function orderByDescendingAsync<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedEnumerable.generateAsync<TSource, TKey>(source, keySelector, false, comparer)
}

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export function range(start: number, count: number): IEnumerable<number> {
    if (start < 0) {
        throw new ArgumentOutOfRangeException(`start`)
    }

    function* iterator() {
        const max = start + count
        for (let i = start; i < max; i++) {
            yield i
        }
    }

    return new BasicEnumerable(iterator)
}

export function repeat<T>(element: T, count: number): IEnumerable<T> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }

    function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element
        }
    }

    return new BasicEnumerable(iterator)
}

/**
 * Reverses an Iterable
 * @param source Iterable
 */
export function reverse<TSource>(source: Iterable<TSource>): IEnumerable<TSource> {
    function* iterator() {
        for (const x of [...source].reverse()) {
            yield x
        }
    }

    return new BasicEnumerable(iterator)
}

/**
 * Determines whether or not two sequences are equal
 * @param first first iterable
 * @param second second iterable
 * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
 */
export function sequenceEquals<TSource>(
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

export async function sequenceEqualsAsync<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

    const firstIterator = first[Symbol.iterator]()
    const secondIterator = second[Symbol.iterator]()

    let firstResult = firstIterator.next()
    let secondResult = secondIterator.next()

    while (!firstResult.done && !secondResult.done) {
        if (await comparer(firstResult.value, secondResult.value) === false) {
            return false
        }

        firstResult = firstIterator.next()
        secondResult = secondIterator.next()
    }

    return firstResult.done && secondResult.done
}

export function sum(source: Iterable<number>): number
export function sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function sum<TSource>(
    source: Iterable<number> | Iterable<TSource>,
    selector?: (x: TSource) => number): number {

    if (selector) {
        return EnumerablePrivate.sum_2(source as Iterable<TSource>, selector)
    } else {
        return EnumerablePrivate.sum_1(source as Iterable<number>)
    }
}

export async function sumAsync<TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let sum = 0
    for (const value of source) {
        sum += await selector(value)
    }

    return sum
}

export function take<T>(source: Iterable<T>, amount: number): IEnumerable<T> {

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

export function takeWhile<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => boolean): IEnumerable<T> {

    if (predicate.length === 1) {
        return EnumerablePrivate.takeWhile_1(source, predicate as (x: T) => boolean)
    } else {
        return EnumerablePrivate.takeWhile_2(source, predicate as (x: T, index: number) => boolean)
    }
}

export function takeWhileAsync<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {

    if (predicate.length === 1) {
        return EnumerablePrivate.takeWhileAsync_1(source, predicate as (x: T) => Promise<boolean>)
    } else {
        return EnumerablePrivate.takeWhileAsync_2(source, predicate as (x: T, index: number) => Promise<boolean>)
    }
}

export function toArray<TSource>(source: Iterable<TSource>): TSource[] {
    return [...source]
}

export function toMap<K, V>(source: Iterable<V>, selector: (x: V) => K): Map<K, V[]> {
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

export async function toMapAsync<K, V>(source: Iterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>> {
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

export function toObject<TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => string): {[key: string]: TSource} {

    const map: {[key: string]: TSource} = {}

    for (const value of source) {
        map[selector(value)] = value
    }

    return map
}

export async function toObjectAsync<TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<string>): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for (const value of source) {
        map[await selector(value)] = value
    }

    return map
}

export function toSet<TSource>(source: Iterable<TSource>): Set<TSource> {
    return new Set<TSource>(source)
}

export function union<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        if (comparer) {
            return EnumerablePrivate.union_2(first, second, comparer)
        } else {
            return EnumerablePrivate.union_1(first, second)
        }
}

export function unionAsync<TSource>(
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

    return fromAsync(iterator)
}

export function where<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => boolean): IEnumerable<T> {
    if (predicate.length === 1) {
        return EnumerablePrivate.where_1(source, predicate as (x: T) => boolean)
    } else {
        return EnumerablePrivate.where_2(source, predicate as (x: T, index: number) => boolean)
    }
}

export function whereAsync<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    if (predicate.length === 1) {
        return EnumerablePrivate.whereAsync_1(source, predicate as (x: T) => Promise<boolean>)
    } else {
        return EnumerablePrivate.whereAsync_2(source, predicate)
    }
}

export function zip<T, Y>(
    source: Iterable<T>,
    second: Iterable<Y>): IEnumerable<ITuple<T, Y>>
export function zip<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT>
export function zip<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector?: (x: T, y: Y) => OUT): IEnumerable<OUT> | IEnumerable<ITuple<T, Y>> {
    if (resultSelector) {
        return EnumerablePrivate.zip_2(source, second, resultSelector)
    } else {
        return EnumerablePrivate.zip_1(source, second)
    }
}

export function zipAsync<T, Y, OUT>(
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

    return fromAsync(generator)
}
