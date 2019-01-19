import { IParallelEnumerable } from "../../types/IParallelEnumerable";
/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export declare function minAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
