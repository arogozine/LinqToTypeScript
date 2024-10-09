import { StrictEqualityComparer } from "../../shared"
import type { IEqualityComparer } from "../../types"

export const sequenceEquals = <TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer) => {

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

    return firstResult.done === true && secondResult.done === true
}
