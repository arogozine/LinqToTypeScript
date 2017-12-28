import { IComparer, RecOrdMap } from "../shared/shared"
import { BasicEnumerable } from "./BasicEnumerable"
import { Enumerable } from "./Enumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"

export class OrderedEnumerableDescending<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {

    private static *unrollAndSort<T>(
        map: RecOrdMap<T>,
        comparer?: IComparer<string | number>): IterableIterator<T> {

        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i]
            const values = map.get(key)

            if (values instanceof Map) {
                yield* OrderedEnumerableDescending.unrollAndSort(values as RecOrdMap<T>, comparer)
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
        mapFunc: () => RecOrdMap<T>,
        comparer?: IComparer<number | string>): () => IterableIterator<T> {
        return () => OrderedEnumerableDescending.unrollAndSort(mapFunc(), comparer)
    }

    constructor(private readonly map: () => RecOrdMap<T>, comparer?: IComparer<number | string>) {
        super(OrderedEnumerableDescending.generate(map, comparer))
    }

    public getMap(): RecOrdMap<T> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public thenBy(keySelector: any, comparer?: any) {
        return Enumerable.thenBy(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any) {
        return Enumerable.thenByDescending(this, keySelector, comparer)
    }
}
