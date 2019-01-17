import { IAsyncEnumerable } from "../../types";
/**
 * Projects each element of a sequence to an IAsyncEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export declare function selectMany<TSource, Y>(source: AsyncIterable<TSource>, selector: (x: TSource, index: number) => Iterable<Y>): IAsyncEnumerable<Y>;
/**
 * Projects each element of a sequence to an AsyncIterable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An AsyncIterable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export declare function selectMany<TSource extends {
    [key: string]: Iterable<Y>;
}, Y>(source: AsyncIterable<TSource>, selector: keyof TSource): IAsyncEnumerable<Y>;
