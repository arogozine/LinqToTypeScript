import { IAsyncEnumerable, IAsyncEqualityComparer, IEqualityComparer,
    IGrouping,
    SelectorKeyType} from "../types"
import { Grouping } from "./../sync/Grouping"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"

// tslint:disable:completed-docs

export function groupBy_0_Simple<TSource, TKey extends SelectorKeyType>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey):
        IAsyncEnumerable<IGrouping<TKey, TSource>> {

    async function *iterator(): AsyncIterableIterator<IGrouping<TKey, TSource>> {
        const keyMap: {[key: string]: Grouping<TKey, TSource>} = {}
        for await (const value of source) {

            const key = keySelector(value)
            const grouping: Grouping<TKey, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<TKey, TSource>(key, value)
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

export function groupByAsync_0_Simple<TSource, TKey extends SelectorKeyType>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

    async function *iterator(): AsyncIterableIterator<IGrouping<TKey, TSource>> {
        const keyMap: {[key: string]: Grouping<TKey, TSource>} = {}
        for await (const value of source) {

            const key = await keySelector(value)
            const grouping: Grouping<TKey, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<TKey, TSource>(key, value)
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

export function groupBy_1_Simple<TSource, TKey extends SelectorKeyType, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<TKey, TElement>> {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TElement>> {
        const keyMap: { [key: string]: Grouping<TKey, TElement> } = {}
        for await (const value of source) {

            const key = keySelector(value)
            const grouping: Grouping<TKey, TElement> = keyMap[key]
            const element = elementSelector(value)

            if (grouping) {
                grouping.push(element)
            } else {
                keyMap[key] = new Grouping<TKey, TElement>(key, element)
            }
        }

        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value]
        }
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

export const select1 = <TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => TResult) => {
    async function* iterator() {
        for await (const value of source) {
            yield selector(value)
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export const select2 = <TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource, index: number) => TResult) => {
    async function* iterator() {
        let index = 0
        for await (const value of source) {
            yield selector(value, index)
            index++
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export const select3 = <TSource, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey) => {
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

export const selectMany1 = <TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Iterable<Y>) => {
    async function* iterator() {
        for await (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export const selectMany2 = <TSource, TCollection>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource, index: number) => Iterable<TCollection>) => {
    async function* iterator() {
        let index = 0
        for await (const value of source) {
            for (const selectorValue of selector(value, index)) {
                yield selectorValue
            }
            index++
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export const selectMany3 =
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
    source: AsyncIterable<TSource>,
    selector: keyof TSource) => {
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

export function zip_1<T, Y>(
    source: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<[T, Y]> {
    async function* iterator(): AsyncIterableIterator<[T, Y]> {
        const firstIterator = source[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const result = await Promise.all([firstIterator.next(), secondIterator.next()])
            const a = result[0]
            const b = result[1]

            if (a.done && b.done) {
                break
            } else {
                yield [a.value, b.value]
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
