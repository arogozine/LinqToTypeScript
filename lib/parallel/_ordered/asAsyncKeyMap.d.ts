/**
 * Converts values to a key values map.
 * @param source Async Iterable
 * @param keySelector Async Key Selector for Map
 * @returns Promise for a Map for Key to Values
 */
export declare const asAsyncKeyMap: <TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<TKey>) => Promise<Map<TKey, TSource[]>>;
