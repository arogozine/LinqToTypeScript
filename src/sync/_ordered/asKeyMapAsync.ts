/**
 * Converts values to a key values map.
 * @param source Iterable
 * @param keySelector Async Key Selector for Map
 * @returns Map for Key to Values
 */
export const asKeyMapAsync = async <TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>) => {

    const map = new Map<TKey, TSource[]>()
    for (const item of source) {
        const key = await keySelector(item)
        const currentMapping = map.get(key)

        if (currentMapping) {
            currentMapping.push(item)
        } else {
            map.set(key, [item])
        }
    }
    return map
}
