import { StrictEqualityComparer } from "../../shared"
import { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If no comparer is selected, uses the StrictEqualityComparer.
 * @param first An IEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An Iterable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export const intersect = <TSource>(
    first: IEnumerable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> => {

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
