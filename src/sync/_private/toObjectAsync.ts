export const toObjectAsync = async <TSource, TKey extends keyof any>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<TKey>): Promise<Record<TKey, TSource>> => {

    const map: Partial<Record<TKey, TSource>> = {}

    for (const value of source) {
        map[await selector(value)] = value
    }

    return map as Record<TKey, TSource>
}
