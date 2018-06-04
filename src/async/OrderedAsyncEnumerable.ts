import { IComparer } from "../shared/shared"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"

/**
 * Ordered Async Enumerable
 */
export class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    //#region Sync

    private static async *asAsyncSortedKeyValues<TSource, TKey>(
        source: AsyncIterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        const map = await OrderedAsyncEnumerable.asAsyncKeyMap(source, keySelector)

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

    private static async *asAsyncSortedKeyValuesSync<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        const map = await OrderedAsyncEnumerable.asAsyncKeyMapSync(source, keySelector)
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

    private static async asAsyncKeyMapSync<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>) {

        const map = new Map<TKey, TSource[]>()
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

    private static async asAsyncKeyMap<TSource, TKey>(
        source: AsyncIterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>) {

        const map = new Map<TKey, TSource[]>()
        for await (const item of source) {
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

    //#endregion

    //#region Sync

    private static async *asSortedKeyValues<TSource, TKey>(
        source: AsyncIterable<TSource>,
        keySelector: (x: TSource) => TKey,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        const map = await OrderedAsyncEnumerable.asKeyMap(source, keySelector)

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

    private static async *asSortedKeyValuesSync<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        const map = await OrderedAsyncEnumerable.asKeyMapSync(source, keySelector)
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

    private static asKeyMapSync<TSource, TKey>(
        source: Iterable<TSource>,
        keySelector: (x: TSource) => TKey) {

        const map = new Map<TKey, TSource[]>()
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

    private static async asKeyMap<TSource, TKey>(
        source: AsyncIterable<TSource>,
        keySelector: (x: TSource) => TKey) {

        const map = new Map<TKey, TSource[]>()
        for await (const item of source) {
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

    //#endregion

    public static generateAsync<TSource, TKey>(
        source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => AsyncIterable<TSource[]>
        if (source instanceof OrderedAsyncEnumerable) {
            orderedPairs = async function*() {
                for await (const pair of source.orderedPairs()) {
                    yield* OrderedAsyncEnumerable
                        .asAsyncSortedKeyValuesSync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                OrderedAsyncEnumerable.asAsyncSortedKeyValues(source, keySelector, ascending, comparer)
        }

        return new OrderedAsyncEnumerable(orderedPairs)
    }

    public static generate<TSource, TKey>(
        source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => AsyncIterable<TSource[]>
        if (source instanceof OrderedAsyncEnumerable) {
            orderedPairs = async function*() {
                for await (const pair of source.orderedPairs()) {
                    yield* OrderedAsyncEnumerable
                        .asSortedKeyValuesSync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                OrderedAsyncEnumerable.asSortedKeyValues(source, keySelector, ascending, comparer)
        }

        return new OrderedAsyncEnumerable(orderedPairs)
    }

    public constructor(private readonly orderedPairs: () => AsyncIterable<T[]>) {
        super(async function *() {
            for await (const orderedPair of orderedPairs()) {
                yield* orderedPair
            }
        })
    }

    public thenBy<TKey>(keySelector: (x: T) => TKey,
                        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T> {
        return OrderedAsyncEnumerable.generate<T, TKey>(this, keySelector, true, comparer)
    }

    public thenByAsync<TKey>(keySelector: (x: T) => Promise<TKey>,
                             comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T> {
        return OrderedAsyncEnumerable.generateAsync<T, TKey>(this, keySelector, true, comparer)
    }

    public thenByDescending<TKey>(keySelector: (x: T) => TKey,
                                  comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T> {
        return OrderedAsyncEnumerable.generate<T, TKey>(this, keySelector, false, comparer)
    }

    public thenByDescendingAsync<TKey>(keySelector: (x: T) => Promise<TKey>,
                                       comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T> {
        return OrderedAsyncEnumerable.generateAsync<T, TKey>(this, keySelector, false, comparer)
    }
}
