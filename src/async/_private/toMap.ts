export async function toMap<K, V>(source: AsyncIterable<V>, selector: (x: V) => K): Promise<Map<K, V[]>> {
    const map = new Map<K, V[]>()

    for await (const value of source) {
        const key = selector(value)
        const array = map.get(key)

        if (array === undefined) {
            map.set(key, [value])
        } else {
            array.push(value)
        }
    }

    return map
}
