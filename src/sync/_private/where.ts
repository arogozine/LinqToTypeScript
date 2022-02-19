import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const where = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> => {
    if (predicate.length === 1) {
        return where1(source, predicate as (x: TSource) => boolean)
    } else {
        return where2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

const where1 = <T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> => {
    function* iterator() {
        for (const item of source) {
            if (predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}

const where2 = <T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> => {
    function* iterator() {
        let i = 0
        for (const item of source) {
            if (predicate(item, i++) === true) {
                yield item
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}
