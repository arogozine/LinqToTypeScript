/**
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An AsyncIterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
 */
export declare function last<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
