import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../async/IAsyncEnumerable"

export function zipAsync<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT> {
    async function* generator() {
        const firstIterator = source[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        while (true) {
            const a = firstIterator.next()
            const b = secondIterator.next()

            if (a.done && b.done) {
                break
            } else {
                yield resultSelector(a.value, b.value)
            }
        }
    }

    return from(generator)
}
