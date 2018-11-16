/**
 * @throws {InvalidOperationException} No Matching Elements in Iteration
 * @param source Source Iteration
 * @param predicate Predicate to Select First Element
 */
export declare function firstAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T>;
