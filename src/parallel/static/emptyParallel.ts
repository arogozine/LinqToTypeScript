import { type IParallelEnumerable, ParallelGeneratorType, type TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Returns an empty IParallelEnumerable<T> that has the specified type argument.
 * @returns An empty IParallelEnumerable<T> whose type argument is TResult.
 */
export const emptyParallel = <TResult>(): IParallelEnumerable<TResult> => {
    const dataFunc: TypedData<TResult> = {
        generator: async () => [],
        type: ParallelGeneratorType.PromiseToArray,
    }

    return new BasicParallelEnumerable(dataFunc)
}
