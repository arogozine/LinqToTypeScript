import { IComparer } from "../shared/shared";
import { InferKey, InferKeyAsync } from "../types/InferKeyAsync";
import { KeySelector, KeySelectorAsync } from "../types/KeySelector";
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable";
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable";
/**
 * Ordered Async Enumerable
 */
export declare class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    private readonly orderedPairs;
    private static asAsyncSortedKeyValues<TSource>(source, keySelector, ascending, comparer?);
    private static asAsyncSortedKeyValuesSync<TSource>(source, keySelector, ascending, comparer?);
    private static asAsyncKeyMapSync<TSource>(source, keySelector);
    private static asAsyncKeyMap<TSource>(source, keySelector);
    private static asSortedKeyValues<TSource>(source, keySelector, ascending, comparer?);
    private static asSortedKeyValuesSync<TSource>(source, keySelector, ascending, comparer?);
    private static asKeyMapSync<TSource>(source, keySelector);
    private static asKeyMap<TSource>(source, keySelector);
    static generateAsync<TSource>(source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>, keySelector: KeySelectorAsync<TSource>, ascending: boolean, comparer?: IComparer<InferKeyAsync<typeof keySelector>>): OrderedAsyncEnumerable<TSource>;
    static generate<TSource>(source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>, keySelector: KeySelector<TSource>, ascending: boolean, comparer?: IComparer<InferKey<typeof keySelector>>): OrderedAsyncEnumerable<TSource>;
    constructor(orderedPairs: () => AsyncIterable<T[]>);
    thenBy(keySelector: KeySelector<T>, comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<T>;
    thenByAsync(keySelector: KeySelectorAsync<T>, comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: KeySelector<T>, comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<T>;
    thenByDescendingAsync(keySelector: KeySelectorAsync<T>, comparer?: IComparer<number | string>): OrderedAsyncEnumerable<T>;
}
