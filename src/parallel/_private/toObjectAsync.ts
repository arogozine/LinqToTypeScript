import type { IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

export const toObjectAsync = async <TSource, TKey extends keyof any>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<TKey>): Promise<Record<TKey, TSource>> => {

    const dataFunc = nextIterationAsync(source, async (value) => {
        const key = await selector(value)
        return [key, value] as [TKey, TSource]
    })

    const keyValues = await typeDataToArray(dataFunc)

    const map: Partial<Record<TKey, TSource>> = {}

    for (const [key, value] of keyValues) {
        map[key] = value
    }

    return map as Record<TKey, TSource>
}
