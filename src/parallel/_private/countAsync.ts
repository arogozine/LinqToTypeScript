import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

/**
 * Returns how many elements in the specified sequence satisfy a condition
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition.
 * @returns How many elements in the specified sequence satisfy the provided predicate.
 */
export async function countAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<number> {
    const data = nextIterationAsync(source, predicate)
    let countPromise: Promise<boolean[]>
    switch (data.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            countPromise = Promise.all(data.generator())
            break
        case ParallelGeneratorType.PromiseOfPromises:
            countPromise = Promise.all(await data.generator())
            break
        case ParallelGeneratorType.PromiseToArray:
        default:
            countPromise = data.generator()
            break
    }

    let totalCount = 0
    for (const value of await countPromise) {
        if (value) {
            totalCount++
        }
    }

    return totalCount
}
