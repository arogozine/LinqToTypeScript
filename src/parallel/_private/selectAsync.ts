import type { IParallelEnumerable, TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"
import { nextIterationWithIndexAsync } from "./_nextIterationWithIndexAsync"

type SelectAsyncFunc = {
    <TSource, OUT>(
        source: IParallelEnumerable<TSource>,
        selector: (x: TSource, index: number) => Promise<OUT>): IParallelEnumerable<OUT>
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
