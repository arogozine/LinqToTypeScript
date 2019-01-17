import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Applies a specified async function to the corresponding elements of two sequences,
 * producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector An async function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export function zipAsync<TFirst, TSecond, TResult>(
    first: AsyncIterable<TFirst>,
    second: AsyncIterable<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> {
    async function *generator() {
        const firstIterator = first[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const results = await Promise.all([firstIterator.next(), secondIterator.next()])
            const firstNext = results[0]
            const secondNext = results[1]

            if (firstNext.done || secondNext.done) {
                break
            } else {
                yield resultSelector(firstNext.value, secondNext.value)
            }
        }
    }

    return new BasicAsyncEnumerable(generator)
}
