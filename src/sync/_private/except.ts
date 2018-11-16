import { IEqualityComparer } from "../../shared/IEqualityComparer"
import { EqualityComparer } from "../../shared/TypesAndHelpers"
import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

export function except<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = EqualityComparer): IEnumerable<TSource> {

    function *iterator() {
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
                yield firstItem
            }
        }
    }

    return new BasicEnumerable(iterator)
}
