export declare function allAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
