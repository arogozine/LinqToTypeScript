import { IParallelEnumerable } from "../../types";
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector An async transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking
 * the transform function on each element of source.
 */
export declare function selectAsync<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource, index: number) => Promise<OUT>): IParallelEnumerable<OUT>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param key A key of the elements in the sequence
 * @returns An IParallelEnumerable<T> whoe elements are the result of getting the value for key
 * on each element of source.
 */
export declare function selectAsync<TSource extends {
    [key: string]: Promise<TResult>;
}, TKey extends keyof TSource, TResult>(source: IParallelEnumerable<TResult>, selector: TKey): IParallelEnumerable<TResult>;
