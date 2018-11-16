import { IParallelEnumerable } from "../../parallel/IParallelEnumerable";
/**
 * Converts an iterable to @see {IAsyncParallel}
 */
export declare function asParallel<TSource>(source: Iterable<TSource>): IParallelEnumerable<TSource>;
