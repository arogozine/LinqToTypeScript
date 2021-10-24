import { IParallelEnumerable, TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"
import { nextIterationWithIndexAsync } from "./_nextIterationWithIndexAsync"

type SelectAsyncFunc = {
    /**
     * Projects each element of a sequence into a new form.
     * @param source A sequence of values to invoke a transform function on.
     * @param selector An async transform function to apply to each element.
     * @returns An IParallelEnumerable<T> whose elements are the result of invoking
     * the transform function on each element of source.
     */
    <TSource, OUT>(
        source: IParallelEnumerable<TSource>,
        selector: (x: TSource, index: number) => Promise<OUT>): IParallelEnumerable<OUT>
    /**
     * Projects each element of a sequence into a new form.
     * @param source A sequence of values to invoke a transform function on.
     * @param key A key of the elements in the sequence
     * @returns An IParallelEnumerable<T> whoe elements are the result of getting the value for key
     * on each element of source.
     */
    <TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
        source: IParallelEnumerable<TResult>,
        selector: TKey): IParallelEnumerable<TResult>
}

export const selectAsync: SelectAsyncFunc = <TSource extends { [key: string]: Promise<TResult> }, TResult>(
    source: IParallelEnumerable<TSource>,
    keyOrSelector: string | ((x: TSource, index: number) => Promise<TResult>)): IParallelEnumerable<TResult> => {
    let generator: TypedData<TResult>
    if (typeof keyOrSelector === "function") {
        if (keyOrSelector.length === 1) {
            generator = nextIterationAsync(source, keyOrSelector as (x: TSource) => Promise<TResult>)
        } else {
            generator = nextIterationWithIndexAsync(source, keyOrSelector)
        }
    } else {
        generator = nextIterationAsync(source, (x: TSource) => (x[keyOrSelector]))
    }

    return new BasicParallelEnumerable(generator)
}
