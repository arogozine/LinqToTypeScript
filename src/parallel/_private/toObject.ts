import type { IParallelEnumerable } from "../../types"
import { typeDataToArray } from "./_typeDataToArray"

export const toObject = async <TSource, TKey extends keyof any>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => TKey): Promise<Record<TKey, TSource>> => {

    const dataFunc = source.dataFunc
    const values = await typeDataToArray(dataFunc)

    const map: Partial<Record<TKey, TSource>> = {}

    for (const value of values) {
        map[selector(value)] = value
    }

    return map as Record<TKey, TSource>
}
