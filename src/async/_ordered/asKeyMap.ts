/**
 * Converts values to a key values map.
 * @param source Async Iterable
 * @param keySelector Key Selector for Map
 * @returns Promise for a Map for Key to Values
 */
export const asKeyMap = async <TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey) => {

    const map = new Map<TKey, TSource[]>()
    for await (const item of source) {
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
