import { IAsyncEqualityComparer, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

export async function containsAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
    const values = nextIterationAsync(source, (x) => comparer(value, x))

    switch (values.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const data = await values.generator()
            return data.some((x) => x)
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const data = await Promise.all(values.generator())
            return data.some((x) => x)
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const data = await Promise.all(await values.generator())
            return data.some((x) => x)
        }
    }
}
