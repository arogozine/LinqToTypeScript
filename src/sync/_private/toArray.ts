/**
 * Creates an array from a Iterable<T>.
 * @param source An Iterable<T> to create an array from.
 */
export function toArray<TSource>(source: Iterable<TSource>): TSource[] {
    return [...source]
}
