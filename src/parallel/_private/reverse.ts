import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { IParallelEnumerable, ParallelGeneratorType } from "./../../types"

export const reverse = <TSource>(
    source: IParallelEnumerable<TSource>): IParallelEnumerable<TSource> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.ArrayOfPromises: {
            const generator = () => {
                return dataFunc.generator().reverse()
            }
            return new BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            })
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const generator: () => Promise<Promise<TSource>[]> = async () => {
                const array = await dataFunc.generator()
                return array.reverse()
            }

            return new BasicParallelEnumerable<TSource>({
                generator,
                type: dataFunc.type,
            })
        }
        case ParallelGeneratorType.PromiseToArray: {
            const generator = async () => {
                const array = await dataFunc.generator()
                return array.reverse()
            }
            return new BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            })
        }
    }
}
