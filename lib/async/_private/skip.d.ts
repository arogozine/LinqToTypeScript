import { IAsyncEnumerable } from "../../types";
/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An AsyncIterable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IAsyncEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
export declare function skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource>;
