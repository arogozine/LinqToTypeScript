import { StrictEqualityComparer } from "../../shared"
import type { IAsyncEnumerable, IEqualityComparer } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const distinct = <TSource>(
    source: AsyncIterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IAsyncEnumerable<TSource> => {

    async function* iterator() {
        const distinctElements: TSource[] = []
        for await (const item of source) {

            const found = distinctElements.some((x) => comparer(x, item))

            if (!found) {
                distinctElements.push(item)
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
