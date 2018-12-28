/**
 * Paritions the Iterable<T> into a tuple of failing and passing arrays
 * based on the predicate.
 * @param source Elements to Partition
 * @param predicate Pass / Fail async condition
 * @returns [pass, fail]
 */
export declare const partitionAsync: <TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>) => Promise<[TSource[], TSource[]]>;