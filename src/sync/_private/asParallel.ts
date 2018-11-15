import { IParallelEnumerable } from "../../parallel/IParallelEnumerable"
import { from } from "../../parallel/ParallelEnumerable"
import { ParallelGeneratorType } from "../../parallel/ParallelGeneratorType"

/**
 * Converts an iterable to @see {IAsyncParallel}
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
