import { StrictEqualityComparer } from "../../shared/TypesAndHelpers"
import { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export function distinct<TSource>(
    source: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> {

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
