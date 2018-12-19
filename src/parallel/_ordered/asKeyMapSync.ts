/**
 * Converts values to a key values map.
 * @param source Iterable
 * @param keySelector Key Selector for Map
 * @returns Map for Key to Values
 */
export const asKeyMapSync = <TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey) => {

    const map = new Map<TKey, TSource[]>()
    for (const item of source) {
        const key = keySelector(item)
        const currentMapping = map.get(key)

        if (currentMapping) {
            currentMapping.push(item)
        } else {
            map.set(key, [item])
        }
    }
    return map
}
