/**
 * Computes the sum of the sequence of numeric values.
 * @param source A sequence of numeric values to calculate the sum of.
 */
export declare function sum(source: Iterable<number>): number;
/**
 * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function
 * on each element of the input sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 */
export declare function sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
