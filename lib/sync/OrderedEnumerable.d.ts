import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable";
import { OrderedAsyncEnumerable } from "../async/OrderedAsyncEnumerable";
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
    static generate<TSource>(source: Iterable<TSource> | OrderedEnumerable<TSource>, keySelector: KeySelector<TSource>, ascending: boolean, comparer?: IComparer<string | number>): OrderedEnumerable<TSource>;
    private static asSortedKeyValuesAsync<TSource>(source, keySelector, ascending, comparer?);
    private static asKeyMapAsync<TSource>(source, keySelector);
    static generateAsync<TSource>(source: Iterable<TSource> | OrderedEnumerable<TSource>, keySelector: KeySelectorAsync<TSource>, ascending: boolean, comparer?: IComparer<string | number>): OrderedAsyncEnumerable<TSource>;
    private constructor();
    thenBy(keySelector: KeySelector<T>, comparer?: IComparer<string | number>): IOrderedEnumerable<T>;
    thenByAsync(keySelector: KeySelectorAsync<T>, comparer?: IComparer<string | number>): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: KeySelector<T>, comparer?: IComparer<string | number>): IOrderedEnumerable<T>;
    thenByDescendingAsync(keySelector: KeySelectorAsync<T>, comparer?: IComparer<string | number>): IOrderedAsyncEnumerable<T>;
}
