import { OrderedAsyncEnumerable } from "../async/OrderedAsyncEnumerable"
import { IComparer, IOrderedAsyncEnumerable, IOrderedEnumerable } from "../types"
import { asSortedKeyValues } from "./_ordered/asSortedKeyValues"
import { asSortedKeyValuesAsync } from "./_ordered/asSortedKeyValuesAsync"
import { BasicEnumerable } from "./BasicEnumerable"

/**
 * Represents Ordered Enumeration
 * @private
 */
export class OrderedEnumerable<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {

    //#region Sync

    public static generate<TSource, TKey>(
        source: Iterable<TSource> | OrderedEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => IterableIterator<TSource[]>
        if (source instanceof OrderedEnumerable) {
            orderedPairs = function*() {
                for (const pair of source.orderedPairs()) {
                    yield* asSortedKeyValues(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                asSortedKeyValues(source, keySelector, ascending, comparer)
        }

        return new OrderedEnumerable(orderedPairs)
    }

    //#endregion

    //#region Async

    public static generateAsync<TSource, TKey>(
        source: Iterable<TSource> | OrderedEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => AsyncIterableIterator<TSource[]>
        if (source instanceof OrderedEnumerable) {
            orderedPairs = async function*() {
                for (const pair of source.orderedPairs()) {
                    yield* asSortedKeyValuesAsync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                asSortedKeyValuesAsync(source, keySelector, ascending, comparer)
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
