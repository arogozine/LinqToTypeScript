/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export declare function last<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
export declare function last_1<T>(source: AsyncIterable<T>): Promise<T>;
export declare function last_2<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource>;
