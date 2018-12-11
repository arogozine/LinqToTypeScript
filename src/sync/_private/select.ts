import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

// TODO: Index

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A transform function to apply to each element.
 * @returns
 * An IEnumerable<T> whose elements are the result of invoking the transform function on each element of source.
 */
export function select<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export function select<TSource, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export function select<TSource, TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => TResult) | TKey): IEnumerable<TSource[TKey]> | IEnumerable<TResult> {

    if (typeof selector === "string") {
        return select_2(source, selector)
    } else {
        return select_1(source, selector as (x: TSource) => TResult)
    }
}

function select_1<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult> {
    function* iterator() {
        for (const value of source) {
            yield selector(value)
        }
    }

    return new BasicEnumerable(iterator)
}

function select_2<TSource, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]> {
    function* iterator() {
        for (const value of source) {
            yield value[key]
        }
    }

    return new BasicEnumerable(iterator)
}
