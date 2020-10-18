import { StrictEqualityComparer } from "../../shared/StrictEqualityComparer"
import { IAsyncParallel, IEqualityComparer, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If not comparer is specified, uses the @see {StrictEqualityComparer}
 * @param first An IParallelEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncParallel<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export function intersect<TSource>(
    // eslint-disable-next-line no-shadow
    first: IParallelEnumerable<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {

    const generator = async () => {

        const firstResults = await first.distinct(comparer).toArray()

        if (firstResults.length === 0) {
            return []
        }

        const secondResults = await second.toArray()

        const results = new Array<TSource>()
        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (comparer(firstValue, secondValue) === true) {
                    results.push(firstValue)
                    break
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
