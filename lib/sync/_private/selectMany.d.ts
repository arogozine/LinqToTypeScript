import { IEnumerable } from "../../types";
/**
 * Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export declare function selectMany<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult>;
/**
 * Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An IEnumerable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export declare function selectMany<TSource extends {
    [key: string]: Iterable<TResult>;
}, TResult>(source: Iterable<TSource>, selector: keyof TSource): IEnumerable<TResult>;
