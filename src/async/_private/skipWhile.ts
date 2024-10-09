import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const skipWhile = <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> => {

    if (predicate.length === 1) {
        return skipWhile1(source, predicate as (x: TSource) => boolean)
    } else {
        return skipWhile2(source, predicate)
    }
}

const skipWhile1 = <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource> => {

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

const skipWhile2 = <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> => {

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
