import { IComparer } from "../../types";
export declare function asSortedKeyValuesSync<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): AsyncIterableIterator<TSource[]>;
