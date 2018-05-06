import { IComparer, OrderByMap } from "../shared/shared"
import { KeySelector } from "../types/KeySelector"
import { AsyncEnumerable } from "./AsyncEnumerable"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"

type InferKey<TSelector> =
    TSelector extends (x: any) => number ? number : string

/**
 * Ordered Async Enumerable
 */
export class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
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

    public thenBy(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenBy(this, keySelector, comparer)
    }

    /*
    public thenByAsync(keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenByAsync(this, keySelector, comparer)
    }
    */

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenByDescending(this, keySelector, comparer)
    }
    /*
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(keySelector: any, comparer?: any) {
        return AsyncEnumerable.thenByDescendingAsync(this, keySelector, comparer)
    }
    */
}
