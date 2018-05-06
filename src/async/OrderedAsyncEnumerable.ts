import { IComparer, OrderByMap } from "../shared/shared"
import { InferKey, InferKeyAsync } from "../types/InferKeyAsync"
import { KeySelector, KeySelectorAsync } from "../types/KeySelector"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"

/**
 * Ordered Async Enumerable
 */
export class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    //#region Sync

    private static async *asAsyncSortedKeyValues<TSource>(
        source: AsyncIterable<TSource>,
        keySelector: KeySelectorAsync<TSource>,
        ascending: boolean,
        comparer?: IComparer<string | number>) {
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

    private static async *asAsyncSortedKeyValuesSync<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelectorAsync<TSource>,
        ascending: boolean,
        comparer?: IComparer<string | number>) {
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
        comparer?: IComparer<string | number>) {
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

    private static async *asSortedKeyValuesSync<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelector<TSource>,
        ascending: boolean,
        comparer?: IComparer<string | number>) {
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
        source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>,
        keySelector: KeySelectorAsync<TSource>,
        ascending: boolean,
        comparer?: IComparer<string | number>) {
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

    public static generate<TSource>(
        source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>,
        keySelector: KeySelector<TSource>,
        ascending: boolean,
        comparer?: IComparer<string | number>) {
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

    private constructor(private readonly orderedPairs: () => AsyncIterable<T[]>) {
        super(async function *() {
            for await (const orderedPair of orderedPairs()) {
                yield* orderedPair
            }
        })
    }

    public thenBy(keySelector: KeySelector<T>,
                  comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<T> {
        return OrderedAsyncEnumerable.generate<T>(this, keySelector, true, comparer)
    }

    public thenByAsync(keySelector: KeySelectorAsync<T>,
                       comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<T> {
        return OrderedAsyncEnumerable.generateAsync<T>(this, keySelector, true, comparer)
    }

    public thenByDescending(keySelector: KeySelector<T>,
                            comparer?: IComparer<number | string>): IOrderedAsyncEnumerable<T> {
        return OrderedAsyncEnumerable.generate(this, keySelector, false, comparer)
    }

    public thenByDescendingAsync(keySelector: KeySelectorAsync<T>,
                                 comparer?: IComparer<number | string>) {
        return OrderedAsyncEnumerable.generateAsync<T>(this, keySelector, false, comparer)
    }
}
