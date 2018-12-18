import { IComparer } from "../../types";
export declare function asAsyncSortedKeyValues<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<TKey>, ascending: boolean, comparer?: IComparer<TKey>): AsyncIterableIterator<TSource[]>;
