import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

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
