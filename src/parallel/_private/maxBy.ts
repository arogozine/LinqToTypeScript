import { ErrorString, InvalidOperationException } from "../../shared"
import type { IParallelEnumerable } from "../../types"
import { nextIteration } from "./_nextIteration"
import { typeDataToArray } from "./_typeDataToArray"

export const maxBy = async <TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => number): Promise<TSource> => {

    const dataFunc = nextIteration(source, (x: TSource) =>  {
        return {
            value: selector(x),
            item: x
        }
    })

    const data = await typeDataToArray(dataFunc)

    let maxValue: number | null = null
    let maxItem: TSource | null = null
    for (const item of data) {
        if (maxValue === null || item.value > maxValue) {
            maxValue = item.value
            maxItem = item.item
        }
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}
