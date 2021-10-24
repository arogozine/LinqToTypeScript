import { StrictEqualityComparer } from "../../shared"
import { IAsyncEnumerable, IEqualityComparer } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Returns distinct elements from a sequence by using the default or specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IEqualityComparer<T> to compare values. Optional. Defaults to Strict Equality Comparison.
 * @returns An IAsyncEnumerable<T> that contains distinct elements from the source sequence.
 */
export const distinct = <TSource>(
    source: AsyncIterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IAsyncEnumerable<TSource> => {

    async function* iterator() {
        const distinctElements: TSource[] = []
        for await (const item of source) {

            const foundItem = distinctElements.find((x) => comparer(x, item))

            if (!foundItem) {
                distinctElements.push(item)
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
