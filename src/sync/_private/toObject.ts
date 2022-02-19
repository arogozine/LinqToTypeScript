export const toObject = <TSource, TKey extends keyof any>(
    source: Iterable<TSource>,
    selector: (x: TSource) => TKey): Record<TKey, TSource> => {

    const map: Partial<Record<TKey, TSource>> = {}

    for (const value of source) {
        map[selector(value)] = value
    }

    return map as Record<TKey, TSource>
}
