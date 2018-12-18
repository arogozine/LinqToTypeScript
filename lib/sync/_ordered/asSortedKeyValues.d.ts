import { IComparer } from "../../types";
/**
 * Sorts values in an Iterable based on key and a key comparer.
 * @param source Iterable
 * @param keySelector Key Selector
 * @param ascending Ascending or Descending Sort
 * @param comparer Key Comparer for Sorting. Optional.
 * @returns Iterable Iterator
 */
export declare function asSortedKeyValues<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): IterableIterator<TSource[]>;
