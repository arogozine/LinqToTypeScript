/**
 * Returns the first element in a sequence that satisfies a specified condition.
 * @param source An Iterable<T> to return an element from.
 * @param predicate A function to test each element for a condition.
 * @returns The first element in the sequence that passes the test in the specified predicate function.
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
export declare function firstAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T>;
