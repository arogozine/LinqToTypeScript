import { IComparer } from "../../types";
export declare function asSortedKeyValues<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): AsyncIterableIterator<TSource[]>;
