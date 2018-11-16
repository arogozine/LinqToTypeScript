import { IEnumerable } from "../IEnumerable";
/**
 * Creates an IEnumerable from an array
 * @param source Array of Elements
 */
export declare function from<TSource>(source: TSource[]): IEnumerable<TSource>;
/**
 * Creates an IEnumerable from an iteration of elements
 * @param source Iteration of Elements
 */
export declare function from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>;
