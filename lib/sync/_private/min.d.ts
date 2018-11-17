/**
 * @throws {InvalidOperationException} No Elements
 */
export declare function min(source: Iterable<number>): number;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function min<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
