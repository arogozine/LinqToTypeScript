import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer";
/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An IEnumerable<T> whose distinct elements form the first set for the union.
 * @param second An IEnumerable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 */
export declare function unionAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): import("../../types/IAsyncEnumerable").IAsyncEnumerable<TSource>;
