import { IParallelEnumerable } from "../../types";
/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 * @returns An IParallelEnumerable<T> that contains the specified number of elements
 * from the start of the input sequence.
 */
export declare function take<TSource>(source: IParallelEnumerable<TSource>, amount: number): IParallelEnumerable<TSource>;
