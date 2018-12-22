import { IEnumerable } from "../../types";
/**
 * Creates an IEnumerable<T> from an array
 * @param source Array of Elements
 * @returns IEnumerable<T>
 */
export declare function from<TSource>(source: TSource[]): IEnumerable<TSource>;
/**
 * Creates an IEnumerable<T> from an IterableIterator<T> of elements
 * @param source Iteration of Elements
 * @returns IEnumerable<T>
 */
export declare function from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>;
