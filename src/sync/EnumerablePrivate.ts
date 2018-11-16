import {
    AsTuple,
    ErrorString,
    IEqualityComparer, InvalidOperationException, ITuple } from "../shared/shared"
import {
    from as fromAsync,
    IAsyncEnumerable,
} from "./../async/async"
import { BasicEnumerable } from "./BasicEnumerable"
import { IEnumerable } from "./sync"

// tslint:disable:completed-docs

export function select_1<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult> {
    function* iterator() {
        for (const value of source) {
            yield selector(value)
        }
    }

    return new BasicEnumerable(iterator)
}

export function select_2<TSource, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]> {
    function* iterator() {
        for (const value of source) {
            yield value[key]
        }
    }

    return new BasicEnumerable(iterator)
}

export function selectAsync_1<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for (const value of source) {
            yield selector(value)
        }
    }

    return fromAsync(iterator)
}

export function selectAsync_2<
    TSource extends { [ key: string]: Promise<TResult> },
    TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for (const value of source) {
            yield value[key]
        }
    }

    return fromAsync(iterator)
}

export function selectMany_1<TSource, TResult>(
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

export function selectMany_2<TSource extends { [key: string]: Iterable<TResult> }, TResult>(
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

export function single_1<TSource>(source: Iterable<TSource>): TSource {
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

export function single_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (predicate(value)) {
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

export function singleOrDefault_1<TSource>(source: Iterable<TSource>): TSource | null {
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

export function singleOrDefault_2<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): TSource | null {

    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (predicate(value)) {
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

export function skipWhile_1<TSource>(
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

export function skipWhile_2<TSource>(
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

export function skipWhileAsync_1<TSource>(
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

    return fromAsync(iterator)
}

export function skipWhileAsync_2<TSource>(
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

    return fromAsync(iterator)
}

export function last_1<TSource>(source: Iterable<TSource>): TSource {
    let last: TSource | undefined

    for (const value of source) {
        last = value
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return last
}

export function last_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource {
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

export function lastOrDefault_1<TSource>(source: Iterable<TSource>): TSource | null {
    let last: TSource | null = null

    for (const value of source) {
        last = value
    }

    return last
}

export function lastOrDefault_2<TSource>(
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

export function max_1(source: Iterable<number>): number {
    let max: number | null = null
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, item)
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

export function max_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number {
    let max: number | null = null
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

export function min_1(source: Iterable<number>) {
    let min: number | null = null
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, item)
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

export function min_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number) {
    let min: number | null = null
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, selector(item))
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

export function sum_1(source: Iterable<number>): number {
    let sum = 0
    for (const value of source) {
        sum += value
    }

    return sum
}

export function sum_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number {
    let sum = 0
    for (const value of source) {
        sum += selector(value)
    }

    return sum
}

export function takeWhile_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
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

export function takeWhile_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
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

export function takeWhileAsync_1<T>(
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

    return fromAsync(iterator)
}

export function takeWhileAsync_2<T>(
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

    return fromAsync(iterator)
}

export function union_1<TSource>(
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

export function union_2<TSource>(
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

export function where_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
    function* iterator() {
        for (const item of source) {
            if (predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}

export function where_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
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

export function whereAsync_1<T>(
    source: Iterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* generator() {
        for (const item of source) {
            if (await predicate(item) === true) {
                yield item
            }
        }
    }

    return fromAsync(generator)
}

export function whereAsync_2<T>(
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

    return fromAsync(generator)
}

export function zip_1<T, Y>(source: Iterable<T>, second: Iterable<Y>): IEnumerable<ITuple<T, Y>> {
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

export function zip_2<T, Y, OUT>(
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
