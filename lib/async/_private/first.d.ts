/**
 * @throws {InvalidOperationException} There are no elements
 */
export declare function first<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
export declare function first_1<T>(source: AsyncIterable<T>): Promise<T>;
export declare function first_2<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T>;
