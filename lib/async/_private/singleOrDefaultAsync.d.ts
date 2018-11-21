export declare function singleOrDefaultAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
