export async function toMapAsync<K, V>(source: Iterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>> {
    const map = new Map<K, V[]>()

    for (const value of source) {
        const key = await selector(value)
        const array = map.get(key)

        if (array === undefined) {
            map.set(key, [value])
        } else {
            array.push(value)
        }
    }

    return map
}
