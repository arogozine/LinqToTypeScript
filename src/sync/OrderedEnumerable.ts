import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
import { OrderedAsyncEnumerable } from "../async/OrderedAsyncEnumerable"
import { IComparer, OrderByMap } from "./../shared/shared"
import { BasicEnumerable } from "./BasicEnumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"

/**
 * Represents Ordered Enumeration
 * @private
 */
export class OrderedEnumerable<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {

    //#region Sync

    private static *asSortedKeyValues<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        const map = OrderedEnumerable.asKeyMap(source, keySelector)
        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

        if (ascending) {
            for (let i = 0; i < sortedKeys.length; i++) {
                yield map.get(sortedKeys[i]) as TSource[]
            }
        } else {
            for (let i = sortedKeys.length - 1; i >= 0; i--) {
                yield map.get(sortedKeys[i]) as TSource[]
            }
        }
    }

    private static asKeyMap<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey) {

        const map = new OrderByMap<TKey, TSource>()
        for (const item of source) {
            const key = keySelector(item)
            const currentMapping = map.get(key)

            if (currentMapping) {
                currentMapping.push(item)
            } else {
                map.set(key, [item])
            }
        }
        return map
    }

    public static generate<TSource, TKey>(
        source: Iterable<TSource> | OrderedEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => IterableIterator<TSource[]>
        if (source instanceof OrderedEnumerable) {
            orderedPairs = function*() {
                for (const pair of source.orderedPairs()) {
                    yield* OrderedEnumerable
                        .asSortedKeyValues(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                OrderedEnumerable.asSortedKeyValues(source, keySelector, ascending, comparer)
        }

        return new OrderedEnumerable(orderedPairs)
    }

    //#endregion

    //#region Async

    private static async *asSortedKeyValuesAsync<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        const map = await OrderedEnumerable.asKeyMapAsync(source, keySelector)
        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

        if (ascending) {
            for (let i = 0; i < sortedKeys.length; i++) {
                yield map.get(sortedKeys[i]) as TSource[]
            }
        } else {
            for (let i = sortedKeys.length - 1; i >= 0; i--) {
                yield map.get(sortedKeys[i]) as TSource[]
            }
        }
    }

    private static async asKeyMapAsync<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>) {

        const map = new OrderByMap<TKey, TSource>()
        for (const item of source) {
            const key = await keySelector(item)
            const currentMapping = map.get(key)

            if (currentMapping) {
                currentMapping.push(item)
            } else {
                map.set(key, [item])
            }
        }
        return map
    }

    public static generateAsync<TSource, TKey>(
        source: Iterable<TSource> | OrderedEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => AsyncIterableIterator<TSource[]>
        if (source instanceof OrderedEnumerable) {
            orderedPairs = async function*() {
                for (const pair of source.orderedPairs()) {
                    yield* OrderedEnumerable
                        .asSortedKeyValuesAsync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                OrderedEnumerable.asSortedKeyValuesAsync(source, keySelector, ascending, comparer)
        }

        return new OrderedAsyncEnumerable(orderedPairs)
    }

    //#endregion

    private constructor(private readonly orderedPairs: () => IterableIterator<T[]>) {
        super(function *() {
            for (const orderedPair of orderedPairs()) {
                yield* orderedPair
            }
        })
    }

    public thenBy<TKey>(
        keySelector: (x: T) => TKey,
        comparer?: IComparer<TKey>): IOrderedEnumerable<T> {
        return OrderedEnumerable.generate(this, keySelector, true, comparer)
    }

    public thenByAsync<TKey>(
        keySelector: (x: T) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T> {
        return OrderedEnumerable.generateAsync(this, keySelector, true, comparer)
    }

    public thenByDescending<TKey>(
        keySelector: (x: T) => TKey,
        comparer?: IComparer<TKey>): IOrderedEnumerable<T> {
        return OrderedEnumerable.generate(this, keySelector, false, comparer)
    }

    public thenByDescendingAsync<TKey>(
        keySelector: (x: T) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T> {
        return OrderedEnumerable.generateAsync(this, keySelector, false, comparer)
    }
}
