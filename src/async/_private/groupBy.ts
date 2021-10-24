import { Grouping } from "../../sync/Grouping"
import { IAsyncEnumerable, IEqualityComparer, IGrouping, SelectorKeyType } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

type GroupByFunc = {
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param source An AsyncIterable<T> whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    <TSource, TKey extends SelectorKeyType>(
        source: AsyncIterable<TSource>,
        keySelector: (x: TSource) => TKey): IAsyncEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
     * @param source An AsyncIterable<T> whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @param comparer An IEqualityComparer<T> to compare keys.
     */
    <TSource, TKey>(
        source: AsyncIterable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
}


export const groupBy: GroupByFunc = <TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> => {

    if (comparer) {
        return groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return groupBy_0_Simple(source,
            keySelector as (x: TSource) => any)
    }
}

const groupBy_0 = <TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> => {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for await (const value of source) {
            const key = keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (comparer(group.key, key)) {
                    group.push(value)
                    found = true
                    break
                }
            }

            if (found === false) {
                keyMap.push(new Grouping<TKey, TSource>(key, value)) // TODO
            }

        }

        for (const g of keyMap) {
            yield g
        }
    }

    return new BasicAsyncEnumerable(generate)
}

const groupBy_0_Simple = <TSource, TKey extends SelectorKeyType>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey):
        IAsyncEnumerable<IGrouping<TKey, TSource>> => {

    async function *iterator(): AsyncIterableIterator<IGrouping<TKey, TSource>> {
        const keyMap: {[key: string]: Grouping<TKey, TSource>} = {}
        for await (const value of source) {

            const key = keySelector(value)
            const grouping: Grouping<TKey, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<TKey, TSource>(key, value)
            }
        }

        // eslint-disable-next-line guard-for-in
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
