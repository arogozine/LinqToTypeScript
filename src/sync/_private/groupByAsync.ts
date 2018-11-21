import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable, IAsyncEqualityComparer, IEqualityComparer } from "../../types"
import { IGrouping } from "../../types/IGrouping"
import { Grouping } from "../Grouping"

export function groupByAsync<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>
export function groupByAsync<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>
export function groupByAsync<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupByAsync<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return groupByAsync_0<TSource, TKey>(source, keySelector, comparer)
    } else {
        return groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => Promise<any>)
    }
}

export function groupByAsync_0_Simple<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<any>): IAsyncEnumerable<IGrouping<any, TSource>> {

    async function *iterator(): AsyncIterableIterator<IGrouping<string, TSource>> {
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

        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return from(iterator)
}

export function groupByAsync_0<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

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

    return from(generate)
}
