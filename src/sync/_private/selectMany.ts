import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Projects each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectMany<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource, index: number) => Iterable<TResult>): IEnumerable<TResult>
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
    selector: ((x: TSource, index: number) => Iterable<TResult>) | keyof TSource) {
    if (typeof selector === "function") {
        if (selector.length === 1)  {
            return selectMany1(source, selector as (x: TSource) => Iterable<TResult>)
        } else {
            return selectMany2(source, selector)
        }
    } else {
        return selectMany3(source, selector)
    }
}

const selectMany1 = <TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Iterable<TResult>) => {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue
            }
        }
    }

    return new BasicEnumerable(iterator)
}

const selectMany2 = <TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource, index: number) => Iterable<TResult>) => {
    function* iterator() {
        let index = 0
        for (const value of source) {
            for (const selectorValue of selector(value, index)) {
                yield selectorValue
            }
            index++
        }
    }

    return new BasicEnumerable(iterator)
}

const selectMany3 = <TSource extends { [key: string]: Iterable<TResult> }, TResult>(
    source: Iterable<TSource>, selector: keyof TSource) => {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue
            }
        }
    }

    return new BasicEnumerable(iterator)
}
