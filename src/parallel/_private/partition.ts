import { IParallelEnumerable } from "../../types"
import { nextIteration } from "./_nextIteration"
import { typeDataToArray } from "./_typeDataToArray"

/**
 * Paritions the AsyncIterable<T> into a tuple of failing and passing arrays
 * based on the predicate.
 * @param source Elements to Partition
 * @param predicate Pass / Fail condition
 * @returns [pass, fail]
 */
export const partition = async <TSource>(
    source: IParallelEnumerable<TSource>, predicate: (x: TSource) => boolean): Promise<[pass: TSource[], fail: TSource[]]> => {
    const dataFunc = nextIteration(source, (value) => {
        return [predicate(value), value] as [boolean, TSource]
    })

    const values = await typeDataToArray(dataFunc)

    const fail: TSource[] = []
    const pass: TSource[] = []

    for (const [passed, value] of values) {
        if (passed) {
            pass.push(value)
        } else {
            fail.push(value)
        }
    }

    return [pass, fail]
}
