import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer";
/**
 * Compares two sequences to see if they are equal using a async comparer function.
 * @param first First Sequence
 * @param second Second Sequence
 * @param comparer Async Comparer
 * @returns Whether or not the two iterations are equal
 */
export declare function sequenceEqualsAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
