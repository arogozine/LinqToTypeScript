export declare function anyAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
