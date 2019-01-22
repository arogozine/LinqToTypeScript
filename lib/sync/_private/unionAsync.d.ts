import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer";
/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An Iterable<T> whose distinct elements form the first set for the union.
 * @param second An Iterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export declare function unionAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): import("..").IAsyncEnumerable<TSource>;
