export declare function toMap<K, V>(source: AsyncIterable<V>, selector: (x: V) => K): Promise<Map<K, V[]>>;
