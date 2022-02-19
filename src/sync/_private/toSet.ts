export const toSet = <TSource>(source: Iterable<TSource>): Set<TSource> => {
    return new Set<TSource>(source)
}
