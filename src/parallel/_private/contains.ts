import { StrictEqualityComparer } from "../../shared/StrictEqualityComparer"
import { IEqualityComparer, IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"
import { nextIteration } from "./_nextIteration"

/**
 * Determines whether a sequence contains a specified element by using the specified or default IEqualityComparer<T>.
 * @param source A sequence in which to locate a value.
 * @param value The value to locate in the sequence.
 * @param comparer An equality comparer to compare values. Optional.
 */
export async function contains<TSource>(
    source: IParallelEnumerable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {
    let values: TypedData<boolean>
    if (comparer) {
        values = nextIteration(source, (x) => comparer(value, x))
    } else {
        values = nextIteration(source, (x) => x === value)
    }

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
