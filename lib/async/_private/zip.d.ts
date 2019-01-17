import { IAsyncEnumerable } from "../../types";
/**
 * Creates tuples from th corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zip<T, Y>(first: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<[T, Y]>;
/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector A function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zip<TFirst, TSecond, TResult>(first: AsyncIterable<TFirst>, second: AsyncIterable<TSecond>, resultSelector: (x: TFirst, y: TSecond) => TResult): IAsyncEnumerable<TResult>;
