import { fromAsync } from "../../async/static/fromAsync"
import { IAsyncEnumerable } from "../../types"

type SelectAsyncFunc = {
    <TSource, TResult>(
        source: Iterable<TSource>, selector: (x: TSource, index: number) => Promise<TResult>): IAsyncEnumerable<TResult>
    <TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
            source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
}

export const selectAsync: SelectAsyncFunc = <TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource, index: number) => Promise<TResult>) | TKey): IAsyncEnumerable<any> => {

    if (typeof selector === "function") {
        if (selector.length === 1) {
            return selectAsync1(source, selector as (x: TSource) => Promise<TResult>)
        } else {
            return selectAsync2(source, selector)
        }
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return selectAsync3(source, selector)
    }
}

const selectAsync1 = <TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>) => {
    async function* iterator() {
        for (const value of source) {
            yield selector(value)
        }
    }

    return fromAsync(iterator)
}

const selectAsync2 = <TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource, index: number) => Promise<TResult>) => {
    async function* iterator() {
        let index = 0
        for (const value of source) {
            yield selector(value, index)
            index++
        }
    }

    return fromAsync(iterator)
}

const selectAsync3 = <
    TSource extends { [ key: string]: Promise<TResult> },
    TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>, key: TKey) => {
    async function* iterator() {
        for (const value of source) {
            yield value[key]
        }
    }

    return fromAsync(iterator)
}
