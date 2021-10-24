import { IParallelEnumerable } from "../../types"
import { typeDataToArray } from "./_typeDataToArray"

/**
 * Creates an array from a IParallelEnumerable<T>.
 * @param source An IParallelEnumerable<T> to create an array from.
 * @returns An array of elements
 */
export const toArray = <TSource>(source: IParallelEnumerable<TSource>): Promise<TSource[]> => {
    return typeDataToArray(source.dataFunc)
}
