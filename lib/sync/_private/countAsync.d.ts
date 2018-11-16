export declare function countAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number>;
