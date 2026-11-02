import { StrictEqualityComparer } from "../../shared"
import { type IEnumerable, type IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const distinct = <TSource>(
    source: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> => {

    function* iterator() {
        const distinctElements: TSource[] = []
        for (const item of source) {

            const found = distinctElements.some((x) => comparer(x, item))

            if (!found) {
                distinctElements.push(item)
                yield item
            }
        }
    }

    return new BasicEnumerable(iterator)
}
