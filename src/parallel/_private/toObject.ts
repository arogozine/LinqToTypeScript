export async function toObject<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => string): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for await (const value of source) {
        map[selector(value)] = value
    }

    return map
}
