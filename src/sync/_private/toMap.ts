/**
 * Converts an Iterable<V> to a Map<K, V[]>.
 * @param source An Iterable<V> to convert.
 * @param selector A function to serve as a key selector.
 */
export function toMap<K, V>(source: Iterable<V>, selector: (x: V) => K): Map<K, V[]> {
    const map = new Map<K, V[]>()

    for (const value of source) {
        const key = selector(value)
        const array = map.get(key)

        if (array === undefined) {
            map.set(key, [value])
        } else {
            array.push(value)
        }
    }

    return map
}
