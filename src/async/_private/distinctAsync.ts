import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const distinctAsync = <TSource>(
    source: AsyncIterable<TSource>,
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

    return new BasicAsyncEnumerable(iterator)
}
