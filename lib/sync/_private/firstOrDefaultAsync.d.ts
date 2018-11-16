export declare function firstOrDefaultAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null>;
