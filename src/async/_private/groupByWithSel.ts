import { Grouping } from "../../sync/Grouping"
import type { IAsyncEnumerable, IEqualityComparer, IGrouping, SelectorKeyType } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

type GroupByWithSelFunc = {
    <TSource, TKey extends SelectorKeyType, TElement>(
        source: AsyncIterable<TSource>,
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<TKey, TElement>>
    <TSource, TKey, TElement>(
        source: AsyncIterable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
}


export const groupByWithSel: GroupByWithSelFunc = <TSource, TKey, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TElement>> => {

    if (comparer) {
        return groupBy1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return groupBy1Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}

const groupBy1Simple = <TSource, TKey extends SelectorKeyType, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<TKey, TElement>> => {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TElement>> {
        const keyMap: { [key: string]: Grouping<TKey, TElement> } = {}
        for await (const value of source) {

            const key = keySelector(value)
            const grouping: Grouping<TKey, TElement> = keyMap[key]
            const element = elementSelector(value)

            if (grouping) {
                grouping.push(element)
            } else {
                keyMap[key] = new Grouping<TKey, TElement>(key, element)
            }
        }

        // eslint-disable-next-line guard-for-in
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return new BasicAsyncEnumerable(generate)
}

const groupBy1 = <TSource, TKey, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>> => {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TElement>> {
        const keyMap = new Array<Grouping<TKey, TElement>>()
        for await (const value of source) {
            const key = keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (comparer(group.key, key)) {
                    group.push(elementSelector(value))
                    found = true
                    break
                }
            }

            if (found === false) {
                const element = elementSelector(value)
                keyMap.push(new Grouping<TKey, TElement>(key, element)) // TODO
            }

        }

        for (const value of keyMap) {
            yield value
        }
    }

    return new BasicAsyncEnumerable(generate)
}
