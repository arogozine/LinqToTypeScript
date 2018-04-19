import { IComparer, RecOrdMap } from "../shared/shared";
import { BasicParallelEnumerable } from "./BasicParallelEnumerable";
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable";
/**
 * Descending Order Parallel Enumerable
 */
export declare class OrderedParallelEnumerableDescending<T> extends BasicParallelEnumerable<T> implements IOrderedParallelEnumerable<T> {
    private readonly map;
    private static unrollAndSort<T>(mapPromise, comparer?);
    private static generate<T>(mapFunc, comparer?);
    constructor(map: () => Promise<RecOrdMap<T>>, comparer?: IComparer<number | string>);
    getMap(): Promise<RecOrdMap<T>>;
    thenBy(keySelector: (x: T) => string | number): IOrderedParallelEnumerable<T>;
    thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<T>;
    thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<string | number>): IOrderedParallelEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedParallelEnumerable<T>;
    thenByAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedParallelEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string | number): IOrderedParallelEnumerable<T>;
    thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<string | number>): IOrderedParallelEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedParallelEnumerable<T>;
    thenByDescendingAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedParallelEnumerable<T>;
}
