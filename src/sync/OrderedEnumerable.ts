import { InferKey } from "../types/InferKeyAsync"
import { KeySelector } from "../types/KeySelector"
import { IComparer, OrderByMap } from "./../shared/shared"
import { BasicEnumerable } from "./BasicEnumerable"
import { Enumerable } from "./Enumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"

/**
 * Represents Ordered Enumeration
 * @private
 */
export class OrderedEnumerable<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {

    //#region Sync

    private static *asSortedKeyValues<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelector<TSource>,
        ascending: boolean,
        comparer?: IComparer<string | number>) {
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

    private static asKeyMap<TSource>(
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

    //#endregion

    public static generate<TSource>(
        source: Iterable<TSource> | OrderedEnumerable<TSource>,
        keySelector: KeySelector<TSource>,
        ascending: boolean,
        comparer?: IComparer<string | number>) {
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

    private constructor(private readonly orderedPairs: () => IterableIterator<T[]>) {
        super(function *() {
            for (const orderedPair of orderedPairs()) {
                yield* orderedPair
            }
        })
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public thenBy(keySelector: any, comparer?: any) {
        return Enumerable.thenBy(this, keySelector, comparer)
    }

    /*
    public thenByAsync(keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return Enumerable.thenByAsync(this, keySelector, comparer)
    }
    */

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any) {
        return Enumerable.thenByDescending(this, keySelector, comparer)
    }
    /*
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(keySelector: any, comparer?: any) {
        return Enumerable.thenByDescendingAsync(this, keySelector, comparer)
    }
    */
}
