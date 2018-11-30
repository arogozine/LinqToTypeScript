import { IParallelEnumerable } from "../../types";
/**
 * Determines whether a sequence contains any elements.
 * If predicate is specified, determines whether any element of a sequence satisfies a condition.
 * @param source The IEnumerable<T> to check for emptiness or apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
export declare function any<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<boolean>;
