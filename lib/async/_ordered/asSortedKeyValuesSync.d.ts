import { IComparer } from "../../types";
/**
 * Sorts values in an Iterable based on key and a key comparer.
 * @param source Iterable
 * @param keySelector Key Selector
 * @param ascending Ascending or Descending Sort
 * @param comparer Key Comparer for Sorting. Optional.
 * @returns Async Iterable Iterator
 */
export declare function asSortedKeyValuesSync<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): AsyncIterableIterator<TSource[]>;
