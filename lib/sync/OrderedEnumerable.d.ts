import { IComparer, RecOrdMap } from "../shared/shared";
import { BasicEnumerable } from "./BasicEnumerable";
import { IOrderedEnumerable } from "./IOrderedEnumerable";
export declare class OrderedEnumerable<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {
    private readonly map;
    private static unrollAndSort<T>(map, comparer?);
    private static generate<T>(mapFunc, comparer?);
    constructor(map: () => RecOrdMap<T>, comparer?: IComparer<number | string>);
    getMap(): RecOrdMap<T>;
    thenBy(keySelector: (x: T) => string | number): IOrderedEnumerable<T>;
    thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>;
    thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string | number): IOrderedEnumerable<T>;
    thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>;
    thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>;
}
