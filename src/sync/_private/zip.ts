import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

type ZipFunc = {
    <TFirst, TSecond>(
        first: Iterable<TFirst>,
        second: Iterable<TSecond>): IEnumerable<[TFirst, TSecond]>
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
