import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

type ZipFunc = {
    /**
     * Creates a tuple of corresponding elements of two sequences, producing a sequence of the results.
     * @param first The first sequence to merge.
     * @param second The second sequence to merge.
     * @returns An IEnumerable<[TFirst, TSecond]> that contains merged elements of two input sequences.
     */
    <TFirst, TSecond>(
        first: Iterable<TFirst>,
        second: Iterable<TSecond>): IEnumerable<[TFirst, TSecond]>
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     * @param first The first sequence to merge.
     * @param second The second sequence to merge.
     * @param resultSelector A function that specifies how to merge the elements from the two sequences.
     * @returns An IEnumerable<TResult> that contains merged elements of two input sequences.
     */
    <TFirst, TSecond, TResult>(
        first: Iterable<TFirst>,
        second: Iterable<TSecond>,
        resultSelector: (x: TFirst, y: TSecond) => TResult): IEnumerable<TResult>
}


export const zip : ZipFunc = <TFirst, TSecond, TResult>(
    source: Iterable<TFirst>,
    second: Iterable<TSecond>,
    resultSelector?: (x: TFirst, y: TSecond) => TResult): IEnumerable<TResult> | IEnumerable<[TFirst, TSecond]> => {
    if (resultSelector) {
        return zip2(source, second, resultSelector)
    } else {
        return zip1(source, second)
    }
}

const zip1 = <TFirst, TSecond>(source: Iterable<TFirst>, second: Iterable<TSecond>): IEnumerable<[TFirst, TSecond]> => {
    function* iterator(): IterableIterator<[TFirst, TSecond]> {
        const firstIterator = source[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        while (true) {
            const a = firstIterator.next()
            const b = secondIterator.next()

            if (a.done || b.done) {
                break
            } else {
                yield [a.value, b.value]
            }
        }
    }

    return new BasicEnumerable(iterator)
}

const zip2 = <TFirst, TSecond, TResult>(
    source: Iterable<TFirst>,
    second: Iterable<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => TResult) => {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]()
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

    return new BasicEnumerable(iterator)
}
