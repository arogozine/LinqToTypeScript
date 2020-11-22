import { StrictEqualityComparer } from "../../shared"
import { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Returns distinct elements from a sequence by using the default or specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IEqualityComparer<T> to compare values. Optional. Defaults to Strict Equality Comparison.
 * @returns An IEnumerable<T> that contains distinct elements from the source sequence.
 */
export const distinct = <TSource>(
    source: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> => {

    function* iterator() {
        const distinctElements: TSource[] = []
        for (const item of source) {

            const foundItem = distinctElements.find((x) => comparer(x, item))

            if (!foundItem) {
                distinctElements.push(item)
                yield item
            }
        }
    }

    return new BasicEnumerable(iterator)
}
