export declare function toMapAsync<K, V>(source: AsyncIterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>>;
