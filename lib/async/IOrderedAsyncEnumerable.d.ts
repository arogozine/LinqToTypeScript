import { IComparer, RecOrdMap } from "../shared/shared";
import { IAsyncEnumerable } from "./IAsyncEnumerable";
export interface IOrderedAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {
    thenBy: {
        (keySelector: (x: TSource) => string | number): IOrderedAsyncEnumerable<TSource>;
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    };
    thenByDescending: {
        (keySelector: (x: TSource) => string | number): IOrderedAsyncEnumerable<TSource>;
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    };
    getMap: {
        (): Promise<RecOrdMap<TSource>>;
    };
}
