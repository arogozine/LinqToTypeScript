import { IComparer } from "../../types";
/**
 * Sorts values in an Async Iterable based on key and a key comparer.
 * @param source Async Iterable
 * @param keySelector Async Key Selector
 * @param ascending Ascending or Descending Sort
 * @param comparer Key Comparer for Sorting. Optional.
 * @returns Async Iterable Iterator of arrays
 */
export declare function asAsyncSortedKeyValues<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<TKey>, ascending: boolean, comparer?: IComparer<TKey>): AsyncIterableIterator<TSource[]>;
