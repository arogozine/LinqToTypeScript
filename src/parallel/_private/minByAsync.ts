import { ErrorString, InvalidOperationException } from "../../shared"
import type { IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

export const minByAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<TSource> => {

    const dataFunc = nextIterationAsync(source as IParallelEnumerable<TSource> , async (x: TSource) =>  {
        return {
            value: await selector(x), 
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
