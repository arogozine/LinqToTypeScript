import { IAsyncParallel, IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple } from "../shared/shared"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"

export interface IAsyncEnumerable<TSource> extends IAsyncParallel<TSource> {
    asParallel(): IAsyncParallel<TSource>
    concat(second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>,
    distinct(comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    each(action: (x: TSource) => void): IAsyncEnumerable<TSource>,
    except(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    groupBy(keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
    groupBy(keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
    groupBy<TKey>(
            keySelector: (x: TSource) => TKey,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>,
    groupByWithSel<TElement>(
            keySelector: ((x: TSource) => number),
            elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>
    groupByWithSel<TElement>(
            keySelector: ((x: TSource) => string),
            elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>
    groupByWithSel<TKey, TElement>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>,
    intersect(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    // join in LINQ - but renamed to avoid clash with Array.prototype.join
    joinByKey<TInner, TKey, TResult>(
            inner: IAsyncEnumerable<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>,
    /* tslint:disable:ban-types */
    ofType(type: "object"): IAsyncEnumerable<Object>
    ofType(type: "function"): IAsyncEnumerable<Function>
    ofType(type: "symbol"): IAsyncEnumerable<Symbol>
    /* tslint:enable:ban-types */
    ofType(type: "boolean"): IAsyncEnumerable<boolean>
    ofType(type: "number"): IAsyncEnumerable<number>
    ofType(type: "string"): IAsyncEnumerable<string>
    ofType<TResult>(type: IConstructor<TResult>): IAsyncEnumerable<TResult>,
    orderBy(predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
    orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    orderByDescending(predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
    orderByDescending(predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    orderByDescending(predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    reverse(): IAsyncEnumerable<TSource>,
    select<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>
    select<TKey extends keyof TSource>(key: TKey): IAsyncEnumerable<TSource[TKey]>,
    selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IAsyncEnumerable<OUT>,
    selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
            this: IAsyncEnumerable<TBindedSource>,
            selector: keyof TBindedSource): IAsyncEnumerable<TOut>,
    sequenceEquals(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    skip(count: number): IAsyncEnumerable<TSource>,
    skipWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    take(amount: number): IAsyncEnumerable<TSource>,
    takeWhile(pedicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    union(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    where(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    zip<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>,
    zip<TSecond>(second: AsyncIterable<TSecond>): IAsyncEnumerable<ITuple<TSource, TSecond>>,
}
