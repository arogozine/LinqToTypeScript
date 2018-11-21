import { IComparer } from "../shared/shared";
import { IAsyncEnumerable } from "./IAsyncEnumerable";
export interface IOrderedAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {
    thenBy<TKey>(keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    thenByAsync<TKey>(keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    thenByDescending<TKey>(keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    thenByDescendingAsync<TKey>(keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
}
