import { StrictEqualityComparer } from "../../shared"
import { IEqualityComparer, IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"
import { nextIteration } from "./_nextIteration"

export const contains = async <TSource>(
    source: IParallelEnumerable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> => {
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
