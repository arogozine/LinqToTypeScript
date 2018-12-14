/**
 * Returns the first element of a sequence.
 * If predicate is specified, returns the first element in a sequence that satisfies a specified condition.
 * @param source The AsyncIterable<T> to return the first element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The first element in the specified sequence.
 * If predicate is specified,
 * the first element in the sequence that passes the test in the specified predicate function.
 */
export declare function first<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
