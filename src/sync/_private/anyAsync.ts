export async function anyAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for (const item of source) {
        if (await predicate(item) === true) {
            return true
        }
    }

    return false
}
