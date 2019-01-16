import { IAsyncEnumerable } from "../../types";
/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IAsyncEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
export declare function concat<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>): IAsyncEnumerable<TSource>;
