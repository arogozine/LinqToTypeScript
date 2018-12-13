import { IAsyncEqualityComparer, IAsyncParallel } from "../../types";
/**
 * Compares two parallel iterables to see if they are equal using a async comparer function.
 * @param first First Sequence
 * @param second Second Sequence
 * @param comparer Async Comparer
 * @returns Whether or not the two iterations are equal
 */
export declare function sequenceEqualsAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
