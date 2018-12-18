export declare const asAsyncKeyMap: <TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<TKey>) => Promise<Map<TKey, TSource[]>>;
