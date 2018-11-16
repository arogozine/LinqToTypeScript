/**
 * @throws {InvalidOperationException} No Elements in Iteration
 */
export declare function first<TSource>(source: Iterable<TSource>): TSource;
/**
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
export declare function first<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource;
