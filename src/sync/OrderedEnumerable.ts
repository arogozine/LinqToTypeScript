import { KeySelector } from "../types/KeySelector"
// import { IOrderedAsyncEnumerable } from "./../async/IOrderedAsyncEnumerable"
import { IComparer, OrderByMap } from "./../shared/shared"
import { BasicEnumerable } from "./BasicEnumerable"
import { Enumerable } from "./Enumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"

type InferKey<TSelector> =
    TSelector extends (x: any) => number ? number : string

/**
 * Represents Ordered Enumeration
 */
export class OrderedEnumerable<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {

    private static asSortedKeyValues<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelector<TSource>,
        ascending: boolean,
        comparer?: IComparer<string | number>) {
        const sortFunc = ascending ? OrderedEnumerable.sort : OrderedEnumerable.sortDescending
        const mapFunc = OrderedEnumerable.asKeyMap(source, keySelector)
        const map = mapFunc()
        return sortFunc(map, comparer)
    }

    private static *sort<TSource>(
        map: OrderByMap<string | number, TSource>,
        comparer?: IComparer<string | number>) {
        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)
        for (const key of sortedKeys) {
            const values = map.get(key) as TSource[]
            yield values
        }
    }

    private static *sortDescending<TSource>(
        map: OrderByMap<string | number, TSource>,
        comparer?: IComparer<string | number>) {
        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i]
            const values = map.get(key) as TSource[]
            yield values
        }
    }

    private static asKeyMap<TSource>(
        source: Iterable<TSource>,
        keySelector: KeySelector<TSource>) {
        return () => OrderedEnumerable.asKeyMapPrivate(source, keySelector)
    }

    private static asKeyMapPrivate<TSource>(
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
