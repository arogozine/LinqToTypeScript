import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Converts the Async Itertion to a Set
 * @param source IParallelEnumerable
 * @returns Set containing the iteration values
 */
export const toSet = async <TSource>(
    source: IParallelEnumerable<TSource>): Promise<Set<TSource>> => {

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

    return new Set<TSource>(values)
}
