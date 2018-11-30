import { IAsyncParallel } from "../../types";
/**
 * Computes the average of a sequence of number values.
 * @param source A sequence of values to calculate the average of.
 * @throws {InvalidOperationException} source contains no elements.
 */
export declare function average(source: IAsyncParallel<number>): Promise<number>;
/**
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 */
export declare function average<TSource>(source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>;
