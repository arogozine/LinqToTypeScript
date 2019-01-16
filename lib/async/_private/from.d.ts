import { IAsyncEnumerable } from "../../types";
/**
 * Converts the input array of promises to an async iterable
 * @param promises Array of Promises to Convert to an IAsyncEnumerable<T>
 * @throws {InvalidOperationException} No Elements in the Promises Array
 * @returns IAsyncEnumerable<T>
 */
export declare function from<TSource>(promises: Array<Promise<TSource>>): IAsyncEnumerable<TSource>;
/**
 * Converts the input method to an async iterable
 * @param asyncIterable Function which returns an AsyncIterableIterator<TSource>
 * @returns IAsyncEnumerable<T>
 */
export declare function from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>;
