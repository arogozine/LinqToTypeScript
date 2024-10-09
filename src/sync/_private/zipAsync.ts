import { fromAsync } from "../../async/static/fromAsync"
import type { IAsyncEnumerable } from "../../types"

export const zipAsync = <TFirst, TSecond, TResult>(
    first: Iterable<TFirst>,
    second: Iterable<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> => {
    async function* generator() {
        const firstIterator = first[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        while (true) {
            const a = firstIterator.next()
            const b = secondIterator.next()

            if (a.done || b.done) {
                break
            } else {
                yield resultSelector(a.value, b.value)
            }
        }
    }

    return fromAsync(generator)
}
