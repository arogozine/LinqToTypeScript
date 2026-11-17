import { StrictEqualityComparer } from "../../shared"
import type { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const except = <TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> => {

    function *iterator() {
        if (comparer === StrictEqualityComparer) {
            // Hash fast path: O(n + m)
            const seen = new Set(second)
            for (const firstItem of first) {
                if (!seen.has(firstItem)) {
                    seen.add(firstItem)
                    yield firstItem
                }
            }
            return
        }

        const secondArray = [...second]

        for (const firstItem of first) {

            let exists = false
            for (let j = 0; j < secondArray.length; j++) {
                const secondItem = secondArray[j]

                if (comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                // Set semantics: later duplicates of this item are excluded
                secondArray.push(firstItem)
                yield firstItem
            }
        }
    }

    return new BasicEnumerable(iterator)
}
