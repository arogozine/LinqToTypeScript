import { IEnumerable, IEqualityComparer } from "../../types";
/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If no comparer is selected, uses the StrictEqualityComparer.
 * @param first An IEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An Iterable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export declare function intersect<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
