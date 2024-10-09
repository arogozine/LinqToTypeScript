import { fromAsync } from "../../async/static/fromAsync"
import type { IAsyncEnumerable, IGrouping, IAsyncEqualityComparer, IEqualityComparer, SelectorKeyType } from "../../types"
import { Grouping } from "../Grouping"

type GroupByAsyncFunc = {
    <TSource, TKey extends SelectorKeyType>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
    <TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey> | TKey,
        comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
}

export const groupByAsync: GroupByAsyncFunc = <TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> => {

    if (comparer) {
        return groupByAsync_0<TSource, TKey>(source, keySelector, comparer)
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => Promise<any>)
    }
}

const groupByAsync_0_Simple = <TSource, TKey extends SelectorKeyType>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> => {

    async function *iterator(): AsyncIterableIterator<IGrouping<TKey, TSource>> {
        const keyMap: {[key: string]: Grouping<any, TSource>} = {}
        for (const value of source) {

            const key = await keySelector(value)
            const grouping: Grouping<any, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<any, TSource>(key, value)
            }
        }

        // eslint-disable-next-line guard-for-in
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return fromAsync(iterator)
}

const groupByAsync_0 = <TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> => {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for (const value of source) {
            const key = await keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (await comparer(group.key, key) === true) {
                    group.push(value)
                    found = true
                    break
                }
            }

            if (found === false) {
                keyMap.push(new Grouping<TKey, TSource>(key, value))
            }

        }

        for (const keyValue of keyMap) {
            yield keyValue
        }
    }

    return fromAsync(generate)
}
