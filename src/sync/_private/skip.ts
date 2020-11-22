import { IEnumerable } from "../../types/IEnumerable"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An Iterable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns An IEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
export const skip = <TSource>(source: Iterable<TSource>, count: number): IEnumerable<TSource> => {

    function* iterator() {
        let i = 0
        for (const item of source) {
            if (i++ >= count) {
                yield item
            }
        }
    }

    return new BasicEnumerable<TSource>(iterator)
}
