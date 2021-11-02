import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

type Zip = {
    /**
     * Creates tuples from th corresponding elements of two sequences, producing a sequence of the results.
     * @param first The first sequence to merge.
     * @param second The second sequence to merge.
     * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
     */
    <T, Y>(
        first: AsyncIterable<T>,
        second: AsyncIterable<Y>): IAsyncEnumerable<[T, Y]>
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     * @param first The first sequence to merge.
     * @param second The second sequence to merge.
     * @param resultSelector A function that specifies how to merge the elements from the two sequences.
     * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
     */
    <TFirst, TSecond, TResult>(
        first: AsyncIterable<TFirst>,
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TFirst, y: TSecond) => TResult): IAsyncEnumerable<TResult>
}

export const zip: Zip = <TFirst, TSecond, TResult>(
    first: AsyncIterable<TFirst>,
    second: AsyncIterable<TSecond>,
    resultSelector?: (x: TFirst, y: TSecond) => TResult)
    : IAsyncEnumerable<TResult> | IAsyncEnumerable<[TFirst, TSecond]> => {
    if (resultSelector) {
        return zip2(first, second, resultSelector)
    } else {
        return zip1(first, second)
    }
}

const zip1 = <T, Y>(
    source: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<[T, Y]> => {
    async function* iterator(): AsyncIterableIterator<[T, Y]> {
        const firstIterator = source[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const [a, b] = await Promise.all([firstIterator.next(), secondIterator.next()])

            if (a.done || b.done) {
                break
            } else {
                yield [a.value, b.value]
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

const zip2 = <T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT> => {
    async function* iterator() {
        const firstIterator = source[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const [a, b] = await Promise.all([firstIterator.next(), secondIterator.next()])

            if (a.done || b.done) {
                break
            } else {
                yield resultSelector(a.value, b.value)
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
