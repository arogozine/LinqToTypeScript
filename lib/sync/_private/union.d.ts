import { IEnumerable, IEqualityComparer } from "../../types";
/**
 * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
 * @param first An IEnumerable<T> whose distinct elements form the first set for the union.
 * @param second An IEnumerable<T> whose distinct elements form the second set for the union.
 * @param comparer The IEqualityComparer<T> to compare values. Optional.
 * @returns An IEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export declare function union<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
