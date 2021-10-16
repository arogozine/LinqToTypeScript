import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

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

    const map: Partial<Record<TKey, TSource>> = {}

    for (const value of values) {
        map[selector(value)] = value
    }

    return map as Record<TKey, TSource>
}
