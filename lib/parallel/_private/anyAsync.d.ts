import { IParallelEnumerable } from "../../types";
/**
 * Determines whether any element of a sequence satisfies a condition.
 * @param source An IEnumerable<T> whose elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
export declare function anyAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
