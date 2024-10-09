import type { IComparer, IOrderedAsyncEnumerable } from "../types"
import { asAsyncSortedKeyValues } from "./_ordered/asAsyncSortedKeyValues"
import { asAsyncSortedKeyValuesSync } from "./_ordered/asAsyncSortedKeyValuesSync"
import { asSortedKeyValues } from "./_ordered/asSortedKeyValues"
import { asSortedKeyValuesSync } from "./_ordered/asSortedKeyValuesSync"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"

/**
 * Ordered Async Enumerable
 */
export class OrderedAsyncEnumerable<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {

    public constructor(private readonly orderedPairs: () => AsyncIterable<T[]>) {
        super(async function *() {
            for await (const orderedPair of orderedPairs()) {
                yield* orderedPair
            }
        })
    }

    public static generateAsync<TSource, TKey>(
        source: AsyncIterable<TSource> | OrderedAsyncEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => AsyncIterable<TSource[]>
        if (source instanceof OrderedAsyncEnumerable) {
            orderedPairs = async function*() {
                for await (const pair of (source as OrderedAsyncEnumerable<TSource>).orderedPairs()) {
                    yield* asAsyncSortedKeyValuesSync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                asAsyncSortedKeyValues(source, keySelector, ascending, comparer)
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
                for await (const pair of (source as OrderedAsyncEnumerable<TSource>).orderedPairs()) {
                    yield* asSortedKeyValuesSync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                asSortedKeyValues(source, keySelector, ascending, comparer)
        }

        return new OrderedAsyncEnumerable(orderedPairs)
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
