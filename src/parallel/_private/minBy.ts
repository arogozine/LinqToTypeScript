import { ErrorString, InvalidOperationException } from "../../shared"
import type { IParallelEnumerable } from "../../types"
import { nextIteration } from "./_nextIteration"
import { typeDataToArray } from "./_typeDataToArray"

export const minBy = async <TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => number): Promise<TSource> => {

    const dataFunc = nextIteration(source, (x: TSource) => {
        return {
            value: selector(x),
            item: x
        }
    })

    const data = await typeDataToArray(dataFunc)

    let minValue: number | null = null
    let minItem: TSource | null = null
    for (const item of data) {
        if (minValue === null || item.value < minValue) {
            minValue = item.value
            minItem = item.item
        }
    }

    if (minItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return minItem
    }
}
