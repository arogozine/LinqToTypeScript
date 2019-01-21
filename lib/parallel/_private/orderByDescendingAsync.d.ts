import { IAsyncParallel, IComparer, IOrderedParallelEnumerable } from "../../types";
/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @return An IOrderedParallelEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export declare function orderByDescendingAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
