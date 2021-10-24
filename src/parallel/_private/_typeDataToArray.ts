import { TypedData, ParallelGeneratorType, LimitedTypedData } from "../../types"

/**
 * @private
 */
export const typeDataToArray = async <TSource>(dataFunc: TypedData<TSource> | LimitedTypedData<TSource>) => {
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
            return await dataFunc.generator()
        case ParallelGeneratorType.ArrayOfPromises:
            return await Promise.all(dataFunc.generator())
        case ParallelGeneratorType.PromiseOfPromises:
            const data = await dataFunc.generator()
            return await Promise.all(data)
    }
}