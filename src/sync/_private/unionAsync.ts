import { fromAsync } from "../../async/_private/fromAsync"
import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer"

/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An Iterable<T> whose distinct elements form the first set for the union.
 * @param second An Iterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export const unionAsync = <TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>) => {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const result: TSource[] = []

        for (const source of [first, second]) {
            for (const value of source) {
                let exists = false

                for (const resultValue of result) {
                    if (await comparer(value, resultValue) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    yield value
                    result.push(value)
                }
            }
        }
    }

    return fromAsync(iterator)
}
