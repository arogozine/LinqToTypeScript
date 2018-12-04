import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../types"

/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IEnumerable<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 */
export function whereAsync<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    if (predicate.length === 1) {
        return whereAsync_1(source, predicate as (x: T) => Promise<boolean>)
    } else {
        return whereAsync_2(source, predicate)
    }
}

function whereAsync_1<T>(
    source: Iterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* generator() {
        for (const item of source) {
            if (await predicate(item) === true) {
                yield item
            }
        }
    }

    return from(generator)
}

function whereAsync_2<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* generator() {
        let i = 0
        for (const item of source) {
            if (await predicate(item, i++) === true) {
                yield item
            }
        }
    }

    return from(generator)
}
