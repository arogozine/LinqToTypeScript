import { IAsyncEnumerable, IAsyncEqualityComparer } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Returns distinct elements from a sequence by using the specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains distinct elements from the source sequence.
 */
export const distinctAsync = <TSource>(
    source: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> => {

    async function* iterator() {
        const distinctElements: TSource[] = []
        outerLoop:
        for await (const item of source) {
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

    return new BasicAsyncEnumerable(iterator)
}
