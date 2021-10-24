import { IParallelEnumerable } from "../../types"
import { typeDataToArray } from "./_typeDataToArray"

/**
 * Converts the Async Itertion to a Set
 * @param source IParallelEnumerable
 * @returns Set containing the iteration values
 */
export const toSet = async <TSource>(
    source: IParallelEnumerable<TSource>): Promise<Set<TSource>> => {

    const dataFunc = source.dataFunc
    const values = await typeDataToArray(dataFunc)

    return new Set<TSource>(values)
}
