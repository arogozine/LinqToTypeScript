import { IAsyncParallel } from "../../types";
/**
 * Computes the sum of a sequence of values.
 * @param source A sequence of values to calculate the sum of.
 * @returns The sum of the values in the sequence.
 */
export declare function sum(source: IAsyncParallel<number>): Promise<number>;
/**
 * Computes the sum of the sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 * @returns The sum of the projected values.
 */
export declare function sum<TSource>(source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>;
