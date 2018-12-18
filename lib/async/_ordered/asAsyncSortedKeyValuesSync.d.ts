import { IComparer } from "../../types";
export declare function asAsyncSortedKeyValuesSync<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey>, ascending: boolean, comparer?: IComparer<TKey>): AsyncIterableIterator<TSource[]>;
