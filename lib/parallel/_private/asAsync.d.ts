import { IAsyncEnumerable, IParallelEnumerable } from "../../types";
/**
 * Converts a IEnumerable enumerable to an async one.
 * @param source A parallel IEnumerable
 */
export declare function asAsync<TSource>(source: IParallelEnumerable<TSource>): IAsyncEnumerable<TSource>;
