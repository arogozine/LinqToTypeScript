export declare function lastOrDefault<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
