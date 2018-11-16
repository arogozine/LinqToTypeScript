import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../async/IAsyncEnumerable"

export function selectAsync<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
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
