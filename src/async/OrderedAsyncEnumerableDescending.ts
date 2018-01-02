import { IComparer, RecOrdMap } from "../shared/shared"
import { AsyncEnumerable } from "./AsyncEnumerable"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"

export class OrderedAsyncEnumerableDescending<T> extends BasicAsyncEnumerable<T> implements IOrderedAsyncEnumerable<T> {
    private static async *unrollAndSort<T>(
        mapPromise: Promise<RecOrdMap<T>> | RecOrdMap<T>,
        comparer?: IComparer<string | number>): AsyncIterableIterator<T> {

        const map = await mapPromise

        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i]
            const values = map.get(key)

            if (values instanceof Map) {
                yield* OrderedAsyncEnumerableDescending.unrollAndSort(values as RecOrdMap<T>, comparer)
            } else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values as T[]) {
                    yield value
                }
            }
        }
    }

    private static generate<T>(
        mapFunc: () => Promise<RecOrdMap<T>>,
        comparer?: IComparer<number | string>): () => AsyncIterableIterator<T> {
        return () => OrderedAsyncEnumerableDescending.unrollAndSort(mapFunc(), comparer)
    }

    constructor(private readonly map: () => Promise<RecOrdMap<T>>, comparer?: IComparer<number | string>) {
        super(OrderedAsyncEnumerableDescending.generate(map, comparer))
    }

    public getMap(): Promise<RecOrdMap<T>> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenBy(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenBy(this, keySelector, comparer)
    }

    public thenByAsync(keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByAsync(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenByAsync(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any): IOrderedAsyncEnumerable<T> {
        return AsyncEnumerable.thenByDescending(this, keySelector, comparer)
    }

    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<string | number>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<T>
    public thenByDescendingAsync(keySelector: any, comparer?: any) {
        return AsyncEnumerable.thenByDescendingAsync(this, keySelector, comparer)
    }
}
