import "core-js/modules/es7.symbol.async-iterator"

import { from as parallelFrom, IParallelEnumerable } from "../parallel/parallel"
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
} from "./../shared/shared"
import * as AsyncEnumerablePrivate from "./AsyncEnumerablePrivate"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"
import { IAsyncEnumerable } from "./IAsyncEnumerable"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"
import { OrderedAsyncEnumerable } from "./OrderedAsyncEnumerable"

// tslint:disable:no-shadowed-variable

/**
 * Provides static methods that work with IAsyncEnumerable<T> and AsyncIterable<T>
 */

export { aggregate } from "./_private/aggregate"
export { all } from "./_private/all"

export async function allAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for await (const item of source) {
        if (await predicate(item) === false) {
            return false
        }
    }

    return true
}

export function any<TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<boolean> {
    if (predicate) {
        return AsyncEnumerablePrivate.any_2(source, predicate)
    } else {
        return AsyncEnumerablePrivate.any_1(source)
    }
}

export async function anyAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for await (const item of source) {
        if (await predicate(item) === true) {
            return true
        }
    }

    return false
}

export function average(
    source: AsyncIterable<number>): Promise<number>
export function average<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function average<TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return AsyncEnumerablePrivate.average_2(source as AsyncIterable<TSource>, selector)
    } else {
        return AsyncEnumerablePrivate.average_1(source as AsyncIterable<number>)
    }
}

export function asParallel<TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource> {
    async function generator() {
        const data = []
        for await(const value of source) {
            data.push(value)
        }
        return data
    }

    return parallelFrom(ParallelGeneratorType.PromiseToArray, generator)
}

export async function averageAsync<TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource) => Promise<number>): Promise<number> {
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

export function concat<TSource>(
    first: AsyncIterable<TSource>, second: AsyncIterable<TSource>): IAsyncEnumerable<TSource> {
    async function* iterator() {
        yield* first
        yield* second
    }

    return new BasicAsyncEnumerable(iterator)
}

export async function contains<TSource>(
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

export async function containsAsync<TSource>(
    source: AsyncIterable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

    for await (const item of source) {
        if (await comparer(value, item)) {
            return true
        }
    }

    return false
}

export function count<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<number> {
    if (predicate) {
        return AsyncEnumerablePrivate.count_2(source, predicate)
    } else {
        return AsyncEnumerablePrivate.count_1(source)
    }
}

export async function countAsync<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): Promise<number> {
    let count = 0
    for await (const value of source) {
        if (await predicate(value) === true) {
            count++
        }
    }
    return count
}

export function distinct<TSource>(
    source: AsyncIterable<TSource>,
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

export function distinctAsync<TSource>(
    source: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        const distinctElements: TSource[] = []
        outerLoop:
        for await (const item of source) {
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

    return new BasicAsyncEnumerable(iterator)
}

/**
 * @throws {ArgumentOutOfRangeException}
 */
export async function elementAt<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource> {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    let i = 0
    for await (const item of source) {
        if (index === i++) {
            return item
        }
    }

    throw new ArgumentOutOfRangeException("index")
}

export async function elementAtOrDefault<TSource>(
    source: AsyncIterable<TSource>, index: number): Promise<TSource | null> {
    let i = 0
    for await (const item of source) {
        if (index === i++) {
            return item
        }
    }

    return null
}

export function empty<TSource>(): IAsyncEnumerable<TSource> {
    async function *iterable() {
        for await (const _ of []) {
            yield _
        }
    }

    return new BasicAsyncEnumerable<TSource>(iterable)
}

export function enumerateObject<TInput>(
    source: TInput): IAsyncEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>> {
    async function *iterable() {
        /* tslint:disable */
        for (const key in source) {
            yield {
                first: key,
                second: source[key]
            }
        }
        /* tslint:enable */
    }

    return new BasicAsyncEnumerable(iterable)
}

// tslint:disable:no-shadowed-variable

export function except<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
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

export function exceptAsync<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

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

    return new BasicAsyncEnumerable(iterator)
}

/**
 * @throws {InvalidOperationException} There are no elements
 */
export function first<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return AsyncEnumerablePrivate.first_2(source, predicate)
    } else {
        return AsyncEnumerablePrivate.first_1(source)
    }
}

/**
 * @throws {InvalidOperationException} There are no elements matching predicate
 */
export async function firstAsync<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): Promise<T> {
    for await (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}

export function firstOrDefault<T>(source: AsyncIterable<T>, predicate?: (x: T) => boolean): Promise<T | null> {
    if (predicate) {
        return AsyncEnumerablePrivate.firstOrDefault_2(source, predicate)
    } else {
        return AsyncEnumerablePrivate.firstOrDefault_1(source)
    }
}

export async function firstOrDefaultAsync<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): Promise<T | null> {
    for await (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}

export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>): IAsyncEnumerable<TSource>
export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>,
    shallow: false): IAsyncEnumerable<TSource>
export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>,
    shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>
export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>,
    shallow?: boolean): IAsyncEnumerable<TSource | AsyncIterable<TSource>> {

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

    return new BasicAsyncEnumerable(() => iterator(source))
}

/**
 * @throws {InvalidOperationException} No Elements in the Promises Array
 */
export function from<TSource>(promises: Array<Promise<TSource>>): IAsyncEnumerable<TSource>
export function from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>
export function from<TSource>(promisesOrIterable: Array<Promise<TSource>> | (() => AsyncIterableIterator<TSource>)) {
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

export function fromEvent<K extends keyof HTMLElementEventMap>(
    element: Element, type: K): IAsyncEnumerable<HTMLElementEventMap[K]>
export function fromEvent(element: Element, type: string): IAsyncEnumerable<Event>
export function fromEvent(element: Element, type: string) {
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

    return new BasicAsyncEnumerable(eventGenerator)
}

export function each<TSource>(
    source: AsyncIterable<TSource>, action: (x: TSource) => void): IAsyncEnumerable<TSource> {
    async function *iterator() {
        for await (const value of source) {
            action(value)
            yield value
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function eachAsync<TSource>(
    source: AsyncIterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
    async function *iterator() {
        for await (const value of source) {
            await action(value)
            yield value
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function groupBy<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
export function groupBy<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
export function groupBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return AsyncEnumerablePrivate.groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        return AsyncEnumerablePrivate.groupBy_0_Simple(source,
            keySelector as ((x: TSource) => number) | ((x: TSource) => string))
    }
}

export function groupByAsync<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>
export function groupByAsync<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>
export function groupByAsync<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupByAsync<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return AsyncEnumerablePrivate.groupByAsync_0<TSource, TKey>(source, keySelector, comparer)
    } else {
        return AsyncEnumerablePrivate.groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => Promise<any>)
    }
}

export function groupByWithSel<TSource, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>
export function groupByWithSel<TSource, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => TKey),
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TElement>> {

    if (comparer) {
        return AsyncEnumerablePrivate.groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return AsyncEnumerablePrivate.groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}

export function join<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult): IAsyncEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
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

// tslint:disable:no-shadowed-variable

export function intersect<TSource>(
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

export function intersectAsync<TSource>(
    first: IAsyncEnumerable<TSource>,
    second: IAsyncEnumerable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator(): AsyncIterableIterator<TSource> {

        const firstResults = await first.distinctAsync(comparer).toArray()

        if (firstResults.length === 0) {
            return
        }

        const secondResults = await second.toArray()

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

    return new BasicAsyncEnumerable(iterator)
}

export function select<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult>
export function select<TSource, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function select<T, Y>(
    source: IAsyncEnumerable<T> | AsyncIterable<T>, selector: (x: T) => Y | string): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.select_2(source, selector)
    } else {
        return AsyncEnumerablePrivate.select_1(source, selector)
    }
}

export function selectAsync<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
export function selectAsync<TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.selectAsync_2(source, selector)
    } else {
        return AsyncEnumerablePrivate.selectAsync_1(source, selector as (x: TSource) => Promise<TResult>)
    }
}

export function selectMany
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
    source: AsyncIterable<TSource>,
    selector: keyof TSource): IAsyncEnumerable<Y>
export function selectMany<TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>
export function selectMany(
    source: AsyncIterable<any>,
    selector: any): IAsyncEnumerable<any> {
    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.selectMany_2(source, selector)
    } else {
        return AsyncEnumerablePrivate.selectMany_1(source, selector)
    }
}

export function selectManyAsync<TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<Iterable<Y>>): IAsyncEnumerable<Y> {
    async function* iterator() {
        for await (const value of source) {
            const many = await selector(value)
            for (const innerValue of many) {
                yield innerValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
export function single<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return AsyncEnumerablePrivate.single_2(source, predicate)
    } else {
        return AsyncEnumerablePrivate.single_1(source)
    }
}

/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
export async function singleAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
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

export function singleOrDefault<TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource | null> {

    if (predicate) {
        return AsyncEnumerablePrivate.singleOrDefault_2(source, predicate)
    } else {
        return AsyncEnumerablePrivate.singleOrDefault_1(source)
    }
}

export async function singleOrDefaultAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {

    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (await predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    return singleValue
}

export function skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource> {

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

export function skipWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.skipWhile_1(source, predicate as (x: TSource) => boolean)
    } else {
        return AsyncEnumerablePrivate.skipWhile_2(source, predicate)
    }
}

export function skipWhileAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.skipWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return AsyncEnumerablePrivate.skipWhileAsync_2(source, predicate)
    }
}

export function ofType<TSource, TType extends OfType>(
    source: AsyncIterable<TSource>,
    type: TType): IAsyncEnumerable<InferType<TType>> {

    const typeCheck = typeof type === "string" ?
        ((x: TSource) => typeof x === type) as (x: TSource) => x is InferType<TType> :
        ((x: TSource) => x instanceof (type as any)) as (x: TSource) => x is InferType<TType>

    async function *iterator(): AsyncIterableIterator<InferType<TType>> {
        for await (const item of source) {
            if (typeCheck(item)) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function orderBy<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generate(source, keySelector, true, comparer)
}

export function orderByAsync<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generateAsync(source, keySelector, true, comparer)
}

export function orderByDescending<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generate(source, keySelector, false, comparer)
}

export function orderByDescendingAsync<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generateAsync(source, keySelector, false, comparer)
}

/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export async function last<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return AsyncEnumerablePrivate.last_2(source, predicate)
    } else {
        return AsyncEnumerablePrivate.last_1(source)
    }
}

/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export async function lastAsync<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let last: TSource | null = null

    for await (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return last
}

export async function lastOrDefault<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null> {

    if (predicate) {
        return AsyncEnumerablePrivate.lastOrDefault_2(source, predicate)
    } else {
        return AsyncEnumerablePrivate.lastOrDefault_1(source)
    }
}

export async function lastOrDefaultAsync<T>(
    source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null> {

    let last: T | null = null

    for await (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    return last
}

/**
 * @throws {InvalidOperationException} No Elements
 * @param source Async Iteration of Numbers
 */
export function max(source: AsyncIterable<number>): Promise<number>
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function max<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function max<TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return AsyncEnumerablePrivate.max_2<TSource>(source as AsyncIterable<TSource>, selector)
    } else {
        return AsyncEnumerablePrivate.max_1(source as AsyncIterable<number>)
    }
}

/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export async function maxAsync<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let max: number | null = null
    for await (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, await selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

export function min(source: AsyncIterable<number>): Promise<number>
export function min<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function min(source: AsyncIterable<number>, selector?: (x: number) => number): Promise<number> {
    if (selector) {
        return AsyncEnumerablePrivate.min_2(source, selector)
    } else {
        return AsyncEnumerablePrivate.min_1(source)
    }
}

/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export async function minAsync<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    let min: number | null = null
    for await (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, await selector(item))
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export function range(start: number, count: number): IAsyncEnumerable<number> {
    if (start < 0) {
        throw new ArgumentOutOfRangeException(`start`)
    }

    async function* iterator() {
        const max = start + count
        for (let i = start; i < max; i++) {
            yield i
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function repeat<T>(
    element: T, count: number, delay?: number): IAsyncEnumerable<T> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }
    if (delay) {
        return AsyncEnumerablePrivate.repeat_2(element, count, delay)
    } else {
        return AsyncEnumerablePrivate.repeat_1(element, count)
    }
}

export function reverse<TSource>(source: AsyncIterable<TSource>): IAsyncEnumerable<TSource> {

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

export async function sequenceEquals<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
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

export async function sequenceEqualsAsync<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

    const firstIterator = first[Symbol.asyncIterator]()
    const secondIterator = second[Symbol.asyncIterator]()

    let results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
    let firstResult = results[0]
    let secondResult = results[1]

    while (!firstResult.done && !secondResult.done) {
        if (await comparer(firstResult.value, secondResult.value) === false) {
            return false
        }

        results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
        firstResult = results[0]
        secondResult = results[1]
    }

    return firstResult.done && secondResult.done
}

export function sum(
    source: AsyncIterable<number>): Promise<number>
export function sum<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function sum<TSource>(
    source: AsyncIterable<number> | AsyncIterable<TSource>,
    selector?: (x: TSource) => number): Promise<number> {

    if (selector) {
        return AsyncEnumerablePrivate.sum_2(source as AsyncIterable<TSource>, selector)
    } else {
        return AsyncEnumerablePrivate.sum_1(source as AsyncIterable<number>)
    }
}

export async function sumAsync<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    let sum = 0
    for await (const value of source) {
        sum += await selector(value)
    }

    return sum
}

export function take<TSource>(source: AsyncIterable<TSource>, amount: number): IAsyncEnumerable<TSource> {
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

export function takeWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.takeWhile_1(source, predicate as (x: TSource) => boolean)
    } else {
        return AsyncEnumerablePrivate.takeWhile_2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

export function takeWhileAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.takeWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return AsyncEnumerablePrivate.takeWhileAsync_2(source, predicate)
    }
}

export async function toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]> {
    const array = []
    for await (const item of source) {
        array.push(item)
    }
    return array
}

export async function toMap<K, V>(source: AsyncIterable<V>, selector: (x: V) => K): Promise<Map<K, V[]>> {
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

export async function toMapAsync<K, V>(
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

export async function toObject<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => string): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for await (const value of source) {
        map[selector(value)] = value
    }

    return map
}

export async function toObjectAsync<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<string>): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for await (const value of source) {
        map[await selector(value)] = value
    }

    return map
}

export async function toSet<TSource>(source: AsyncIterable<TSource>): Promise<Set<TSource>> {
    const set = new Set<TSource>()
    for await (const item of source) {
        set.add(item)
    }
    return set
}

export function union<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
    if (comparer) {
        return AsyncEnumerablePrivate.union_2(first, second, comparer)
    } else {
        return AsyncEnumerablePrivate.union_1(first, second)
    }
}

export function unionAsync<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const result: TSource[] = []

        for (const source of [first, second]) {
            for await (const value of source) {
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

    return new BasicAsyncEnumerable(iterator)
}

export function where<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>
export function where<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
export function where<TSource>(
    source: AsyncIterable<TSource>,
    predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IAsyncEnumerable<TSource> {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.where_1(source, predicate as (x: TSource) => boolean)
    } else {
        return AsyncEnumerablePrivate.where_2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

export function whereAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource>
export function whereAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>
export function whereAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.whereAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return AsyncEnumerablePrivate.whereAsync_2(source, predicate)
    }
}

export function zip<T, Y>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>): IAsyncEnumerable<ITuple<T, Y>>
export function zip<T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT>
export function zip<T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
    resultSelector?: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT> | IAsyncEnumerable<ITuple<T, Y>> {
    if (resultSelector) {
        return AsyncEnumerablePrivate.zip_2(source, second, resultSelector)
    } else {
        return AsyncEnumerablePrivate.zip_1(source, second)
    }
}

export function zipAsync<T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
    resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT> {
    async function *generator() {
        const firstIterator = source[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const results = await Promise.all([firstIterator.next(), secondIterator.next()])
            const firstNext = results[0]
            const secondNext = results[1]

            if (firstNext.done || secondNext.done) {
                break
            } else {
                yield resultSelector(firstNext.value, secondNext.value)
            }
        }
    }

    return new BasicAsyncEnumerable(generator)
}
