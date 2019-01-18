import { IAsyncParallel, IParallelEnumerable } from "../../types";
/**
 * Creates tuples from th corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @returns An IParallelEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zip<TFirst, TSecond>(first: IAsyncParallel<TFirst>, second: IAsyncParallel<TSecond>): IParallelEnumerable<[TFirst, TSecond]>;
/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector A function that specifies how to merge the elements from the two sequences.
 * @returns An IParallelEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zip<TFirst, TSecond, TResult>(first: IAsyncParallel<TFirst>, second: IAsyncParallel<TSecond>, resultSelector: (x: TFirst, y: TSecond) => TResult): IParallelEnumerable<TResult>;
