import { IEqualityComparer } from "../../shared/IEqualityComparer"
import { StrictEqualityComparer } from "../../shared/TypesAndHelpers"

/**
 * Determines whether or not two sequences are equal
 * @param first first iterable
 * @param second second iterable
 * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
 */
export function sequenceEquals<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

    const firstIterator = first[Symbol.iterator]()
    const secondIterator = second[Symbol.iterator]()

    let firstResult = firstIterator.next()
    let secondResult = secondIterator.next()

    while (!firstResult.done && !secondResult.done) {
        if (!comparer(firstResult.value, secondResult.value)) {
            return false
        }

        firstResult = firstIterator.next()
        secondResult = secondIterator.next()
    }

    return firstResult.done && secondResult.done
}
