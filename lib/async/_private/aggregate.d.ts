/**
 * Applies an accumulator function over a sequence.
 * @param source An IEnumerable<T> to aggregate over.
 * @param func An accumulator function to be invoked on each element.
 */
export declare function aggregate<TSource>(source: AsyncIterable<TSource>, func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
/**
 * Applies an accumulator function over a sequence.
 * The specified seed value is used as the initial accumulator value.
 * @param source An IEnumerable<T> to aggregate over.
 * @param seed The initial accumulator value.
 * @param func An accumulator function to be invoked on each element.
 */
export declare function aggregate<TSource, TAccumulate>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
/**
 * Applies an accumulator function over a sequence.
 * The specified seed value is used as the initial accumulator value,
 * and the specified function is used to select the result value.
 * @param source An IEnumerable<T> to aggregate over.
 * @param seed The initial accumulator value.
 * @param func An accumulator function to be invoked on each element.
 * @param resultSelector A function to transform the final accumulator value into the result value.
 */
export declare function aggregate<TSource, TAccumulate, TResult>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
