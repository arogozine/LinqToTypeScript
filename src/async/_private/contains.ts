import { StrictEqualityComparer } from "../../shared"
import { IEqualityComparer } from "../../types"

/**
 * Determines whether a sequence contains a specified element by using the specified or default IEqualityComparer<T>.
 * @param source A sequence in which to locate a value.
 * @param value The value to locate in the sequence.
 * @param comparer An equality comparer to compare values. Optional.
 * @returns Whether a sequence contains a specified element
 */
export async function contains<TSource>(
    source: AsyncIterable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {

    for await (const item of source) {
        if (comparer(value, item)) {
            return true
        }
    }

    return false
}
