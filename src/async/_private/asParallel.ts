import { fromParallel } from "../../parallel/static/fromParallel"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Converts an async iterable to a Parallel Enumerable.
 * @param source AsyncIterable<T> to convert to IParallelEnumerable<T>
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

    return fromParallel(ParallelGeneratorType.PromiseToArray, generator)
}
