import { type IParallelEnumerable, ParallelGeneratorType, type TypedData } from "../../types"

/* eslint-disable  */

export const nextIterationWithIndex = <TSource, TOut>(
    source: IParallelEnumerable<TSource>,
    onfulfilled: (x: TSource, index: number) => TOut): TypedData<TOut> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const generator = () => dataFunc.generator().then((x) => {
                const convValues = new Array<TOut>(x.length)
                for (let i = 0; i < x.length; i++) {
                    convValues[i] = onfulfilled(x[i], i)
                }
                return convValues
            })
            return {
                generator,
                type: ParallelGeneratorType.PromiseToArray,
            }
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const generator = () => {
                const previousData = dataFunc.generator()
                const newPromises = new Array<Promise<TOut>>(previousData.length)
                for (let i = 0; i < previousData.length; i++) {
                    newPromises[i] = previousData[i].then((value) => {
                        return onfulfilled(value, i)
                    })
                }
                return newPromises
            }
            return {
                generator,
                type: ParallelGeneratorType.ArrayOfPromises,
            }
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const generator = async () => {
                const previousData = await dataFunc.generator()
                const newPromises = new Array<Promise<TOut>>(previousData.length)
                for (let i = 0; i < previousData.length; i++) {
                    newPromises[i] = previousData[i].then((value) => onfulfilled(value, i))
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
