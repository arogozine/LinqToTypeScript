/**
 * Converts an Iterable<V> to a Map<K, V[]>.
 * @param source An Iterable<V> to convert.
 * @param selector A function to serve as a key selector.
 */
export declare function toMapAsync<K, V>(source: Iterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>>;
