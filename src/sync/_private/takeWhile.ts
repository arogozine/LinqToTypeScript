import type { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const takeWhile = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> => {

    if (predicate.length === 1) {
        return takeWhile1(source, predicate as (x: TSource) => boolean)
    } else {
        return takeWhile2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

const takeWhile1 = <T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> => {
    /**
     * @internal
     */
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
