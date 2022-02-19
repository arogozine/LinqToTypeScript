import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

export const anyAsync = async <TSource>(
    source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> => {
    const nextIter = nextIterationAsync(source, predicate)

    let promises: Promise<boolean>[]
    switch (nextIter.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            promises = nextIter.generator()

            if (promises.length === 0) {
                return false
            }

            return new Promise((resolve, reject) => {
                let resolvedCount = 0
                for (const promise of promises) {
                    promise.then(value => {
                        resolvedCount++
                        if (value) {
                            resolve(true)
                        }
                        else if (resolvedCount === promises.length) {
                            resolve(false)
                        }
                    }, reject)
                }
            })

        case ParallelGeneratorType.PromiseOfPromises:
            promises = await nextIter.generator()

            if (Promise.length === 0) {
                return false
            }

            const values = await Promise.all(promises)
            return values.includes(true)
    }
}
