import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

// TODO

/**
 * Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectMany<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult>
/**
 * Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An IEnumerable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export function selectMany<
    TSource extends { [key: string]: Iterable<TResult>}, TResult>(
        source: Iterable<TSource>,
        selector: keyof TSource): IEnumerable<TResult>
export function selectMany<TSource extends { [key: string]: Iterable<TResult>}, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => Iterable<TResult>) | keyof TSource) {
    if (typeof selector === "string") {
        return selectMany_2(source, selector)
    } else {
        return selectMany_1(source, selector as (x: TSource) => Iterable<TResult>)
    }
}

function selectMany_1<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult> {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue
            }
        }
    }

    return new BasicEnumerable(iterator)
}

function selectMany_2<TSource extends { [key: string]: Iterable<TResult> }, TResult>(
    source: Iterable<TSource>, selector: keyof TSource) {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue
            }
        }
    }

    return new BasicEnumerable(iterator)
}
