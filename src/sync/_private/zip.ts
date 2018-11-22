import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export function zip<T, Y>(
    source: Iterable<T>,
    second: Iterable<Y>): IEnumerable<[T, Y]>
export function zip<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT>
export function zip<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector?: (x: T, y: Y) => OUT): IEnumerable<OUT> | IEnumerable<[T, Y]> {
    if (resultSelector) {
        return zip_2(source, second, resultSelector)
    } else {
        return zip_1(source, second)
    }
}

function zip_1<T, Y>(source: Iterable<T>, second: Iterable<Y>): IEnumerable<[T, Y]> {
    function* iterator(): IterableIterator<[T, Y]> {
        const firstIterator = source[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        while (true) {
            const a = firstIterator.next()
            const b = secondIterator.next()

            if (a.done && b.done) {
                break
            } else {
                yield [a.value, b.value]
            }
        }
    }

    return new BasicEnumerable(iterator)
}

function zip_2<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT> {
    function* iterator() {
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

    return new BasicEnumerable(iterator)
}
