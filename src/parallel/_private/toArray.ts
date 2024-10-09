import type { IParallelEnumerable } from "../../types"
import { typeDataToArray } from "./_typeDataToArray"

export const toArray = <TSource>(source: IParallelEnumerable<TSource>): Promise<TSource[]> => {
    return typeDataToArray(source.dataFunc)
}
