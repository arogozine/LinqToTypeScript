import { fromAsync } from "../../async/static/fromAsync"
import { IAsyncEnumerable, IAsyncEqualityComparer, IEnumerable } from "../../types"

/**
 * Produces the set intersection of two sequences by using the specified IAsyncEqualityComparer<T> to compare values.
 * @param first An IEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An Iterable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export const intersectAsync = <TSource>(
    first: IEnumerable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> => {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const firstResults: TSource[] = []
        for await (const item of first.distinctAsync(comparer)) {
            firstResults.push(item)
        }

        if (firstResults.length === 0) {
            return
        }

        const secondResults = [...second]

        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (await comparer(firstValue, secondValue) === true) {
                    yield firstValue
                    break
                }
            }
        }
    }

    return fromAsync(iterator)
}
