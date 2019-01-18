import { IParallelEnumerable } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"

/**
 * Performs a specified action on each element of the IParallelEnumerable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IParallelEnumerable<T> that executes the action lazily as you iterate.
 */
export function eachAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource> {
    return new BasicParallelEnumerable(nextIterationAsync(source, async (x) => {
            await action(x)
            return x
        }))
}
