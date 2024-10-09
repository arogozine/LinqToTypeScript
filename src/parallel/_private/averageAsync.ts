import { ErrorString, InvalidOperationException } from "../../shared"
import { type IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

export const averageAsync = async <TSource>(
    source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> => {
    const nextIter = nextIterationAsync(source, selector)
    const values = await typeDataToArray(nextIter)

    if (values.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    let value = 0
    for (const selectedValue of values) {
        value += selectedValue
    }

    return value / values.length
}
