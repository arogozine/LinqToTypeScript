import { fromAsync } from "../../async/static/fromAsync"
import { IAsyncEnumerable, IAsyncEqualityComparer, IEqualityComparer, SelectorKeyType } from "../../types"
import { IGrouping } from "../../types/IGrouping"
import { Grouping } from "../Grouping"

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupByAsync<TSource, TKey extends SelectorKeyType>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> or IAsyncEqualityComparer<T> to compare keys.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => Promise<any>)
    }
}

function groupByAsync_0_Simple<TSource, TKey extends SelectorKeyType>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

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

function groupByAsync_0<TSource, TKey>(
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

    return fromAsync(generate)
}
