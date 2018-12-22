import { IEnumerable } from "../../types";
/**
 * Inverts the order of the elements in a sequence.
 * @param source A sequence of values to reverse.
 * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
 */
export declare function reverse<TSource>(source: Iterable<TSource>): IEnumerable<TSource>;
