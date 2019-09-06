import { IComparer, IEnumerable, IOrderedAsyncEnumerable } from "./"

/**
 * Ordered Iterable type with methods from LINQ.
 */
export interface IOrderedEnumerable<TSource> extends IEnumerable<TSource> {
    thenBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>
    thenByAsync<TKey>(
        keySelector: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
    thenByDescending<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>
    thenByDescendingAsync<TKey>(
        keySelector: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
}
