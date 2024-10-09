import type { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export type SelectFunc = {
    <TSource, TResult>(
        source: Iterable<TSource>, selector: (x: TSource, index: number) => TResult): IEnumerable<TResult>
    <TSource, TKey extends keyof TSource>(
        source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>
}

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export const select: SelectFunc = <TSource, TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource, index: number) => TResult) | TKey): IEnumerable<TSource[TKey]> | IEnumerable<TResult> => {

    if (typeof selector === "function") {
        const { length } = selector
        if (length === 1) {
            return select1(source, selector as (x: TSource) => TResult)
        } else {
            return select2(source, selector)
        }
    } else {
        return select3(source, selector)
    }
}

const select1 = <TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => TResult) => {
    function* iterator() {
        for (const value of source) {
            yield selector(value)
        }
    }

    return new BasicEnumerable(iterator)
}

const select2 = <TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource, index: number) => TResult) => {
    function* iterator() {
        let index = 0
        for (const value of source) {
            yield selector(value, index)
            index++
        }
    }

    return new BasicEnumerable(iterator)
}

const select3 = <TSource, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey) => {
    function* iterator() {
        for (const value of source) {
            yield value[key]
        }
    }

    return new BasicEnumerable(iterator)
}
