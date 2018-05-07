import { DataType } from ".."
import {
    IComparer,
    OrderByMap,
} from "../shared/shared"
import { InferKey, InferKeyAsync } from "../types/InferKeyAsync"
import { KeySelector, KeySelectorAsync } from "../types/KeySelector"
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable"

/**
 * Ordered Parallel Enumerable
 * @private
 */
export class OrderedParallelEnumerable<T> extends BasicParallelEnumerable<T> implements IOrderedParallelEnumerable<T> {
    //#region Sync

    private static async *asAsyncSortedKeyValues<TSource>(
        source: AsyncIterable<TSource>,
        keySelector: KeySelectorAsync<TSource>,
        ascending: boolean,
        comparer?: IComparer<InferKeyAsync<typeof keySelector>>) {
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

    private static async *asAsyncSortedKeyValuesSync<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelectorAsync<TSource>,
        ascending: boolean,
        comparer?: IComparer<InferKeyAsync<typeof keySelector>>) {
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

    private static async asAsyncKeyMapSync<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelectorAsync<TSource>) {
        type KeyType = InferKeyAsync<typeof keySelector>

        const map = new OrderByMap<KeyType, TSource>()
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

    private static async asAsyncKeyMap<TSource>(
        source: AsyncIterable<TSource>,
        keySelector: KeySelectorAsync<TSource>) {
        type KeyType = InferKeyAsync<typeof keySelector>

        const map = new OrderByMap<KeyType, TSource>()
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

    private static async *asSortedKeyValues<TSource>(
        source: AsyncIterable<TSource>,
        keySelector: KeySelector<TSource>,
        ascending: boolean,
        comparer?: IComparer<InferKey<typeof keySelector>>) {
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

    private static async *asSortedKeyValuesSync<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelector<TSource>,
        ascending: boolean,
        comparer?: IComparer<InferKey<typeof keySelector>>) {
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

    private static asKeyMapSync<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelector<TSource>) {
        type KeyType = InferKey<typeof keySelector>

        const map = new OrderByMap<KeyType, TSource>()
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

    private static async asKeyMap<TSource>(
        source: AsyncIterable<TSource>,
        keySelector: KeySelector<TSource>) {
        type KeyType = InferKey<typeof keySelector>

        const map = new OrderByMap<KeyType, TSource>()
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

    public static generateAsync<TSource>(
        source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>,
        keySelector: KeySelectorAsync<TSource>,
        ascending: boolean,
        comparer?: IComparer<InferKeyAsync<typeof keySelector>>) {
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

    public static generate<TSource>(
        source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>,
        keySelector: KeySelector<TSource>,
        ascending: boolean,
        comparer?: IComparer<InferKey<typeof keySelector>>) {
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

    public thenBy(keySelector: KeySelector<T>,
                  comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedParallelEnumerable<T> {
        return OrderedParallelEnumerable.generate<T>(this, keySelector, true, comparer)
    }

    public thenByAsync(keySelector: KeySelectorAsync<T>,
                       comparer?: IComparer<InferKeyAsync<typeof keySelector>>): IOrderedParallelEnumerable<T> {
        return OrderedParallelEnumerable.generateAsync<T>(this, keySelector, true, comparer)
    }

    public thenByDescending(keySelector: KeySelector<T>,
                            comparer?: IComparer<InferKey<typeof keySelector>>): IOrderedParallelEnumerable<T> {
        return OrderedParallelEnumerable.generate(this, keySelector, false, comparer)
    }

    public thenByDescendingAsync(keySelector: KeySelectorAsync<T>,
                                 comparer?: IComparer<InferKeyAsync<typeof keySelector>>) {
        return OrderedParallelEnumerable.generateAsync<T>(this, keySelector, false, comparer)
    }
}
