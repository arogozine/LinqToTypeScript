import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

// tslint:disable:no-shadowed-variable
export function select<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>
export function select<TSource, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>
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
