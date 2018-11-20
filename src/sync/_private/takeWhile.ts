import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

export function takeWhile<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => boolean): IEnumerable<T> {

    if (predicate.length === 1) {
        return takeWhile_1(source, predicate as (x: T) => boolean)
    } else {
        return takeWhile_2(source, predicate as (x: T, index: number) => boolean)
    }
}

function takeWhile_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
    function* iterator() {
        for (const item of source) {
            if (predicate(item)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}

function takeWhile_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
    function* iterator() {
        let index = 0
        for (const item of source) {
            if (predicate(item, index++)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}
