import { fromAsync } from "../../async/static/fromAsync"
import { IAsyncEnumerable } from "../../types"

export const whereAsync = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> => {
    if (predicate.length === 1) {
        return whereAsync1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return whereAsync2(source, predicate)
    }
}

const whereAsync1 = <T>(
    source: Iterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> => {
    async function* generator() {
        for (const item of source) {
            if (await predicate(item) === true) {
                yield item
            }
        }
    }

    return fromAsync(generator)
}

const whereAsync2 = <T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> => {
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
