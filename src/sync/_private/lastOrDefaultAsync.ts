export async function lastOrDefaultAsync<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {

    let last: TSource | null = null

    for (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    return last
}
