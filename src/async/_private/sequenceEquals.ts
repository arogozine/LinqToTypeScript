import { StrictEqualityComparer } from "../../shared/StrictEqualityComparer"
import { IEqualityComparer } from "../../types"

/**
 * Compares two async iterations to see if they are equal using a comparer function.
 * @param first First Sequence
 * @param second Second Sequence
 * @param comparer Comparer
 * @returns Whether or not the two iterations are equal
 */
export async function sequenceEquals<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {

    const firstIterator = first[Symbol.asyncIterator]()
    const secondIterator = second[Symbol.asyncIterator]()

    let results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
    let firstResult = results[0]
    let secondResult = results[1]

    while (!firstResult.done && !secondResult.done) {
        if (!comparer(firstResult.value, secondResult.value)) {
            return false
        }

        results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
        firstResult = results[0]
        secondResult = results[1]
    }

    return firstResult.done === true && secondResult.done === true
}
