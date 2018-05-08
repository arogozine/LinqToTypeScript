import { IComparer } from "../shared/shared";
import { BasicParallelEnumerable } from "./BasicParallelEnumerable";
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable";
/**
 * Ordered Parallel Enumerable
 * @private
 */
export declare class OrderedParallelEnumerable<T> extends BasicParallelEnumerable<T> implements IOrderedParallelEnumerable<T> {
    private readonly orderedPairs;
    private static asAsyncSortedKeyValues<TSource, TKey>(source, keySelector, ascending, comparer?);
    private static asAsyncSortedKeyValuesSync<TSource, TKey>(source, keySelector, ascending, comparer?);
    private static asAsyncKeyMapSync<TSource, TKey>(source, keySelector);
    private static asAsyncKeyMap<TSource, TKey>(source, keySelector);
    private static asSortedKeyValues<TSource, TKey>(source, keySelector, ascending, comparer?);
    private static asSortedKeyValuesSync<TSource, TKey>(source, keySelector, ascending, comparer?);
    private static asKeyMapSync<TSource, TKey>(source, keySelector);
    private static asKeyMap<TSource, TKey>(source, keySelector);
    static generateAsync<TSource, TKey>(source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, ascending: boolean, comparer?: IComparer<TKey>): OrderedParallelEnumerable<TSource>;
    static generate<TSource, TKey>(source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): OrderedParallelEnumerable<TSource>;
    private constructor();
    thenBy<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T>;
    thenByAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T>;
    thenByDescending<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T>;
    thenByDescendingAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T>;
}
