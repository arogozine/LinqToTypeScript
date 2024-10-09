import { StrictEqualityComparer } from "../../shared"
import type { IAsyncEnumerable, IEqualityComparer } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

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
