import { type IParallelEnumerable, ParallelGeneratorType } from "../../types"

export const elementAtOrDefault = async <TSource>(
    source: IParallelEnumerable<TSource>,
    index: number): Promise<TSource | null>  =>{
    const dataFunc = source.dataFunc

    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const values = await dataFunc.generator()
            if (index >= values.length) {
                return null
            } else {
                return values[index]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const promises = dataFunc.generator()
            if (index >= promises.length) {
                return null
            } else {
                return await promises[index]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const promises = await dataFunc.generator()
            if (index >= promises.length) {
                return null
            } else {
                return await promises[index]
            }
        }
    }
}
