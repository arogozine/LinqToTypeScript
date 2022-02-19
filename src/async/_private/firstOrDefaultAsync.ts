export const firstOrDefaultAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> => {
    for await (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}
