import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const whereAsync = <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> => {
    if (predicate.length === 1) {
        return whereAsync1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return whereAsync2(source, predicate)
    }
}

const whereAsync1 = <T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> => {
    async function* iterator() {
        for await (const item of source) {
            if (await predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

const whereAsync2 = <T>(
    source: AsyncIterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> => {
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
