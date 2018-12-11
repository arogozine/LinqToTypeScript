import { IParallelEnumerable } from "../../types";
/**
 * Returns the only element of a sequence that satisfies a specified condition (if specified),
 * and throws an exception if more than one such element exists.
 * @param source An IParallelEnumerable<T> to return a single element from.
 * @param predicate A function to test an element for a condition. (Optional)
 * @throws {InvalidOperationException} No element satisfies the condition in predicate. OR
 * More than one element satisfies the condition in predicate. OR
 * The source sequence is empty.
 * @returns The single element of the input sequence that satisfies a condition.
 */
export declare function single<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
