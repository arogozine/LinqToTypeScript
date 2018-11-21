export async function elementAtOrDefault<TSource>(
    source: AsyncIterable<TSource>, index: number): Promise<TSource | null> {
    let i = 0
    for await (const item of source) {
        if (index === i++) {
            return item
        }
    }

    return null
}
