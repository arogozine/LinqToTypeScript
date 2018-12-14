import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types";
/**
 * Returns distinct elements from a sequence by using the specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains distinct elements from the source sequence.
 */
export declare function distinctAsync<TSource>(source: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
