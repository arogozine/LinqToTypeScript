import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IEnumerable<T> that contains elements from the input sequence
 * that occur before the element at which the test no longer passes.
 */
export function takeWhile<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => boolean): IEnumerable<T> {

    if (predicate.length === 1) {
        return takeWhile1(source, predicate as (x: T) => boolean)
    } else {
        return takeWhile2(source, predicate as (x: T, index: number) => boolean)
    }
}

const takeWhile1 = <T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> => {
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

const takeWhile2 = <T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> => {
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
