import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
import {
    ArgumentOutOfRangeException,
    ErrorString,
    IAsyncEqualityComparer,
    IComparer,
    IEqualityComparer,
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
import * as EnumerablePrivate from "./EnumerablePrivate"
import { IEnumerable } from "./IEnumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"
import { OrderedEnumerable } from "./OrderedEnumerable"

export { aggregate } from "./_private/aggregate"
export { all } from "./_private/all"
export { allAsync } from "./_private/allAsync"
export { any } from "./_private/any"
export { anyAsync } from "./_private/anyAsync"
// tslint:disable:no-shadowed-variable

// Enumerable module based on,
// https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx

export { asAsync } from "./_private/asAsync"
export { asParallel } from "./_private/asParallel"

export { average } from "./_private/average"
export { averageAsync } from "./_private/averageAsync"
export { concat } from "./_private/concat"
export { contains } from "./_private/contains"
export { containsAsync } from "./_private/containsAsync"
export { count } from "./_private/count"
export { countAsync } from "./_private/countAsync"
export { distinct } from "./_private/distinct"
export { distinctAsync } from "./_private/distinctAsync"
export { each } from "./_private/each"
export { eachAsync } from "./_private/eachAsync"
export { elementAt } from "./_private/elementAt"
export { elementAtOrDefault } from "./_private/elementAtOrDefault"
export { empty } from "./_private/empty"
export { enumerateObject } from "./_private/enumerateObject"
export { except } from "./_private/except"
export { exceptAsync } from "./_private/exceptAsync"
export { first } from "./_private/first"
export { firstAsync } from "./_private/firstAsync"
export { firstOrDefault } from "./_private/firstOrDefault"
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync"
export { flatten } from "./_private/flatten"
export { from } from "./_private/from"
export { groupBy } from "./_private/groupBy"
export { groupByAsync } from "./_private/groupByAsync"
export { groupByWithSel } from "./_private/groupByWithSel"
export { groupByWithResult } from "./_private/groupByWithResult"
export { GroupByWithResultAndSelector } from "./_private/GroupByWithResultAndSelector"

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
