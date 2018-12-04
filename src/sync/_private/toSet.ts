/**
 * Converts the iteration into a Set<TSource>
 * @param source Iteration
 */
export function toSet<TSource>(source: Iterable<TSource>): Set<TSource> {
    return new Set<TSource>(source)
}
