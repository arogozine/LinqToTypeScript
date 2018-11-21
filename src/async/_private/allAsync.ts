export async function allAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for await (const item of source) {
        if (await predicate(item) === false) {
            return false
        }
    }

    return true
}
