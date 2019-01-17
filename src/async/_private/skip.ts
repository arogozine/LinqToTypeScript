import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An AsyncIterable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IAsyncEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
export function skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let i = 0
        for await (const item of source) {
            if (i++ >= count) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
