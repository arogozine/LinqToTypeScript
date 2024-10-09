import type { IParallelEnumerable, TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"

export const eachAsync = <TSource>(
    source: IParallelEnumerable<TSource>,
    action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource> => {

    const dataFunc: TypedData<TSource> = nextIterationAsync(source, async (x) => {
            await action(x)
            return x
    })

    return new BasicParallelEnumerable(dataFunc)
}
