import { IComparer } from "../shared/shared";
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable";
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable";
/**
 * Ordered Async Enumerable
 */
export declare class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    private readonly orderedPairs;
    private static asAsyncSortedKeyValues;
    private static asAsyncSortedKeyValuesSync;
    private static asAsyncKeyMapSync;
    private static asAsyncKeyMap;
    private static asSortedKeyValues;
    private static asSortedKeyValuesSync;
    private static asKeyMapSync;
    private static asKeyMap;
    static generateAsync<TSource, TKey>(source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, ascending: boolean, comparer?: IComparer<TKey>): OrderedAsyncEnumerable<TSource>;
    static generate<TSource, TKey>(source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): OrderedAsyncEnumerable<TSource>;
    constructor(orderedPairs: () => AsyncIterable<T[]>);
    thenBy<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
    thenByAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
    thenByDescending<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
    thenByDescendingAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
}
