/**
 * Converts values to a key values map.
 * @param source Async Iterable
 * @param keySelector Key Selector for Map
 * @returns Promise for a Map for Key to Values
 */
export declare const asKeyMap: <TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey) => Promise<Map<TKey, TSource[]>>;
