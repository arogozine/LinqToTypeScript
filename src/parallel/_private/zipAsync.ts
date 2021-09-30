import { IAsyncParallel, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Applies a specified async function to the corresponding elements of two sequences,
 * producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector An async function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export const zipAsync = <TFirst, TSecond, TResult>(
    first: IAsyncParallel<TFirst>,
    second: IAsyncParallel<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult> => {
    async function generator() {
        const [left, right] = await Promise.all([first.toArray(), second.toArray()])
        const maxLength = left.length > right.length ? left.length : right.length
        const resultPromises = new Array<Promise<TResult>>(maxLength)
        for (let i = 0; i < maxLength; i++) {
            const a = left[i]
            const b = right[i]
            resultPromises[i] = resultSelector(a, b)
        }
        return Promise.all(resultPromises)
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
