import { type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const skipWhile = <TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const values = await source.toArray()
        let i = 0
        for (; i < values.length; i++) {
            const value = values[i]
            if (predicate(value, i) === false) {
                break
            }
        }

        const returnedValues = []
        for (; i < values.length; i++) {
            returnedValues.push(values[i])
        }
        return returnedValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
