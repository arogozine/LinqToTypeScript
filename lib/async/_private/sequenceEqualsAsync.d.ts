import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer";
/**
 * Compares two async iterables to see if they are equal using a async comparer function.
 * @param first First Sequence
 * @param second Second Sequence
 * @param comparer Async Comparer
 * @returns Whether or not the two iterations are equal
 */
export declare function sequenceEqualsAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
