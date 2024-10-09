import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

type SelectAsyncFunc = {
    <TSource, TResult>(
        source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
    <TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
        source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
}


export const selectAsync: SelectAsyncFunc = <TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> => {

    if (typeof selector === "string") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return selectAsync2(source, selector)
    } else {
        return selectAsync1(source, selector as (x: TSource) => Promise<TResult>)
    }
}

const selectAsync1 = <TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult> => {
    async function* iterator() {
        for await (const value of source) {
            yield selector(value)
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

const selectAsync2 = <
    TSource extends { [ key: string]: Promise<TResult> },
    TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TResult> => {
    async function* iterator() {
        for await (const value of source) {
            yield value[key]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
