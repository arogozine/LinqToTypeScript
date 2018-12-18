export declare const asKeyMap: <TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey) => Promise<Map<TKey, TSource[]>>;
