export const firstOrDefaultAsync = async <TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> => {
    for (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}
