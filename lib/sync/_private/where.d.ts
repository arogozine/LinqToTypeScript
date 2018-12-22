import { IEnumerable } from "../../types";
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An Iterable<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export declare function where<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
