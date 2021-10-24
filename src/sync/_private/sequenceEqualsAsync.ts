import { IAsyncEqualityComparer } from "../../types/IAsyncEqualityComparer"

/**
 * Compares two sequences to see if they are equal using a async comparer function.
 * @param first First Sequence
 * @param second Second Sequence
 * @param comparer Async Comparer
 * @returns Whether or not the two iterations are equal
 */
export const sequenceEqualsAsync = async <TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> => {

    const firstIterator = first[Symbol.iterator]()
    const secondIterator = second[Symbol.iterator]()

    let firstResult = firstIterator.next()
    let secondResult = secondIterator.next()

    while (!firstResult.done && !secondResult.done) {
        if (await comparer(firstResult.value, secondResult.value) === false) {
            return false
        }

        firstResult = firstIterator.next()
        secondResult = secondIterator.next()
    }

    return firstResult.done === true && secondResult.done === true
}
