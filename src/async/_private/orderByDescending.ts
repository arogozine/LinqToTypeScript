import { IAsyncEnumerable, IComparer, IOrderedAsyncEnumerable } from "../../types"
import { OrderedAsyncEnumerable } from "../OrderedAsyncEnumerable"

/**
 * Sorts the elements of a sequence in descending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export const orderByDescending = <TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> => {
    return OrderedAsyncEnumerable.generate(source, keySelector, false, comparer)
}
