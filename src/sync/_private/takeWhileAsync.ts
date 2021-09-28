import { fromAsync } from "../../async/static/fromAsync"
import { IAsyncEnumerable } from "../../types"

/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence
 * that occur before the element at which the test no longer passes.
 */
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
