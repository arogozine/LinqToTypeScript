/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function maxAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
