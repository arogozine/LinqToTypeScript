import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../types"

export function skipWhileAsync<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return skipWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return skipWhileAsync_2(source, predicate)
    }
}

function skipWhileAsync_1<TSource>(
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

    return from(iterator)
}

function skipWhileAsync_2<TSource>(
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

    return from(iterator)
}
