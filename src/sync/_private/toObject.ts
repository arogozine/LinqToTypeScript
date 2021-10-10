/**
 * Converts the Iteration to an Object. Duplicate values will be overriden.
 * @param source An Iterable<T> to filter.
 * @param selector A function to determine the Key based on the value.
 * @returns KVP Object
 */
export const toObject = <TSource, TKey extends keyof any>(
    source: Iterable<TSource>,
    selector: (x: TSource) => TKey): Record<TKey, TSource> => {

    const map: Partial<Record<TKey, TSource>> = {}

    for (const value of source) {
        map[selector(value)] = value
    }

    return map as Record<TKey, TSource>
}
