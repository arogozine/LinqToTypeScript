export declare function lastOrDefaultAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null>;
