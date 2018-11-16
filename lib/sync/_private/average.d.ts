/**
 * @throws {InvalidOperationException}
 * @param source Iteration of Numbers
 */
export declare function average(source: Iterable<number>): number;
/**
 * @throws {InvalidOperationException}
 */
export declare function average<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
