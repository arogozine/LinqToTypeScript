/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
export declare function single<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
