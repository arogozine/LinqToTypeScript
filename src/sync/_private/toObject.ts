/**
 * Converts the Iteration to an Object. Duplicate values will be overriden.
 * @param source An Iterable<T> to filter.
 * @param selector A function to determine the Key based on the value.
 */
export function toObject<TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => string): {[key: string]: TSource} {

    const map: {[key: string]: TSource} = {}

    for (const value of source) {
        map[selector(value)] = value
    }

    return map
}
