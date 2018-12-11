import { from } from "../../async/AsyncEnumerable"
import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer"

/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An IEnumerable<T> whose distinct elements form the first set for the union.
 * @param second An IEnumerable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 */
export function unionAsync<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>) {

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

    return from(iterator)
}