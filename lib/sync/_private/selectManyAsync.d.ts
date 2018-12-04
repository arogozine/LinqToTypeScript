import { IAsyncEnumerable } from "../../types";
/**
 * Projects each element of a sequence to an IAsyncEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export declare function selectManyAsync<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult>;
