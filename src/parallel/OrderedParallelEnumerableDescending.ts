import {
    IComparer,
    RecOrdMap,
} from "../shared/shared"
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"
import { DataType } from "./DataType"
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable"
import { ParallelEnumerable } from "./ParallelEnumerable"
import { TypedData } from "./TypedData"

export class OrderedParallelEnumerableDescending<T> extends BasicParallelEnumerable<T>
    implements IOrderedParallelEnumerable<T> {
    private static async unrollAndSort<T>(
        mapPromise: Promise<RecOrdMap<T>> | RecOrdMap<T>,
        comparer?: IComparer<string | number>): Promise<T[]> {

        const map = await mapPromise

        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

        const returnValues = new Array<T>()
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i]
            const values = map.get(key)

            if (values instanceof Map) {
                for (const value of await OrderedParallelEnumerableDescending.unrollAndSort(values, comparer)) {
                    returnValues.push(value as any)
                }
            } else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values as T[]) {
                    returnValues.push(value)
                }
            }
        }
        return returnValues
    }

    private static generate<T>(
        mapFunc: () => Promise<RecOrdMap<T>>,
        comparer?: IComparer<number | string>): TypedData<T> {
        const generator = () => OrderedParallelEnumerableDescending.unrollAndSort(mapFunc(), comparer)
        return {
            type: DataType.PromiseToArray,
            generator,
        }
    }

    constructor(private readonly map: () => Promise<RecOrdMap<T>>, comparer?: IComparer<number | string>) {
        super(OrderedParallelEnumerableDescending.generate(map, comparer))
    }

    public getMap(): Promise<RecOrdMap<T>> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<T>
    public thenBy(keySelector: any, comparer?: any): IOrderedParallelEnumerable<T> {
        return ParallelEnumerable.thenBy(this, keySelector, comparer)
    }

    public thenByAsync(
        keySelector: (x: T) => Promise<string | number>): IOrderedParallelEnumerable<T>
    public thenByAsync(
        keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedParallelEnumerable<T>
    public thenByAsync(
        keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedParallelEnumerable<T>
    public thenByAsync(
        keySelector: any, comparer?: any): IOrderedParallelEnumerable<T> {
        return ParallelEnumerable.thenByAsync(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedParallelEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any): IOrderedParallelEnumerable<T> {
        return ParallelEnumerable.thenByDescending(this, keySelector, comparer)
    }

    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<string | number>): IOrderedParallelEnumerable<T>
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<number>, comparer: IComparer<number>): IOrderedParallelEnumerable<T>
    public thenByDescendingAsync(
        keySelector: (x: T) => Promise<string>, comparer: IComparer<string>): IOrderedParallelEnumerable<T>
    public thenByDescendingAsync(
        keySelector: any, comparer?: any): IOrderedParallelEnumerable<T> {
        return ParallelEnumerable.thenByDescendingAsync(this, keySelector, comparer)
    }

}
