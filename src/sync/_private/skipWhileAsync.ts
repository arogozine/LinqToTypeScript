import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../types"

/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An Iterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting
 * at the first element in the linear series that does not pass the test specified by predicate.
 */
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
