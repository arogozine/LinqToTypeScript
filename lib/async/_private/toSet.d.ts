/**
 * Converts the Async Itertion to a Set
 * @param source Iteration
 * @returns Set containing the iteration values
 */
export declare function toSet<TSource>(source: AsyncIterable<TSource>): Promise<Set<TSource>>;
