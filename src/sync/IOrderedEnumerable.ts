// import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
import { IComparer } from "../shared/shared"
import { IEnumerable } from "./IEnumerable"

export interface IOrderedEnumerable<TSource> extends IEnumerable<TSource> {
    thenBy: {
        (keySelector: (x: TSource) => string | number): IOrderedEnumerable<TSource>
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedEnumerable<TSource>
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedEnumerable<TSource>,
    }
    /*
    thenByAsync: {
        (keySelector: (x: TSource) => Promise<string | number>): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    }*/
    thenByDescending: {
        (keySelector: (x: TSource) => string | number): IOrderedEnumerable<TSource>
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedEnumerable<TSource>
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedEnumerable<TSource>,
    }/*
    thenByDescendingAsync: {
        (keySelector: (x: TSource) => Promise<string | number>): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => Promise<number>, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => Promise<string>, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    }*/
}
