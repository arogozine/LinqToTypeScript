export async function toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]> {
    const array = []
    for await (const item of source) {
        array.push(item)
    }
    return array
}
