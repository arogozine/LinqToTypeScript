import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 * @returns An IAsyncEnumerable<T> that contains the specified number of elements from the start of the input sequence.
 */
export const take = <TSource>(source: AsyncIterable<TSource>, amount: number): IAsyncEnumerable<TSource> => {
    async function* iterator() {
        // negative amounts should yield empty
        let amountLeft = amount > 0 ? amount : 0
        for await (const item of source) {
            if (amountLeft-- === 0) {
                break
            } else {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<TSource>(iterator)
}
