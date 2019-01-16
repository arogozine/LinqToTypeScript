import { IParallelEnumerable } from "../../types";
/**
 * Convers an async iterable to a Parallel Enumerable.
 * @param source AsyncIterable<T> to conver to IParallelEnumerable<T>
 * @returns Parallel Enumerable of source
 */
export declare function asParallel<TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource>;
