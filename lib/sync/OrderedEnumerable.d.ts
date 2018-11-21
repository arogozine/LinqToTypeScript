import { OrderedAsyncEnumerable } from "../async/OrderedAsyncEnumerable";
import { IOrderedAsyncEnumerable, IOrderedEnumerable } from "../types";
import { IComparer } from "./../shared/shared";
import { BasicEnumerable } from "./BasicEnumerable";
/**
 * Represents Ordered Enumeration
 * @private
 */
export declare class OrderedEnumerable<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {
    private readonly orderedPairs;
    static generate<TSource, TKey>(source: Iterable<TSource> | OrderedEnumerable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): OrderedEnumerable<TSource>;
    static generateAsync<TSource, TKey>(source: Iterable<TSource> | OrderedEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, ascending: boolean, comparer?: IComparer<TKey>): OrderedAsyncEnumerable<TSource>;
    private constructor();
    thenBy<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<T>;
    thenByAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
    thenByDescending<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<T>;
    thenByDescendingAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T>;
}
