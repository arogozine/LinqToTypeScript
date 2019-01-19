import { IParallelEnumerable } from "../../types";
/**
 * Returns the minimum value in a sequence of values.
 * @param source A sequence of values to determine the minimum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export declare function min(source: IParallelEnumerable<number>): Promise<number>;
/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export declare function min<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
