import { IComparer } from "../shared/shared";
import { KeySelector } from "../types/KeySelector";
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable";
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable";
/**
 * Ordered Async Enumerable
 */
export declare class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    private readonly orderedPairs;
    private static asSortedKeyValues<TSource>(source, keySelector, ascending, comparer?);
    private static asSortedKeyValuesSync<TSource>(source, keySelector, ascending, comparer?);
    private static asKeyMapSync<TSource>(source, keySelector);
    private static asKeyMap<TSource>(source, keySelector);
    static generate<TSource>(source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>, keySelector: KeySelector<TSource>, ascending: boolean, comparer?: IComparer<string | number>): OrderedAsyncEnumerable<TSource>;
    private constructor();
    thenBy(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>;
    thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>;
    thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>;
}
