import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Inverts the order of the elements in a sequence.
 * @param source A sequence of values to reverse.
 * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
 */
export const reverse = <TSource>(source: Iterable<TSource>): IEnumerable<TSource> => {
    function* iterator() {
        const array = [...source]
        for (let i = array.length - 1; i >= 0; i--) {
            yield array[i]
        }
    }

    return new BasicEnumerable(iterator)
}
