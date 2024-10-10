import type { IAsyncEqualityComparer } from "../../types"

export const sequenceEqualsAsync = async <TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> => {

    const firstIterator = first[Symbol.asyncIterator]()
    const secondIterator = second[Symbol.asyncIterator]()

    let results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
    let firstResult = results[0]
    let secondResult = results[1]

    while (!firstResult.done && !secondResult.done) {
        if (await comparer(firstResult.value, secondResult.value) === false) {
            return false
        }

        results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
        firstResult = results[0]
        secondResult = results[1]
    }

    return firstResult.done === true && secondResult.done === true
}
