import { IComparer, IOrderedParallelEnumerable } from "../types";
import { BasicParallelEnumerable } from "./BasicParallelEnumerable";
/**
 * Ordered Parallel Enumerable
 * @private
 */
export declare class OrderedParallelEnumerable<T> extends BasicParallelEnumerable<T> implements IOrderedParallelEnumerable<T> {
    private readonly orderedPairs;
    static generateAsync<TSource, TKey>(source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, ascending: boolean, comparer?: IComparer<TKey>): OrderedParallelEnumerable<TSource>;
    static generate<TSource, TKey>(source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>, keySelector: (x: TSource) => TKey, ascending: boolean, comparer?: IComparer<TKey>): OrderedParallelEnumerable<TSource>;
    private constructor();
    thenBy<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T>;
    thenByAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T>;
    thenByDescending<TKey>(keySelector: (x: T) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T>;
    thenByDescendingAsync<TKey>(keySelector: (x: T) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T>;
}
