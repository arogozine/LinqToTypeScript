import { IEnumerable } from "../../types";
/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
export declare function concat<TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource>;
