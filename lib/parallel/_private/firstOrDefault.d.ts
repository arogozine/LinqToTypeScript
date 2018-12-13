import { IParallelEnumerable } from "../../types";
/**
 * Returns first element in sequence that satisfies predicate otherwise
 * returns the first element in the sequence. Returns null if no value found.
 * @param source An IParallelEnumerable<T> to return an element from.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The first element in the sequence
 * or the first element that passes the test in the specified predicate function.
 * Returns null if no value found.
 */
export declare function firstOrDefault<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
