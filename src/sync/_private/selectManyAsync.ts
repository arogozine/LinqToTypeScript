import { fromAsync } from "../../async/static/fromAsync"
import { IAsyncEnumerable } from "../../types"

export const selectManyAsync = <TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult> => {
    if (selector.length === 1) {
        return selectManyAsync1(source, selector as (x: TSource) => Promise<Iterable<TResult>>)
    } else {
        return selectManyAsync2(source, selector)
    }
}

const selectManyAsync1 = <TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<Iterable<TResult>>) => {
    async function* generator() {
        for (const value of source) {
            const innerValues = await selector(value)
            for (const innerValue of innerValues) {
                yield innerValue
            }
        }
    }

    return fromAsync(generator)
}

const selectManyAsync2 = <TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource, index: number) => Promise<Iterable<TResult>>) => {
    async function* generator() {
        let index = 0
        for (const value of source) {
            const innerValues = await selector(value, index)
            for (const innerValue of innerValues) {
                yield innerValue
            }
            index++
        }
    }

    return fromAsync(generator)
}
