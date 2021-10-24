import { StrictEqualityComparer } from "../../shared"
import { IAsyncEnumerable, IEqualityComparer } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If not comparer is specified, uses the @see {StrictEqualityComparer}
 * @param first An IAsyncEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncEnumerable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export const intersect = <TSource>(
    first: IAsyncEnumerable<TSource>,
    second: IAsyncEnumerable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IAsyncEnumerable<TSource> => {

    async function *iterator(): AsyncIterableIterator<TSource> {

        const firstResults = await first.distinct(comparer).toArray()

        if (firstResults.length === 0) {
            return
        }

        const secondResults = await second.toArray()

        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (comparer(firstValue, secondValue) === true) {
                    yield firstValue
                    break
                }
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
