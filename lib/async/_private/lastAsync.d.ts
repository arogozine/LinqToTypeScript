/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export declare function lastAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
