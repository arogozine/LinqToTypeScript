import { type IParallelEnumerable, ParallelGeneratorType, type TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const skip = <TSource>(
    source: IParallelEnumerable<TSource>,
    count: number): IParallelEnumerable<TSource> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const generator = async () => (await dataFunc.generator()).slice(count)
            return new BasicParallelEnumerable({
                generator,
                type: ParallelGeneratorType.PromiseToArray,
            })
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const generator = () => dataFunc.generator().slice(count)
            return new BasicParallelEnumerable({
                generator,
                type: ParallelGeneratorType.ArrayOfPromises,
            })
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const generator = async () => {
                const dataInner = await dataFunc.generator()
                return dataInner.slice(count)
            }
            const dataFuncNew: TypedData<TSource> = {
                generator,
                type: ParallelGeneratorType.PromiseOfPromises,
            }

            return new BasicParallelEnumerable<TSource>(dataFuncNew)
        }
    }
}
