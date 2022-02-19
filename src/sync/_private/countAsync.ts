export const countAsync = async <TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<number> => {
    let count = 0
    for (const value of source) {
        if (await predicate(value) === true) {
            count++
        }
    }
    return count
}
