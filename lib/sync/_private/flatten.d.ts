import { IEnumerable, IFlatten } from "../../types";
/**
 * Flattens an iterable
 * @param source Iterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: IFlatten<TSource>, shallow?: false): IEnumerable<TSource>;
/**
 * Flattens an iterable
 * @param source Iterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>;
