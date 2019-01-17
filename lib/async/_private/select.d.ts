import { IAsyncEnumerable } from "../../types";
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A transform function to apply to each element.
 * @returns
 * An IAsyncEnumerable<T> whose elements are the result of invoking the transform function on each element of source.
 */
export declare function select<TSource, TResult>(source: AsyncIterable<TSource>, selector: (x: TSource, index: number) => TResult): IAsyncEnumerable<TResult>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IAsyncEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export declare function select<TSource, TKey extends keyof TSource>(source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
