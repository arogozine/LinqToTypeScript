import { IAsyncEnumerable, IAsyncFlatten } from "../../types";
/**
 * Flattens an async iterable
 * @param source AsyncIterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: IAsyncFlatten<TSource>, shallow?: false): IAsyncEnumerable<TSource>;
/**
 * Flattens an async iterable
 * @param source AsyncIterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>, shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>;
