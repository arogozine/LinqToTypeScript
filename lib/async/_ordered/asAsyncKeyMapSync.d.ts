/**
 * Converts values to a key values map.
 * @param source Iterable
 * @param keySelector Async Key Selector for Map
 * @returns Promise for a Map for Key to Values
 */
export declare const asAsyncKeyMapSync: <TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey>) => Promise<Map<TKey, TSource[]>>;
