/**
 * Determines whether all elements of a sequence satisfy a condition.
 * @param source An IEnumerable<T> that contains the elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
export declare function all<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean;
