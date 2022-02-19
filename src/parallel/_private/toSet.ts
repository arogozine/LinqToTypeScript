import { IParallelEnumerable } from "../../types"
import { typeDataToArray } from "./_typeDataToArray"

export const toSet = async <TSource>(
    source: IParallelEnumerable<TSource>): Promise<Set<TSource>> => {

    const dataFunc = source.dataFunc
    const values = await typeDataToArray(dataFunc)

    return new Set<TSource>(values)
}
