import { IAsyncParallel, IComparer, IEqualityComparer, IGrouping, InferType, ITuple, OfType } from "../shared/shared"
import { IAsyncEqualityComparer } from "./../shared/IAsyncEqualityComparer"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"

export interface IAsyncEnumerable<TSource> extends IAsyncParallel<TSource> {
    asParallel(): IAsyncParallel<TSource>
    concat(second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>,
    distinct(comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    each(action: (x: TSource) => void): IAsyncEnumerable<TSource>,
    eachAsync(action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource>,
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
            comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>
    ofType<TType extends OfType>(type: TType): IAsyncEnumerable<InferType<TType>>

    orderBy<TKey>(
        predicate: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
    orderByAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
    orderByDescending<TKey>(
        predicate: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
    orderByDescendingAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>

    reverse(): IAsyncEnumerable<TSource>,
    select<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>
    select<TKey extends keyof TSource>(key: TKey): IAsyncEnumerable<TSource[TKey]>,
    selectAsync<OUT>(selector: (x: TSource) => Promise<OUT>): IAsyncEnumerable<OUT>
    selectAsync<TKey extends keyof TSource, TResult>(
                this: IAsyncEnumerable<{ [key: string]: Promise<TResult> }>,
                key: TKey): IAsyncEnumerable<TSource[TKey]>,
    selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IAsyncEnumerable<OUT>,
    selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
            this: IAsyncEnumerable<TBindedSource>,
            selector: keyof TBindedSource): IAsyncEnumerable<TOut>,
    selectManyAsync<OUT>(selector: (x: TSource) => Promise<Iterable<OUT>>): IAsyncEnumerable<OUT>,
    sequenceEquals(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    skip(count: number): IAsyncEnumerable<TSource>,
    skipWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>,
    take(amount: number): IAsyncEnumerable<TSource>,
    takeWhile(pedicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    takeWhileAsync(pedicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>
    union(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    unionAsync(second: AsyncIterable<TSource>, comparer?: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    where(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>
    zip<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>,
    zip<TSecond>(second: AsyncIterable<TSecond>): IAsyncEnumerable<ITuple<TSource, TSecond>>,
    zipAsync<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult>,
}
