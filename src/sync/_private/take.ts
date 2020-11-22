import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 * @returns An IEnumerable<T> that contains the specified number of elements from the start of the input sequence.
 */
export const take = <TSource>(source: Iterable<TSource>, amount: number): IEnumerable<TSource> => {

    function* iterator() {
        // negative amounts should yield empty
        let amountLeft = amount > 0 ? amount : 0
        for (const item of source) {
            if (amountLeft-- === 0) {
                break
            } else {
                yield item
            }
        }
    }

    return new BasicEnumerable<TSource>(iterator)
}
