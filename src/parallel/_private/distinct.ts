import { StrictEqualityComparer } from "../../shared"
import { type IAsyncParallel, type IEqualityComparer, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const distinct = <TSource>(
    source: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const distinctElements: TSource[] = []
        for (const item of await source.toArray()) {
            const foundItem = distinctElements.find((x) => comparer(x, item))
            if (!foundItem) {
                distinctElements.push(item)
            }
        }
        return distinctElements
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
