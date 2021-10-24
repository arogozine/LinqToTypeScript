import { IParallelEnumerable } from "../../types"
import { typeDataToArray } from "./_typeDataToArray"

/**
 * Converts an Async Iterable to a key value pair object
 * @param source IParallelEnumerable to Convert to an Object
 * @param selector Key Selector
 * @returns KVP Object
 */
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
