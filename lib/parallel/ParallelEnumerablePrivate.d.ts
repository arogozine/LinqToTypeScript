import { IAsyncParallel } from "../shared/shared";
export declare function aggregate_1<TSource>(source: AsyncIterable<TSource>, func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
export declare function aggregate_2<TSource, TAccumulate>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
export declare function aggregate_3<TSource, TAccumulate, TResult>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
export declare function average_1(source: IAsyncParallel<number>): Promise<number>;
export declare function average_2<TSource>(source: IAsyncParallel<TSource>, func: (x: TSource) => number): Promise<number>;
