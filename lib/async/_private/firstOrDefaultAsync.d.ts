export declare function firstOrDefaultAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null>;
