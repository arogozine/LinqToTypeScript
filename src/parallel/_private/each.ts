import { IParallelEnumerable } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIteration } from "./_nextIteration"

/**
 * Performs a specified action on each element of the IParallelEnumerable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IParallelEnumerable<T> that executes the action lazily as you iterate.
 */
export function each<TSource>(
    source: IParallelEnumerable<TSource>,
    action: (x: TSource) => void): IParallelEnumerable<TSource> {
    return new BasicParallelEnumerable(nextIteration(source, (x) => {
            action(x)
            return x
        }))
}
