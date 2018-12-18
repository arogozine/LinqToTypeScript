export const asAsyncKeyMapSync = async <TSource, TKey>(
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
