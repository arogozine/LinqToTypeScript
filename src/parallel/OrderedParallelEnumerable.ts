import { DataType } from ".."
import {
    IComparer,
} from "../shared/shared"
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable"

/**
 * Ordered Parallel Enumerable
 * @private
 */
export class OrderedParallelEnumerable<T> extends BasicParallelEnumerable<T> implements IOrderedParallelEnumerable<T> {
    //#region Sync

    private static async *asAsyncSortedKeyValues<TSource, TKey>(
        source: AsyncIterable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        const map = await OrderedParallelEnumerable.asAsyncKeyMap(source, keySelector)

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
        const map = await OrderedParallelEnumerable.asAsyncKeyMapSync(source, keySelector)
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
        const map = await OrderedParallelEnumerable.asKeyMap(source, keySelector)

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
        const map = await OrderedParallelEnumerable.asKeyMapSync(source, keySelector)
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
        source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => AsyncIterable<TSource[]>
        if (source instanceof OrderedParallelEnumerable) {
            orderedPairs = async function*() {
                for await (const pair of source.orderedPairs()) {
                    yield* OrderedParallelEnumerable
                        .asAsyncSortedKeyValuesSync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                OrderedParallelEnumerable.asAsyncSortedKeyValues(source, keySelector, ascending, comparer)
        }

        return new OrderedParallelEnumerable(orderedPairs)
    }

    public static generate<TSource, TKey>(
        source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => AsyncIterable<TSource[]>
        if (source instanceof OrderedParallelEnumerable) {
            orderedPairs = async function*() {
                for await (const pair of source.orderedPairs()) {
                    yield* OrderedParallelEnumerable
                        .asSortedKeyValuesSync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                OrderedParallelEnumerable.asSortedKeyValues(source, keySelector, ascending, comparer)
        }

        return new OrderedParallelEnumerable(orderedPairs)
    }

    private constructor(private readonly orderedPairs: () => AsyncIterable<T[]>) {
        super({
            generator: async () => {
                const asyncVals = orderedPairs()
                const array = []
                for await (const val of asyncVals) {
                    array.push(...val)
                }
                return array
            },
            type: DataType.PromiseToArray,
        })
    }

    public thenBy<TKey>(keySelector: (x: T) => TKey,
                        comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T> {
        return OrderedParallelEnumerable.generate<T, TKey>(this, keySelector, true, comparer)
    }

    public thenByAsync<TKey>(keySelector: (x: T) => Promise<TKey>,
                             comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T> {
        return OrderedParallelEnumerable.generateAsync(this, keySelector, true, comparer)
    }

    public thenByDescending<TKey>(keySelector: (x: T) => TKey,
                                  comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T> {
        return OrderedParallelEnumerable.generate<T, TKey>(this, keySelector, false, comparer)
    }

    public thenByDescendingAsync<TKey>(keySelector: (x: T) => Promise<TKey>,
                                       comparer?: IComparer<TKey>): IOrderedParallelEnumerable<T> {
        return OrderedParallelEnumerable.generateAsync<T, TKey>(this, keySelector, false, comparer)
    }
}
