import { IParallelEnumerable } from "../../types";
/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export declare function selectManyAsync<TSource, TResult>(source: IParallelEnumerable<TSource>, selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IParallelEnumerable<TResult>;
