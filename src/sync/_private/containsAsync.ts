import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer"

/**
 * Determines whether a sequence contains a specified element by using the specified or default IEqualityComparer<T>.
 * @param source A sequence in which to locate a value.
 * @param value The value to locate in the sequence.
 * @param comparer An equality comparer to compare values. Optional.
 */
export async function containsAsync<TSource>(
    source: Iterable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
    for (const item of source) {
        if (await comparer(value, item)) {
            return true
        }
    }

    return false
}
