import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../types"

// TODO: Index Selector

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector An async transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking
 * the transform function on each element of source.
 */
export function selectAsync<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param key A key of the elements in the sequence
 * @returns An IAsyncEnumerable<T> whoe elements are the result of getting the value for key
 * on each element of source.
 */
export function selectAsync<TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return selectAsync_2(source, selector)
    } else {
        return selectAsync_1(source, selector as (x: TSource) => Promise<TResult>)
    }
}

function selectAsync_1<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for (const value of source) {
            yield selector(value)
        }
    }

    return from(iterator)
}

function selectAsync_2<
    TSource extends { [ key: string]: Promise<TResult> },
    TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for (const value of source) {
            yield value[key]
        }
    }

    return from(iterator)
}
