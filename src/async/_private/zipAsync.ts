import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const zipAsync = <TFirst, TSecond, TResult>(
    first: AsyncIterable<TFirst>,
    second: AsyncIterable<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> => {
    async function *generator() {
        const firstIterator = first[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const results = await Promise.all([firstIterator.next(), secondIterator.next()])
            const firstNext = results[0]
            const secondNext = results[1]

            if (firstNext.done || secondNext.done) {
                break
            } else {
                yield resultSelector(firstNext.value, secondNext.value)
            }
        }
    }

    return new BasicAsyncEnumerable(generator)
}
