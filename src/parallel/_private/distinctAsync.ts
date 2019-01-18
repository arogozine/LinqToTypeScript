import { ParallelGeneratorType, IAsyncParallel, IAsyncEqualityComparer, IParallelEnumerable } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Returns distinct elements from a sequence by using the specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns An IParallelEnumerable<T> that contains distinct elements from the source sequence.
 */
export function distinctAsync<TSource>(
    source: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {
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
