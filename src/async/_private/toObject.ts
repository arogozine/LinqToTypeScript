export const toObject = async <TSource, TKey extends keyof any>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => TKey): Promise<Record<TKey, TSource>> => {

    const map: Partial<Record<TKey, TSource>> = {}

    for await (const value of source) {
        map[selector(value)] = value
    }

    return map as Record<TKey, TSource>
}
