import { StrictEqualityComparer } from "../../shared/TypesAndHelpers"
import { IEqualityComparer } from "../../types"

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

    return firstResult.done && secondResult.done
}
