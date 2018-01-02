import { IComparer, RecOrdMap } from "../shared/shared";
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable";
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable";
export declare class OrderedAsyncEnumerableDescending<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    private readonly map;
    private static unrollAndSort<T>(mapPromise, comparer?);
    private static generate<T>(mapFunc, comparer?);
    constructor(map: () => Promise<RecOrdMap<T>>, comparer?: IComparer<number | string>);
    getMap(): Promise<RecOrdMap<T>>;
    thenBy(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>;
    thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>;
    thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>;
}
