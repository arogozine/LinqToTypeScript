/**
 * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function
 * on each element of the input sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 */
export declare function sumAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
