import { type IAsyncEqualityComparer, type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const distinctAsync = <TSource>(
    source: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const distinctElements: TSource[] = []
        outerLoop:
        for (const item of await source.toArray()) {
            for (const distinctElement of distinctElements) {
                const found = await comparer(distinctElement, item)
                if (found) {
                    continue outerLoop
                }
            }

            distinctElements.push(item)
        }

        return distinctElements
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
