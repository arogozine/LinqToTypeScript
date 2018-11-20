export async function toObjectAsync<TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<string>): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for (const value of source) {
        map[await selector(value)] = value
    }

    return map
}
