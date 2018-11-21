export declare function countAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number>;
