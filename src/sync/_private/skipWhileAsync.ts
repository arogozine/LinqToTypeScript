import { fromAsync } from "../../async/static/fromAsync"
import { IAsyncEnumerable } from "../../types"

export const skipWhileAsync = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> => {

    if (predicate.length === 1) {
        return skipWhileAsync1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return skipWhileAsync2(source, predicate)
    }
}

const skipWhileAsync1 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource> => {

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

const skipWhileAsync2 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> => {

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
