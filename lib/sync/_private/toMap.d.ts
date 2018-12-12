/**
 * Converts an Iterable<V> to a Map<K, V[]>.
 * @param source An Iterable<V> to convert.
 * @param selector A function to serve as a key selector.
 * @return Map<K, V[]>
 */
export declare function toMap<K, V>(source: Iterable<V>, selector: (x: V) => K): Map<K, V[]>;
