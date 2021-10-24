import { IAsyncEnumerable, IComparer, IOrderedAsyncEnumerable } from "../../types"
import { OrderedAsyncEnumerable } from "../OrderedAsyncEnumerable"

/**
 * Sorts the elements of a sequence in ascending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted according to a key.
 */
export const orderByAsync = <TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> => {
    return OrderedAsyncEnumerable.generateAsync(source, keySelector, true, comparer)
}
