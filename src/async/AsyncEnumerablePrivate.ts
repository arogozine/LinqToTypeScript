import { IAsyncEnumerable, IAsyncEqualityComparer, IEqualityComparer,
    IGrouping } from "../types"
import { AsTuple, ITuple } from "./../shared/shared"
import { Grouping } from "./../sync/Grouping"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"

// tslint:disable:completed-docs

export function groupBy_0_Simple<TSource>(
    source: AsyncIterable<TSource>,
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

        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function groupBy_0<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for await (const value of source) {
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

        for (const g of keyMap) {
            yield g
        }
    }

    return new BasicAsyncEnumerable(generate)
}

export function groupByAsync_0_Simple<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<any>): IAsyncEnumerable<IGrouping<any, TSource>> {

    async function *iterator(): AsyncIterableIterator<IGrouping<string, TSource>> {
        const keyMap: {[key: string]: Grouping<any, TSource>} = {}
        for await (const value of source) {

            const key = await keySelector(value)
            const grouping: Grouping<any, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<any, TSource>(key, value)
            }
        }

        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function groupByAsync_0<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for await (const value of source) {
            const key = await keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (await comparer(group.key, key) === true) {
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

    return new BasicAsyncEnumerable(generate)
}

export function groupBy_1_Simple<TSource, TElement>(
    source: AsyncIterable<TSource>,
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

export function groupBy_1<TSource, TKey, TElement>(
    source: AsyncIterable<TSource>,
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

export function select_1<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for await (const value of source) {
            yield selector(value)
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function select_2<TSource, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]> {
    async function* iterator() {
        for await (const value of source) {
            yield value[key]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function selectAsync_1<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for await (const value of source) {
            yield selector(value)
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function selectAsync_2<
    TSource extends { [ key: string]: Promise<TResult> },
    TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for await (const value of source) {
            yield value[key]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function selectMany_1<TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y> {
    async function* iterator() {
        for await (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function selectMany_2
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
    source: AsyncIterable<TSource>,
    selector: keyof TSource): IAsyncEnumerable<Y> {
    async function* iterator() {
        for await (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function skipWhile_1<TSource>(
    source: AsyncIterable<TSource>,
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

export function skipWhile_2<TSource>(
    source: AsyncIterable<TSource>,
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

export function skipWhileAsync_1<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let skip = true
        for await (const item of source) {

            if (skip === false) {
                yield item
            } else if (await predicate(item) === false) {
                skip = false
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function skipWhileAsync_2<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let index = 0
        let skip = true
        for await (const item of source) {

            if (skip === false) {
                yield item
            } else if (await predicate(item, index) === false) {
                skip = false
                yield item
            }

            index++
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function repeat_1<T>(element: T, count: number): IAsyncEnumerable<T> {
    async function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function repeat_2<T>(element: T, count: number, delay: number): IAsyncEnumerable<T> {
    async function* iterator() {
        for (let i = 0; i < count; i++) {
            yield await new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function takeWhile_1<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): IAsyncEnumerable<T> {
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

export function takeWhile_2<T>(
    source: AsyncIterable<T>, predicate: (x: T, index: number) => boolean): IAsyncEnumerable<T> {
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
export function takeWhileAsync_1<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        for await (const item of source) {
            if (await predicate(item)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

export function takeWhileAsync_2<T>(
    source: AsyncIterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        let index = 0
        for await (const item of source) {
            if (await predicate(item, index++)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}
export function union_1<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>) {

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

export function union_2<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
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

export function where_1<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): IAsyncEnumerable<T> {
    async function* iterator() {
        for await (const item of source) {
            if (predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

export function where_2<T>(
    source: AsyncIterable<T>, predicate: (x: T, index: number) => boolean): IAsyncEnumerable<T> {
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

export function whereAsync_1<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        for await (const item of source) {
            if (await predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

export function whereAsync_2<T>(
    source: AsyncIterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        let i = 0
        for await (const item of source) {
            if (await predicate(item, i++) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

export function zip_1<T, Y>(
    source: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<ITuple<T, Y>> {
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

export function zip_2<T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
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
