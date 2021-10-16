import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Converts an Async Iterable to a key value pair object
 * @param source IParallelEnumerable to Convert to an Object
 * @param selector Async Key Selector
 * @returns KVP Object
 */
 export const toObjectAsync = async <TSource, TKey extends keyof any>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<TKey>): Promise<Record<TKey, TSource>> => {

    const dataFunc = source.dataFunc
    let values: TSource[]

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

    const keyValuesPromises = values.map(async (value) => {
        return [await selector(value), value] as [TKey, TSource]
    })

    const keyValues = await Promise.all(keyValuesPromises)

    const map: Partial<Record<TKey, TSource>> = {}

    for (const [key, value] of keyValues) {
        map[key] = value
    }

    return map as Record<TKey, TSource>
}
