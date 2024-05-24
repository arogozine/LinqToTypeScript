import { fromAsync } from "../../async/static/fromAsync"
import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types"

export const distinctAsync = <TSource>(
    source: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> => {

    async function* iterator() {
        const distinctElements: TSource[] = []
        for await (const item of source) {
            let found = false
            for (const distinctElement of distinctElements) {
                if (await comparer(distinctElement, item)) {
                    found = true
                    break
                }
            }

            if (!found) {
                distinctElements.push(item)
                yield item
            }
        }
    }

    return fromAsync(iterator)
}
