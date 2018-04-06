import { IOrderedAsyncEnumerable } from "./../async/IOrderedAsyncEnumerable";
import { IComparer, RecOrdMap } from "./../shared/shared";
import { BasicEnumerable } from "./BasicEnumerable";
import { IOrderedEnumerable } from "./IOrderedEnumerable";
export declare class OrderedEnumerableDescending<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {
    private readonly map;
    private static unrollAndSort<T>(map, comparer?);
    private static generate<T>(mapFunc, comparer?);
    constructor(map: () => RecOrdMap<T>, comparer?: IComparer<number | string>);
    getMap(): RecOrdMap<T>;
    thenBy(keySelector: (x: T) => string | number): IOrderedEnumerable<T>;
    thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>;
    thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string | number): IOrderedEnumerable<T>;
    thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>;
}
