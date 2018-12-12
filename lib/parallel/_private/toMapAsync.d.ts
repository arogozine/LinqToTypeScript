/**
 * Converts an AsyncIterable<V> to a Map<K, V[]>.
 * @param source An Iterable<V> to convert.
 * @param selector An async function to serve as a key selector.
 * @returns A promise for Map<K, V[]>
 */
export declare function toMapAsync<K, V>(source: AsyncIterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>>;
