import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types"

export function distinctAsync<TSource>(
    source: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        const distinctElements: TSource[] = []
        outerLoop:
        for (const item of source) {
            for (const distinctElement of distinctElements) {
                const found = await comparer(distinctElement, item)
                if (found) {
                    continue outerLoop
                }
            }

            distinctElements.push(item)
            yield item
        }
    }

    return from(iterator)
}
