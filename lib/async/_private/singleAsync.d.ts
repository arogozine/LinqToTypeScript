/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
export declare function singleAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
