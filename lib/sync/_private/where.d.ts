import { IEnumerable } from "../../types";
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IEnumerable<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 */
export declare function where<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
export declare function where_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T>;
export declare function where_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
