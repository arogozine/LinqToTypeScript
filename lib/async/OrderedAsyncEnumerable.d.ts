import { IComparer } from "../shared/shared";
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable";
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable";
/**
 * Ordered Async Enumerable
 */
export declare class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    private readonly orderedPairs;
    private static asAsyncSortedKeyValues<TSource, TKey>(source, keySelector, ascending, comparer?);
    private static asAsyncSortedKeyValuesSync<TSource, TKey>(source, keySelector, ascending, comparer?);
    private static asAsyncKeyMapSync<TSource, TKey>(source, keySelector);
    private static asAsyncKeyMap<TSource, TKey>(source, keySelector);
    private static asSortedKeyValues<TSource, TKey>(source, keySelector, ascending, comparer?);
    private static asSortedKeyValuesSync<TSource, TKey>(source, keySelector, ascending, comparer?);
    private static asKeyMapSync<TSource, TKey>(source, keySelector);
    private static asKeyMap<TSource, TKey>(source, keySelector);
    static generateAsync<TSource, TKey>(source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, ascending: boolean, comparer?: IComparer<TKey>): OrderedAsyncEnumerable<TSource>;
    static generate<TSource, TKey>(source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): OrderedAsyncEnumerable<TSource>;
    constructor(orderedPairs: () => AsyncIterable<T[]>);
    thenBy<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
    thenByAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
    thenByDescending<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
    thenByDescendingAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
}
