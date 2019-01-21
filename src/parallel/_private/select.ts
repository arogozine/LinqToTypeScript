import { IParallelEnumerable } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIteration } from "./_nextIteration"
import { nextIterationWithIndex } from "./_nextIterationWithIndex"

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A transform function to apply to each element.
 * @returns
 * An IParallelEnumerable<T> whose elements are the result of invoking the transform function on each element of source.
 */
export function select<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => OUT): IParallelEnumerable<OUT>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IParallelEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export function select<TSource, TKey extends keyof TSource>(
    source: IParallelEnumerable<TSource>,
    key: TKey): IParallelEnumerable<TSource[TKey]>
export function select<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    key: string | ((x: TSource, index: number) => OUT)): IParallelEnumerable<any> {
    if (typeof key === "function") {
        if (key.length === 1) {
            return new BasicParallelEnumerable(nextIteration(source, key as (x: TSource) => OUT))
        } else {
            return new BasicParallelEnumerable(nextIterationWithIndex(source, key))
        }
    } else {
        return new BasicParallelEnumerable(nextIteration(source, (x: any) => x[key] as OUT))
    }
}
