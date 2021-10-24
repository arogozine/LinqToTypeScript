import { IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"


/**
 * Converts an IParallelEnumerable<V> to a Map<K, V[]>.
 * @param source An IParallelEnumerable<V> to convert.
 * @param selector An async function to serve as a key selector.
 * @returns A promise for Map<K, V[]>
 */
export const toMapAsync = async <TKey, TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>> => {
    const map = new Map<TKey, TSource[]>()

    const dataFunc = nextIterationAsync(source, async (value) => {
        const key = await selector(value)
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
