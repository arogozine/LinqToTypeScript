import { IComparer, RecOrdMap } from "../shared/shared"
import { IEnumerable } from "./IEnumerable"

export interface IOrderedEnumerable<TSource> extends IEnumerable<TSource> {
    thenBy: {
        (keySelector: (x: TSource) => string | number): IOrderedEnumerable<TSource>
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedEnumerable<TSource>
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedEnumerable<TSource>,
    }
    thenByDescending: {
        (keySelector: (x: TSource) => string | number): IOrderedEnumerable<TSource>
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedEnumerable<TSource>
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedEnumerable<TSource>,
    }
    getMap: {
        (): RecOrdMap<TSource>,
    }
}
