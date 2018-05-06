import { KeySelector } from "../types/KeySelector";
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
    private constructor();
    thenBy(keySelector: (x: T) => string | number): IOrderedEnumerable<T>;
    thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>;
    thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string | number): IOrderedEnumerable<T>;
    thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>;
}
