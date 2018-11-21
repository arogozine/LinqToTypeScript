import { StrictEqualityComparer } from "../../shared/TypesAndHelpers"
import { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export function intersect<TSource>(
    first: IEnumerable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> {

    function *iterator(): IterableIterator<TSource> {

        const firstResults = [...first.distinct(comparer)]

        if (firstResults.length === 0) {
            return
        }

        const secondResults = [...second]

        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (comparer(firstValue, secondValue) === true) {
                    yield firstValue
                    break
                }
            }
        }
    }

    return new BasicEnumerable(iterator)
}
