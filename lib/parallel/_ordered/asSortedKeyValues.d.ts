import { IComparer } from "../../types";
/**
 * Sorts values in an Iterable based on key and a key comparer.
 * @param source Async Iterable
 * @param keySelector Key Selector
 * @param ascending Ascending or Descending Sort
 * @param comparer Key Comparer for Sorting. Optional.
 * @returns Async Iterable Iterator
 */
export declare function asSortedKeyValues<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): AsyncIterableIterator<TSource[]>;
