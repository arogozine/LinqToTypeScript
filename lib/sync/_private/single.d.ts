/**
 * Returns the only element of a sequence that satisfies a specified condition (if specified),
 * and throws an exception if more than one such element exists.
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains more than one element
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export declare function single<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource;
