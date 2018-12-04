/**
 * Returns first element in sequence that satisfies predicate otherwise
 * returns the first element in the sequence.
 * @param source An Iterable<T> to return an element from.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The first element in the sequence
 * or the first element that passes the test in the specified predicate function.
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
export declare function first<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource;
