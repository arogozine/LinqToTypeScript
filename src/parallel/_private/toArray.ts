import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

export function toArray<TSource>(source: IParallelEnumerable<TSource>): Promise<TSource[]> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
            return dataFunc.generator()
        case ParallelGeneratorType.ArrayOfPromises:
            return Promise.all(dataFunc.generator())
        case ParallelGeneratorType.PromiseOfPromises:
            return (async () => {
                const data = await dataFunc.generator()
                return Promise.all(data)
            })()
        default:
            throw new Error("Not Implemented")
    }
}
