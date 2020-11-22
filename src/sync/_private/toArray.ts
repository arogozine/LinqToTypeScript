/**
 * Creates an array from a Iterable<T>.
 * @param source An Iterable<T> to create an array from.
 * @returns An array of elements
 */
export const toArray = <TSource>(source: Iterable<TSource>): TSource[] => {
    return [...source]
}
