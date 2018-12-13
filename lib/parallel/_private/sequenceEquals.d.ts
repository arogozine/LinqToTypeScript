import { IAsyncParallel, IEqualityComparer } from "../../types";
/**
 * Compares two parallel sequences to see if they are equal using a comparer function.
 * @param first First Sequence
 * @param second Second Sequence
 * @param comparer Comparer
 * @returns Whether or not the two iterations are equal
 */
export declare function sequenceEquals<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
