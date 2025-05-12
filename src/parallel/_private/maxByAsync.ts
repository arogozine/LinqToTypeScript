import { ErrorString, InvalidOperationException } from "../../shared"
import type { IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

export const maxByAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<TSource> => {

    const dataFunc = nextIterationAsync(source as IParallelEnumerable<TSource> , async (x: TSource) =>  {
        return {
            value: await selector(x), 
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
