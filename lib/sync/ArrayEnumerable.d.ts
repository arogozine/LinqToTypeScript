import { IEnumerable } from "../types";
/**
 * Array backed Enumerable
 */
export declare class ArrayEnumerable<TSource> extends Array<TSource> {
}
export interface ArrayEnumerable<TSource> extends IEnumerable<TSource> {
    reverse(): ArrayEnumerable<TSource>;
    concat(items: IEnumerable<TSource>): IEnumerable<TSource>;
    concat(...items: Array<ReadonlyArray<TSource>>): ArrayEnumerable<TSource>;
    concat(...items: Array<TSource | ReadonlyArray<TSource>>): ArrayEnumerable<TSource>;
}
