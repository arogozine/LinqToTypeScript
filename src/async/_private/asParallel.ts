import { from } from "../../parallel/parallel" // TODO
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Convers an async iterable to a Parallel Enumerable.
 * @param source AsyncIterable<T> to conver to IParallelEnumerable<T>
 * @returns Parallel Enumerable of source
 */
export function asParallel<TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource> {
    async function generator() {
        const data = []
        for await(const value of source) {
            data.push(value)
        }
        return data
    }

    return from(ParallelGeneratorType.PromiseToArray, generator)
}
