import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Inverts the order of the elements in a sequence.
 * @param source A sequence of values to reverse.
 * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
 */
export function reverse<TSource>(source: AsyncIterable<TSource>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        const values = []
        for await (const value of source) {
            values.push(value)
        }

        for (let i = values.length - 1; i >= 0; i--) {
            yield values[i]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
