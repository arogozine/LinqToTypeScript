import { IAsyncParallel, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export const where = <TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const values = await source.toArray()
        return values.filter(predicate)
    }
    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
