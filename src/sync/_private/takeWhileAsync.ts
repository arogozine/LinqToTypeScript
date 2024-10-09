import { fromAsync } from "../../async/static/fromAsync"
import type { IAsyncEnumerable } from "../../types"

export const takeWhileAsync = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> => {

    if (predicate.length === 1) {
        return takeWhileAsync1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return takeWhileAsync2(source, predicate as (x: TSource, index: number) => Promise<boolean>)
    }
}

const takeWhileAsync1 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource> => {
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

const takeWhileAsync2 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> => {
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
