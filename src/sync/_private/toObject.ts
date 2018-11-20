export function toObject<TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => string): {[key: string]: TSource} {

    const map: {[key: string]: TSource} = {}

    for (const value of source) {
        map[selector(value)] = value
    }

    return map
}
