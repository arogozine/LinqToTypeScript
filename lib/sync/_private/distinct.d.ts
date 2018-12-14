import { IEnumerable, IEqualityComparer } from "../../types";
/**
 * Returns distinct elements from a sequence by using the default or specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IEqualityComparer<T> to compare values. Optional. Defaults to Strict Equality Comparison.
 * @returns An IEnumerable<T> that contains distinct elements from the source sequence.
 */
export declare function distinct<TSource>(source: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
