import type { IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

export const partitionAsync = async <TSource>(
    source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<[pass: TSource[], fail: TSource[]]> => {

    const dataFunc = nextIterationAsync(source, async (value) => {
        const passed = await predicate(value)
        return [passed, value] as [boolean, TSource]
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
