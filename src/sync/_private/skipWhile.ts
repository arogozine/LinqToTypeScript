import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An Iterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IEnumerable<T> that contains the elements from the input sequence starting at the first element
 * in the linear series that does not pass the test specified by predicate.
 */
export const skipWhile = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => boolean) => {

    if (predicate.length === 1) {
        return skipWhile1(source, predicate as (x: TSource) => boolean)
    } else {
        return skipWhile2(source, predicate)
    }
}

const skipWhile1 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): IEnumerable<TSource> => {

    function* iterator() {
        let skip = true
        for (const item of source) {

            if (skip === false) {
                yield item
            } else if (predicate(item) === false) {
                skip = false
                yield item
            }
        }
    }

    return new BasicEnumerable(iterator)
}

const skipWhile2 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> => {

    function* iterator() {
        let index = 0
        let skip = true
        for (const item of source) {

            if (skip === false) {
                yield item
            } else if (predicate(item, index) === false) {
                skip = false
                yield item
            }

            index++
        }
    }

    return new BasicEnumerable(iterator)
}
