export declare function aggregate<TSource>(source: Iterable<TSource>, func: (x: TSource, y: TSource) => TSource): TSource;
export declare function aggregate<TSource, TAccumulate>(source: Iterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate;
export declare function aggregate<TSource, TAccumulate, TResult>(source: Iterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): TResult;
