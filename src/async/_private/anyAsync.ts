export async function anyAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for await (const item of source) {
        if (await predicate(item) === true) {
            return true
        }
    }

    return false
}
