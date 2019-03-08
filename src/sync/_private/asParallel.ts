import { from } from "../../parallel/ParallelEnumerable" // TODO
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Converts an iterable to @see {IParallelEnumerable}
 * @param source Sequence to convert
 * @returns An IParallelEnumerable<T>
 */
export function asParallel<TSource>(source: Iterable<TSource>): IParallelEnumerable<TSource> {
    async function generator() {
        const array = []
        for (const value of source) {
            array.push(value)
        }
        return array
    }

    return from(ParallelGeneratorType.PromiseToArray, generator)
}
