import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

type SelectFunc = {
    <TSource, TResult>(
        source: AsyncIterable<TSource>, selector: (x: TSource, index: number) => TResult): IAsyncEnumerable<TResult>
    <TSource, TKey extends keyof TSource>(
        source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
}

export const select: SelectFunc = <TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: ((x: TSource, index: number) => Y) | keyof TSource): IAsyncEnumerable<any> => {

    if (typeof selector === "function") {
        if (selector.length === 1) {
            return select1(source, selector as (x: TSource) => Y)
        } else {
            return select2(source, selector)
        }
    } else {
        return select3(source, selector)
    }
}

const select1 = <TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => TResult) => {
    async function* iterator() {
        for await (const value of source) {
            yield selector(value)
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

const select2 = <TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource, index: number) => TResult) => {
    async function* iterator() {
        let index = 0
        for await (const value of source) {
            yield selector(value, index)
            index++
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

const select3 = <TSource, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey) => {
    async function* iterator() {
        for await (const value of source) {
            yield value[key]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
