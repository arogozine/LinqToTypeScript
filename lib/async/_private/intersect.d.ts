import { IAsyncEnumerable, IEqualityComparer } from "../../types";
/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If not comparer is specified, uses the @see {StrictEqualityComparer}
 * @param first An IAsyncEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncEnumerable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export declare function intersect<TSource>(first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
