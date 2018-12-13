/**
 * Converts the Async Itertion to a Set
 * @param source Iteration
 * @returns Set containing the iteration values
 */
export function toSet<TSource>(source: Iterable<TSource>): Set<TSource> {
    return new Set<TSource>(source)
}
