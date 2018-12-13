import { IParallelEnumerable } from "../../types";
/**
 * Returns first element in sequence that satisfies. Returns null if no value found.
 * @param source An IParallelEnumerable<T> to return an element from.
 * @param predicate An async function to test each element for a condition.
 * @returns The first element that passes the test in the specified predicate function.
 * Returns null if no value found.
 */
export declare function firstOrDefaultAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
