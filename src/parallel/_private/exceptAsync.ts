import { type IAsyncEqualityComparer, type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

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
