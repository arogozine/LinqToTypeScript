import { IAsyncParallel } from "../../types";
import { BasicParallelEnumerable } from "../BasicParallelEnumerable";
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to filter.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export declare function whereAsync<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): BasicParallelEnumerable<TSource>;
