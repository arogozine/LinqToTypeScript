import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types";
/**
 * Produces the set difference of two sequences by using the comparer provided to compare values.
 * @param first An IEnumerable<T> whose elements that are not also in second will be returned.
 * @param second An IEnumerable<T> whose elements that also occur in the first sequence
 * will cause those elements to be removed from the returned sequence.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the set difference of the elements of two sequences.
 */
export declare function exceptAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
