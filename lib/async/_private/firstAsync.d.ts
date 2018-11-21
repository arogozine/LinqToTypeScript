/**
 * @throws {InvalidOperationException} There are no elements matching predicate
 */
export declare function firstAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T>;
