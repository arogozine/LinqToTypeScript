/**
 * @throws {InvalidOperationException} More than one element
 */
export declare function singleOrDefault<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource | null;
