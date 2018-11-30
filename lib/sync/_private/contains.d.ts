import { IEqualityComparer } from "../../types/IEqualityComparer";
/**
 * Determines whether a sequence contains a specified element by using the specified or default IEqualityComparer<T>.
 * @param source A sequence in which to locate a value.
 * @param value The value to locate in the sequence.
 * @param comparer An equality comparer to compare values. Optional.
 */
export declare function contains<TSource>(source: Iterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): boolean;
