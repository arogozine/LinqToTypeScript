import { IAsyncEqualityComparer, IAsyncParallel, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Produces the set difference of two sequences by using the comparer provided to compare values.
 * @param first An IAsyncParallel<T> whose elements that are not also in second will be returned.
 * @param second An IAsyncParallel<T> whose elements that also occur in the first sequence
 * will cause those elements to be removed from the returned sequence.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the set difference of the elements of two sequences.
 */
export const exceptAsync = <TSource>(
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> => {

    const generator = async () => {
        const [firstValues, secondValues] = await Promise.all([ first.toArray(), second.toArray() ])
        const resultValues = []

        for (const firstItem of firstValues) {

            let exists = false
            for (let j = 0; j < secondValues.length; j++) {
                const secondItem = secondValues[j]

                if (await comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                resultValues.push(firstItem)
            }
        }

        return resultValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
