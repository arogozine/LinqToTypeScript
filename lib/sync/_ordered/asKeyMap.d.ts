/**
 * Converts values to a key values map.
 * @param source Iterable
 * @param keySelector Key Selector for Map
 * @returns Map for Key to Values
 */
export declare const asKeyMap: <TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey) => Map<TKey, TSource[]>;
