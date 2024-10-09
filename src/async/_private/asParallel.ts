import { fromParallel } from "../../parallel/static/fromParallel"
import { type IParallelEnumerable, ParallelGeneratorType } from "../../types"

export const asParallel = <TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const data = []
        for await(const value of source) {
            data.push(value)
        }
        return data
    }

    return fromParallel(ParallelGeneratorType.PromiseToArray, generator)
}
