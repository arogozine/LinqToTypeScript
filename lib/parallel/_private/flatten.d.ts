import { IAsyncParallel, IParallelEnumerable, IParallelFlatten } from "../../types";
/**
 * Flattens a parallel iterable
 * @param source IAsyncParallel to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: IParallelFlatten<TSource>, shallow?: false): IParallelEnumerable<TSource>;
/**
 * Flattens a parallel iterable
 * @param source IAsyncParallel to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: IAsyncParallel<TSource | IAsyncParallel<TSource>>, shallow: true): IParallelEnumerable<TSource | AsyncIterable<TSource>>;
