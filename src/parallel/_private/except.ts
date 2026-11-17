import { StrictEqualityComparer } from "../../shared"
import { type IAsyncParallel, type IEqualityComparer, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const except = <TSource>(
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> => {

    const generator = async () => {
        const [firstValues, secondValuesSource] = await Promise.all([ first.toArray(), second.toArray() ])

        if (comparer === StrictEqualityComparer) {
            // Hash fast path: O(n + m)
            const seen = new Set<TSource>(secondValuesSource)
            const result: TSource[] = []
            for (const firstItem of firstValues) {
                if (!seen.has(firstItem)) {
                    seen.add(firstItem)
                    result.push(firstItem)
                }
            }
            return result
        }

        // Copy so we can append already-emitted items (set semantics) without mutating the source
        const secondValues = [...secondValuesSource]
        const resultValues = []

        for (const firstItem of firstValues) {

            let exists = false
            for (let j = 0; j < secondValues.length; j++) {
                const secondItem = secondValues[j]

                if (comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                secondValues.push(firstItem)
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
