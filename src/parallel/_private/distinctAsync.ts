import { IAsyncEqualityComparer, IAsyncParallel, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const distinctAsync = <TSource>(
    source: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const distinctElements: TSource[] = []
        for (const item of await source.toArray()) {
            let found = false
            for (const distinctElement of distinctElements) {
                if (await comparer(distinctElement, item)) {
                    found = true
                    break
                }
            }

            if (!found) {
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
