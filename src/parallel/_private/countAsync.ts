import { type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

export const countAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => Promise<boolean>) => {
    const data = nextIterationAsync(source, predicate)
    let countPromise: Promise<boolean[]>
    switch (data.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            countPromise = Promise.all(data.generator())
            break
        case ParallelGeneratorType.PromiseOfPromises:
            countPromise = Promise.all(await data.generator())
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
