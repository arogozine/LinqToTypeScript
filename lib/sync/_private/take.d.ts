import { IEnumerable } from "../../types";
/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 */
export declare function take<T>(source: Iterable<T>, amount: number): IEnumerable<T>;
