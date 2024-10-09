import type { IParallelEnumerable } from "../../types"
import { nextIteration } from "./_nextIteration"
import { typeDataToArray } from "./_typeDataToArray"

export const toMap = async <TKey, TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>> => {
    const map = new Map<TKey, TSource[]>()

    const dataFunc = nextIteration(source, (value) => {
        const key = selector(value)
        return [key, value] as [TKey, TSource]
    })

    const keyValues = await typeDataToArray(dataFunc)

    for (const [key, value] of keyValues) {
        const array = map.get(key)

        if (array === undefined) {
            map.set(key, [value])
        } else {
            array.push(value)
        }
    }

    return map
}
