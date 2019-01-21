import { IAsyncParallel, IComparer, IOrderedParallelEnumerable } from "../../types";
/**
 * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @returns An IOrderedParallelEnumerable<TElement> whose elements are sorted according to a key.
 */
export declare function orderBy<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
