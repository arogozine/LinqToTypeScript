import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable";
import { OrderedAsyncEnumerable } from "../async/OrderedAsyncEnumerable";
import { InferKey, InferKeyAsync } from "../types/InferKeyAsync";
import { KeySelector, KeySelectorAsync } from "../types/KeySelector";
import { IComparer } from "./../shared/shared";
import { BasicEnumerable } from "./BasicEnumerable";
import { IOrderedEnumerable } from "./IOrderedEnumerable";
/**
 * Represents Ordered Enumeration
 * @private
 */
export declare class OrderedEnumerable<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {
    private readonly orderedPairs;
    private static asSortedKeyValues<TSource>(source, keySelector, ascending, comparer?);
    private static asKeyMap<TSource>(source, keySelector);
    static generate<TSource>(source: Iterable<TSource> | OrderedEnumerable<TSource>, keySelector: KeySelector<TSource>, ascending: boolean, comparer?: IComparer<InferKey<typeof keySelector>>): OrderedEnumerable<TSource>;
    private static asSortedKeyValuesAsync<TSource>(source, keySelector, ascending, comparer?);
    private static asKeyMapAsync<TSource>(source, keySelector);
    static generateAsync<TSource>(source: Iterable<TSource> | OrderedEnumerable<TSource>, keySelector: KeySelectorAsync<TSource>, ascending: boolean, comparer?: IComparer<InferKeyAsync<typeof keySelector>>): OrderedAsyncEnumerable<TSource>;
    private constructor();
    thenBy(keySelector: KeySelector<T>, comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedEnumerable<T>;
    thenByAsync(keySelector: KeySelectorAsync<T>, comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: KeySelector<T>, comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedEnumerable<T>;
    thenByDescendingAsync(keySelector: KeySelectorAsync<T>, comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedAsyncEnumerable<T>;
}
