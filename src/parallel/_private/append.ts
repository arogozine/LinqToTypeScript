import { type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const append = <TSource>(source: IParallelEnumerable<TSource>, element: TSource): IParallelEnumerable<TSource> => {
    const dataFunc = source.dataFunc

    switch (dataFunc.type) {
        case ParallelGeneratorType.ArrayOfPromises: {
            const generator = () => {
                const array = dataFunc.generator()
                array.push(Promise.resolve(element))
                return array
            }
            return new BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            })
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const generator: () => Promise<Promise<TSource>[]> = async () => {
                const array = await dataFunc.generator()
                array.push(Promise.resolve(element))
                return array
            }

            return new BasicParallelEnumerable<TSource>({
                generator,
                type: dataFunc.type,
            })
        }
        case ParallelGeneratorType.PromiseToArray: {
            const generator = async () => {
                const array = await dataFunc.generator()
                array.push(element)
                return array
            }
            return new BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            })
        }
    }
}
