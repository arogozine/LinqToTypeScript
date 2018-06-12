import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable";
import { IParallelEnumerable } from "../parallel/parallel";
import { IAsyncEnumerable } from "./../async/async";
import { IAsyncEqualityComparer, IComparer, IEqualityComparer, IGrouping, InferType, ITuple, OfType } from "./../shared/shared";
import { IOrderedEnumerable } from "./IOrderedEnumerable";
export interface IEnumerable<TSource> extends Iterable<TSource> {
    aggregate(func: (x: TSource, y: TSource) => TSource): TSource;
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate;
    aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): TResult;
    all(predicate: (x: TSource) => boolean): boolean;
    allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    any(predicate?: (x: TSource) => boolean): boolean;
    anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    asAsync(): IAsyncEnumerable<TSource>;
    asParallel(): IParallelEnumerable<TSource>;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    average(this: IEnumerable<number>): number;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    average(selector: (x: TSource) => number): number;
    averageAsync(selector: (x: TSource) => Promise<number>): Promise<number>;
    concat(second: IEnumerable<TSource>): IEnumerable<TSource>;
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): boolean;
    containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    count(predicate?: (x: TSource) => boolean): number;
    countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number>;
    distinct(comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    /**
     * @throws {ArgumentOutOfRangeException}
     */
    elementAt(index: number): TSource;
    elementAtOrDefault(index: number): TSource | null;
    except(second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    exceptAsync(second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    first(predicate?: (x: TSource) => boolean): TSource;
    /**
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    firstOrDefault(predicate?: (x: TSource) => boolean): TSource | null;
    firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    each(action: (x: TSource) => void): IEnumerable<TSource>;
    eachAsync(action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource>;
    groupBy(keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>;
    groupBy(keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>;
    groupBy<TKey>(keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>;
    groupByAsync(keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>;
    groupByAsync(keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>;
    groupByAsync<TKey>(keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
    groupByWithSel<TElement>(keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>;
    groupByWithSel<TElement>(keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>;
    groupByWithSel<TKey, TElement>(keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>;
    intersect(second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    intersectAsync(second: IEnumerable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    joinByKey<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (x: TSource) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    last(predicate?: (x: TSource) => boolean): TSource;
    /**
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    lastOrDefault(predicate?: (x: TSource) => boolean): TSource | null;
    lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @param this Iteration of Numbers
     */
    max(this: IEnumerable<number>): number;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    max(selector: (x: TSource) => number): number;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    maxAsync(selector: (x: TSource) => Promise<number>): Promise<number>;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    min(this: IEnumerable<number>): number;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    min(selector: (x: TSource) => number): number;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    minAsync(selector: (x: TSource) => Promise<number>): Promise<number>;
    ofType<T extends OfType>(type: T): IEnumerable<InferType<T>>;
    orderBy<TKey>(predicate: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>;
    orderByAsync<TKey>(predicate: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    orderByDescending<TKey>(predicate: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>;
    orderByDescendingAsync<TKey>(predicate: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    reverse(): IEnumerable<TSource>;
    select<OUT>(selector: (x: TSource) => OUT): IEnumerable<OUT>;
    select<TKey extends keyof TSource>(key: TKey): IEnumerable<TSource[TKey]>;
    selectAsync<OUT>(selector: (x: TSource) => Promise<OUT>): IAsyncEnumerable<OUT>;
    selectAsync<TKey extends keyof TSource, TResult>(this: IEnumerable<{
        [key: string]: Promise<TResult>;
    }>, key: TKey): IAsyncEnumerable<TResult>;
    selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IEnumerable<OUT>;
    selectMany<TBindedSource extends {
        [key: string]: Iterable<TOut>;
    }, TOut>(this: IEnumerable<TBindedSource>, selector: keyof TBindedSource): IEnumerable<TOut>;
    selectManyAsync<TOut>(selector: (x: TSource) => Promise<Iterable<TOut>>): IAsyncEnumerable<TOut>;
    sequenceEquals(second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): boolean;
    sequenceEqualsAsync(second: IEnumerable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    /**
     * @throws {InvalidOperationException} Sequence contains more than one element
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching element
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    single(predicate?: (x: TSource) => boolean): TSource;
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     */
    singleOrDefault(predicate?: (x: TSource) => boolean): TSource | null;
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     */
    singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    skip(count: number): IEnumerable<TSource>;
    skipWhile(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
    skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
    sum(this: IEnumerable<number>): number;
    sum(selector: (x: TSource) => number): number;
    sumAsync(selector: (x: TSource) => Promise<number>): Promise<number>;
    take(amount: number): IEnumerable<TSource>;
    takeWhile(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
    takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
    toArray(): TSource[];
    toMap<TKey>(selector: (x: TSource) => TKey): Map<TKey, TSource[]>;
    toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>>;
    toSet(): Set<TSource>;
    union(second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    unionAsync(second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    where(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
    whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
    zip<TSecond>(second: Iterable<TSecond>): IEnumerable<ITuple<TSource, TSecond>>;
    zip<TSecond, TResult>(second: Iterable<TSecond>, resultSelector: (x: TSource, y: TSecond) => TResult): IEnumerable<TResult>;
    zipAsync<TSecond, TResult>(second: Iterable<TSecond>, resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult>;
    [Symbol.iterator](): IterableIterator<TSource>;
}
