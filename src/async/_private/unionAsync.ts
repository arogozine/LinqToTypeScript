import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An AsyncIterable<T> whose distinct elements form the first set for the union.
 * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export function unionAsync<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const result: TSource[] = []

        for (const source of [first, second]) {
            for await (const value of source) {
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

    return new BasicAsyncEnumerable(iterator)
}
