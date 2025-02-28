import { type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

export const allAsync = <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<boolean> => {
    const nextIter = nextIterationAsync(source, async (x) => {
        if (await predicate(x) === false) {
            throw new Error(String(false))
        }
        return true
    })

    switch (nextIter.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            return Promise.all(nextIter.generator())
                .then(() => true, () => false)
        case ParallelGeneratorType.PromiseOfPromises:
            return nextIter.generator()
                .then(Promise.all.bind(Promise))
                .then(() => true, () => false)
    }
}
