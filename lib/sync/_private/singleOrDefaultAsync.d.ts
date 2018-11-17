/**
 * @throws {InvalidOperationException} More than one element matchines predicate
 */
export declare function singleOrDefaultAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
