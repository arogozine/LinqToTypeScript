export declare function aggregate<TSource>(source: AsyncIterable<TSource>, func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
export declare function aggregate<TSource, TAccumulate>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
export declare function aggregate<TSource, TAccumulate, TResult>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
