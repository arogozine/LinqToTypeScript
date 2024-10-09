import { fromAsync } from "../../async/static/fromAsync"
import type { IAsyncEnumerable, IAsyncEqualityComparer, IEnumerable } from "../../types"

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
