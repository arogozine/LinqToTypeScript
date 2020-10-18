import { IAsyncParallel, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IParallelEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
export function concat<TSource>(
    // eslint-disable-next-line no-shadow
    first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>): IParallelEnumerable<TSource> {
    const generator = async () => {
        // Wait for both enumerables
        const promiseResults = await Promise.all([ first.toArray(), second.toArray() ])
        // Concat
        const firstData = promiseResults[0]
        const secondData = promiseResults[1]
        const data = new Array(firstData.length + secondData.length)
        let i = 0
        for (; i < firstData.length; i++) {
            data[i] = firstData[i]
        }

        for (let j = 0; j < secondData.length; j++, i++) {
            data[i] = secondData[j]
        }

        return data
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
