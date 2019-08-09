import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export function where<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {
    if (predicate.length === 1) {
        return where1(source, predicate as (x: TSource) => boolean)
    } else {
        return where2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

const where1 = <T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): IAsyncEnumerable<T> => {
    async function* iterator() {
        for await (const item of source) {
            if (predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

const where2 = <T>(
    source: AsyncIterable<T>, predicate: (x: T, index: number) => boolean): IAsyncEnumerable<T> => {
    async function* iterator() {
        let i = 0
        for await (const item of source) {
            if (predicate(item, i++) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}
