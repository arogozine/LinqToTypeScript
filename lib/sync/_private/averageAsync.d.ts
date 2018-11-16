/**
 * @throws {InvalidOperationException} No Elements
 */
export declare function averageAsync<TSource>(source: Iterable<TSource>, func: (x: TSource) => Promise<number>): Promise<number>;
