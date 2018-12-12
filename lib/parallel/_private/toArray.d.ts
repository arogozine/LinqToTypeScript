import { IParallelEnumerable } from "../../types";
/**
 * Creates an array from a IParallelEnumerable<T>.
 * @param source An IParallelEnumerable<T> to create an array from.
 * @returns An array of elements
 */
export declare function toArray<TSource>(source: IParallelEnumerable<TSource>): Promise<TSource[]>;
