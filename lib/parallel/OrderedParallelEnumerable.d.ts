import { IComparer } from "../shared/shared";
import { KeySelector, KeySelectorAsync } from "../types/KeySelector";
import { BasicParallelEnumerable } from "./BasicParallelEnumerable";
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable";
/**
 * Ordered Parallel Enumerable
 * @private
 */
export declare class OrderedParallelEnumerable<T> extends BasicParallelEnumerable<T> implements IOrderedParallelEnumerable<T> {
    private readonly orderedPairs;
    private static asAsyncSortedKeyValues<TSource>(source, keySelector, ascending, comparer?);
    private static asAsyncSortedKeyValuesSync<TSource>(source, keySelector, ascending, comparer?);
    private static asAsyncKeyMapSync<TSource>(source, keySelector);
    private static asAsyncKeyMap<TSource>(source, keySelector);
    private static asSortedKeyValues<TSource>(source, keySelector, ascending, comparer?);
    private static asSortedKeyValuesSync<TSource>(source, keySelector, ascending, comparer?);
    private static asKeyMapSync<TSource>(source, keySelector);
    private static asKeyMap<TSource>(source, keySelector);
    static generateAsync<TSource>(source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>, keySelector: KeySelectorAsync<TSource>, ascending: boolean, comparer?: IComparer<string | number>): OrderedParallelEnumerable<TSource>;
    static generate<TSource>(source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>, keySelector: KeySelector<TSource>, ascending: boolean, comparer?: IComparer<string | number>): OrderedParallelEnumerable<TSource>;
    private constructor();
    thenBy(keySelector: KeySelector<T>, comparer?: IComparer<number | string>): IOrderedParallelEnumerable<T>;
    thenByAsync(keySelector: KeySelectorAsync<T>, comparer?: IComparer<number | string>): IOrderedParallelEnumerable<T>;
    thenByDescending(keySelector: KeySelector<T>, comparer?: IComparer<number | string>): IOrderedParallelEnumerable<T>;
    thenByDescendingAsync(keySelector: KeySelectorAsync<T>, comparer?: IComparer<number | string>): OrderedParallelEnumerable<T>;
}
