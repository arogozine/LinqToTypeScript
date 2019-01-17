import { IAsyncEnumerable, IEqualityComparer } from "../../types";
/**
 * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
 * @param first An AsyncIterable<T> whose distinct elements form the first set for the union.
 * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IEqualityComparer<T> to compare values. Optional.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export declare function union<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
