import { type IComparer, type IOrderedParallelEnumerable, ParallelGeneratorType } from "../types"
import { asAsyncSortedKeyValues } from "./_ordered/asAsyncSortedKeyValues"
import { asAsyncSortedKeyValuesSync } from "./_ordered/asAsyncSortedKeyValuesSync"
import { asSortedKeyValues } from "./_ordered/asSortedKeyValues"
import { asSortedKeyValuesSync } from "./_ordered/asSortedKeyValuesSync"
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"

/**
 * Ordered Parallel Enumerable
 * @private
 */
export class OrderedParallelEnumerable<T> extends BasicParallelEnumerable<T> implements IOrderedParallelEnumerable<T> {

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
            type: ParallelGeneratorType.PromiseToArray,
        })
    }

    public static generateAsync<TSource, TKey>(
        source: AsyncIterable<TSource> | OrderedParallelEnumerable<TSource>,
        keySelector: (x: TSource) => Promise<TKey>,
        ascending: boolean,
        comparer?: IComparer<TKey>) {
        let orderedPairs: () => AsyncIterable<TSource[]>
        if (source instanceof OrderedParallelEnumerable) {
            orderedPairs = async function*() {
                for await (const pair of (source as OrderedParallelEnumerable<TSource>).orderedPairs()) {
                    yield* asAsyncSortedKeyValuesSync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () => asAsyncSortedKeyValues(source, keySelector, ascending, comparer)
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
                for await (const pair of (source as OrderedParallelEnumerable<TSource>).orderedPairs()) {
                    yield* asSortedKeyValuesSync(pair, keySelector, ascending, comparer)
                }
            }

        } else {
            orderedPairs = () =>
                asSortedKeyValues(source, keySelector, ascending, comparer)
        }

        return new OrderedParallelEnumerable(orderedPairs)
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
