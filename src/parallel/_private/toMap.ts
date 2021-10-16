import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Converts an IParallelEnumerable<V> to a Map<K, V[]>.
 * @param source An IParallelEnumerable<V> to convert.
 * @param selector A function to serve as a key selector.
 * @returns A promise for Map<K, V[]>
 */
export const toMap = async <K, V>(
    source: IParallelEnumerable<V>,
    selector: (x: V) => K): Promise<Map<K, V[]>> => {
    const map = new Map<K, V[]>()

    const dataFunc = source.dataFunc

    let values: V[]

    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
            values = await dataFunc.generator()
            break
        case ParallelGeneratorType.ArrayOfPromises:
            values = await Promise.all(dataFunc.generator())
            break
        case ParallelGeneratorType.PromiseOfPromises:
            values = await Promise.all(await dataFunc.generator())
            break
    }

    for (const value of values) {
        const key = selector(value)
        const array = map.get(key)

        if (array === undefined) {
            map.set(key, [value])
        } else {
            array.push(value)
        }
    }

    return map
}
