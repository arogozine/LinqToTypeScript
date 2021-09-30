import { IAsyncParallel, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IParallelEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
export const concatenate = <TSource>(
    first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const [firstData, secondData] = await Promise.all([ first.toArray(), second.toArray() ])
        return [...firstData, ...secondData]
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
