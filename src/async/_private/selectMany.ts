import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

type SelectManyFunc = {
    <TSource, Y>(
        source: AsyncIterable<TSource>,
        selector: (x: TSource, index: number) => Iterable<Y>): IAsyncEnumerable<Y>
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
        source: AsyncIterable<TSource>,
        selector: keyof TSource): IAsyncEnumerable<Y>
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */

export const selectMany: SelectManyFunc = <TCollection>(
    source: AsyncIterable<any>,
    selector: any): IAsyncEnumerable<TCollection> => {
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
