import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
import {
    ArgumentOutOfRangeException,
    IAsyncEqualityComparer,
    IComparer,
    IEqualityComparer,
    ITuple,
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

// tslint:disable:no-shadowed-variable

// Enumerable module based on,
// https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx

export { aggregate } from "./_private/aggregate"
export { all } from "./_private/all"
export { allAsync } from "./_private/allAsync"
export { any } from "./_private/any"
export { anyAsync } from "./_private/anyAsync"
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
export { intersect } from "./_private/intersect"
export { intersectAsync } from "./_private/intersectAsync"
export { join } from "./_private/join"
export { last } from "./_private/last"
export { lastAsync } from "./_private/lastAsync"
export { lastOrDefault } from "./_private/lastOrDefault"
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync"
export { max } from "./_private/max"
export { maxAsync } from "./_private/maxAsync"
export { min } from "./_private/min"
export { minAsync } from "./_private/minAsync"
export { ofType } from "./_private/ofType"
export { orderBy } from "./_private/orderBy"
export { partition } from "./_private/partition"
export { partitionAsync } from "./_private/partitionAsync"
export { select } from "./_private/select"
export { selectAsync } from "./_private/selectAsync"
export { selectMany } from "./_private/selectMany"
export { selectManyAsync } from "./_private/selectManyAsync"
export { single } from "./_private/single"
export { singleAsync } from "./_private/singleAsync"
export { singleOrDefault } from "./_private/singleOrDefault"
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync"
export { skip } from "./_private/skip"
export { skipWhile } from "./_private/skipWhile"
export { skipWhileAsync } from "./_private/skipWhileAsync"

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
