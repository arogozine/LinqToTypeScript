/**
 * Paritions the Iterable<T> into a tuple of failing and passing arrays
 * based on the predicate.
 * @param source Elements to Partition
 * @param predicate Async Pass / Fail condition
 * @returns Promise of [pass, fail]
 */
export declare function partitionAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource[][]>;
