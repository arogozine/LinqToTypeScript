/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains no matching element
 */
export declare function last<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource;
