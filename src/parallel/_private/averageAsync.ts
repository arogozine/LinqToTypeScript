import { ErrorString, InvalidOperationException } from "../../shared/TypesAndHelpers"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

export async function averageAsync<TSource>(
    source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    const nextIter = nextIterationAsync(source, selector)
    let values: Array<number | Promise<number>>
    switch (nextIter.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            values = nextIter.generator()
            break
        case ParallelGeneratorType.PromiseOfPromises:
            values = await nextIter.generator()
            break
        case ParallelGeneratorType.PromiseToArray:
        default:
            values = await nextIter.generator()
            break
    }

    if (values.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    let value = 0
    for (const selectedValue of values) {
        value += await selectedValue
    }

    return value / values.length
}
