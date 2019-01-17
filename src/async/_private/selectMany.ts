import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Projects each element of a sequence to an IAsyncEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectMany<TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource, index: number) => Iterable<Y>): IAsyncEnumerable<Y>
/**
 * Projects each element of a sequence to an AsyncIterable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An AsyncIterable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export function selectMany
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
    source: AsyncIterable<TSource>,
    selector: keyof TSource): IAsyncEnumerable<Y>
export function selectMany<TCollection>(
    source: AsyncIterable<any>,
    selector: any): IAsyncEnumerable<TCollection> {
    if (typeof selector === "function") {
        if (selector.length === 1) {
            return selectMany1(source, selector)
        } else {
            return selectMany2(source, selector)
        }
    } else {
        return selectMany3(source, selector)
    }
}

const selectMany1 = <TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Iterable<Y>) => {
    async function* iterator() {
        for await (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

const selectMany2 = <TSource, TCollection>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource, index: number) => Iterable<TCollection>) => {
    async function* iterator() {
        let index = 0
        for await (const value of source) {
            for (const selectorValue of selector(value, index)) {
                yield selectorValue
            }
            index++
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

const selectMany3 =
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
    source: AsyncIterable<TSource>,
    selector: keyof TSource) => {
    async function* iterator() {
        for await (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
