/**
 * Converts values to a key values map.
 * @param source Iterable
 * @param keySelector Async Key Selector for Map
 * @returns Map for Key to Values
 */
export declare const asKeyMapAsync: <TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey>) => Promise<Map<TKey, TSource[]>>;
