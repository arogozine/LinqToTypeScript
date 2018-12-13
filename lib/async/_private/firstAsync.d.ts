/**
 * Returns the first element in a sequence that satisfies a specified condition.
 * @param source An AsyncIterable<T> to return an element from.
 * @param predicate An async function to test each element for a condition.
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 * @returns The first element in the sequence that passes the test in the specified predicate function.
 */
export declare function firstAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T>;
