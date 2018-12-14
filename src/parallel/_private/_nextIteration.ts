import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"

// tslint:disable:completed-docs

/**
 * @private Don't use directly.
 */
export function nextIteration<TSource, TOut>(
    source: IParallelEnumerable<TSource>,
    onfulfilled: (x: TSource) => TOut): TypedData<TOut> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const generator = () => dataFunc.generator().then((x) => {
                const convValues = new Array<TOut>(x.length)
                for (let i = 0; i < x.length; i++) {
                    convValues[i] = onfulfilled(x[i])
                }
                return convValues
            })
            return {
                generator,
                type: ParallelGeneratorType.PromiseToArray,
            }
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const generator = () => {
                const previousData = dataFunc.generator()
                const newPromises = new Array<Promise<TOut>>(previousData.length)
                for (let i = 0; i < previousData.length; i++) {
                    newPromises[i] = previousData[i].then(onfulfilled)
                }
                return newPromises
            }
            return {
                generator,
                type: ParallelGeneratorType.ArrayOfPromises,
            }
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const generator = async () => {
                const previousData = await dataFunc.generator()
                const newPromises = new Array<Promise<TOut>>(previousData.length)
                for (let i = 0; i < previousData.length; i++) {
                    newPromises[i] = previousData[i].then(onfulfilled)
                }
                return newPromises
            }
            return {
                generator,
                type: ParallelGeneratorType.PromiseOfPromises,
            }
        }
    }
}
