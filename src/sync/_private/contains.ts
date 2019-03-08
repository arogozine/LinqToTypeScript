import { StrictEqualityComparer } from "../../shared/StrictEqualityComparer"
import { IEqualityComparer } from "../../types/IEqualityComparer"

/**
 * Determines whether a sequence contains a specified element by using the specified or default IEqualityComparer<T>.
 * @param source A sequence in which to locate a value.
 * @param value The value to locate in the sequence.
 * @param comparer An equality comparer to compare values. Optional.
 * @returns true if the source sequence contains an element that has the specified value; otherwise, false.
 */
export function contains<TSource>(
    source: Iterable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

    for (const item of source) {
        if (comparer(value, item)) {
            return true
        }
    }

    return false
}
