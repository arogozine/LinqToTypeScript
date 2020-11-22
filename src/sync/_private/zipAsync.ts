import { from } from "../../async/_private/from"
import { IAsyncEnumerable } from "../../types"

/**
 * Applies a specified async function to the corresponding elements of two sequences,
 * producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector An async function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export const zipAsync = <TFirst, TSecond, TResult>(
    first: Iterable<TFirst>,
    second: Iterable<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> => {
    async function* generator() {
        const firstIterator = first[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        while (true) {
            const a = firstIterator.next()
            const b = secondIterator.next()

            if (a.done && b.done) {
                break
            } else {
                yield resultSelector(a.value, b.value)
            }
        }
    }

    return from(generator)
}
