/**
 * @throws {InvalidOperationException} No Elements
 * @param source Async Iteration of Numbers
 */
export declare function max(source: AsyncIterable<number>): Promise<number>;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function max<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
