/**
 * @throws {InvalidOperationException} No Matching Element
 */
export declare function lastAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
