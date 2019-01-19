import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An IParallelEnumerable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IParallelEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
export function skip<TSource>(
    source: IParallelEnumerable<TSource>,
    count: number): IParallelEnumerable<TSource> {
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
