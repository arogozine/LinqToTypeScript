import { fromParallel } from "../../parallel/ParallelEnumerable"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Converts an iterable to @see {IParallelEnumerable}
 * @param source Sequence to convert
 * @returns An IParallelEnumerable<T>
 */
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
