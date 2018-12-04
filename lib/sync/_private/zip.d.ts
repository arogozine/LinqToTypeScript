import { IEnumerable } from "../../types";
/**
 * Creates a tuple of corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 */
export declare function zip<T, Y>(first: Iterable<T>, second: Iterable<Y>): IEnumerable<[T, Y]>;
/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector A function that specifies how to merge the elements from the two sequences.
 */
export declare function zip<TFirst, TSecond, TResult>(first: Iterable<TFirst>, second: Iterable<TSecond>, resultSelector: (x: TFirst, y: TSecond) => TResult): IEnumerable<TResult>;
