/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function minAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
