/**
 * @throws {InvalidOperationException} No Elements
 */
export declare function max(source: Iterable<number>): number;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function max<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
