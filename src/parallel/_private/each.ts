import type { IParallelEnumerable } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIteration } from "./_nextIteration"

export const each = <TSource>(
    source: IParallelEnumerable<TSource>,
    action: (x: TSource) => void): IParallelEnumerable<TSource> => {
    return new BasicParallelEnumerable(nextIteration(source, (x) => {
            action(x)
            return x
        }))
}
