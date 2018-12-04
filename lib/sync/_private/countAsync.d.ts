/**
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 */
export declare function countAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number>;
