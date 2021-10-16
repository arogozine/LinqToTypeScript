import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"

/* eslint-disable  */

/**
 * @private Next Iteration for Parallel Enumerable
 */
export const nextIterationAsync = <TSource, TOut>(
    source: IParallelEnumerable<TSource>,
    onfulfilled: (x: TSource) => Promise<TOut>): TypedData<TOut> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const generator = async () => {
                const results = await dataFunc.generator()
                const newPromises = new Array<Promise<TOut>>(results.length)
                for (let i = 0; i < results.length; i++) {
                    newPromises[i] = onfulfilled(results[i])
                }
                return newPromises
            }
            return {
                generator,
                type: ParallelGeneratorType.PromiseOfPromises,
            }
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const generator = () => {
                const promises = dataFunc.generator()

                return promises.map(async promise => {
                    const value = await promise
                    return await onfulfilled(value)
                })
            }
            return {
                generator,
                type: ParallelGeneratorType.ArrayOfPromises,
            }
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const generator = async () => {
                const promises = await dataFunc.generator()
                return promises.map((promise) => promise.then(onfulfilled))
            }
            return {
                generator,
                type: ParallelGeneratorType.PromiseOfPromises,
            }
        }
    }
}
