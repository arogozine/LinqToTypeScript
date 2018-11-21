export async function toObjectAsync<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<string>): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for await (const value of source) {
        map[await selector(value)] = value
    }

    return map
}
