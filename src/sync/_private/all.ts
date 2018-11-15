export function all<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean {
    for (const item of source) {
        if (predicate(item) === false) {
            return false
        }
    }

    return true
}
