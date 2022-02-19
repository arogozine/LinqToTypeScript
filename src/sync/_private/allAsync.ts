export const allAsync = async <TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>) => {
    for (const item of source) {
        if (await predicate(item) === false) {
            return false
        }
    }

    return true
}
