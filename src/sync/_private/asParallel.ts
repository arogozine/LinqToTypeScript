import { fromParallel } from "../../parallel/static/fromParallel"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

export const asParallel = <TSource>(source: Iterable<TSource>): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const array = []
        for (const value of source) {
            array.push(value)
        }
        return array
    }

    return fromParallel(ParallelGeneratorType.PromiseToArray, generator)
}
