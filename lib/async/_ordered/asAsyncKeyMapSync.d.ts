export declare const asAsyncKeyMapSync: <TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey>) => Promise<Map<TKey, TSource[]>>;
