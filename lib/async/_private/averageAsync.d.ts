export declare function averageAsync<TSource>(source: AsyncIterable<TSource>, func: (x: TSource) => Promise<number>): Promise<number>;
