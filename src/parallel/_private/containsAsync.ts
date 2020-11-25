import { IAsyncEqualityComparer, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

/**
 * Determines whether a sequence contains a specified element by using the specified or default IEqualityComparer<T>.
 * @param source A sequence in which to locate a value.
 * @param value The value to locate in the sequence.
 * @param comparer An equality comparer to compare values. Optional.
 * @returns Whether or not the specified parallel sequence contains a value
 */
export async function containsAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
    const values = nextIterationAsync(source, (x) => comparer(value, x))

    switch (values.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const data = await values.generator()
            return data.some((x) => x)
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const data = await Promise.all(values.generator())
            return data.some((x) => x)
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const data = await Promise.all(await values.generator())
            return data.some((x) => x)
        }
    }
}
