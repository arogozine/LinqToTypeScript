import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const takeWhile = <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> => {

    if (predicate.length === 1) {
        return takeWhile1(source, predicate as (x: TSource) => boolean)
    } else {
        return takeWhile2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

const takeWhile1 = <T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): IAsyncEnumerable<T> => {
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

const takeWhile2 = <T>(
    source: AsyncIterable<T>, predicate: (x: T, index: number) => boolean): IAsyncEnumerable<T> => {
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
