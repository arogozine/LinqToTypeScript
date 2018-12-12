import { IEnumerable } from "../../types";
/**
 * Flattens an Iterable to one level
 * @param source Iterable to flatten
 */
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>): IEnumerable<TSource>;
/**
 * Flattens an iterable
 * @param source Iterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>;
/**
 * Flattens an iterable
 * @param source Iterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>;
