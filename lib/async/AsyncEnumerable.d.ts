import "core-js/modules/es7.symbol.async-iterator";
import { IParallelEnumerable } from "../parallel/parallel";
import { IAsyncEqualityComparer } from "./../shared/IAsyncEqualityComparer";
import { IComparer, IEqualityComparer, IGrouping, InferType, ITuple, OfType } from "./../shared/shared";
import { IAsyncEnumerable } from "./IAsyncEnumerable";
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable";
/**
 * Provides static methods that work with IAsyncEnumerable<T> and AsyncIterable<T>
 */
export declare class AsyncEnumerable {
    static aggregate<TSource>(source: AsyncIterable<TSource>, func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
    static aggregate<TSource, TAccumulate>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
    static aggregate<TSource, TAccumulate, TResult>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
    private static aggregate_1<TSource>(source, func);
    private static aggregate_2<TSource, TAccumulate>(source, seed, func);
    private static aggregate_3<TSource, TAccumulate, TResult>(source, seed, func, resultSelector);
    static all<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<boolean>;
    static allAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    static any<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<boolean>;
    private static any_1<TSource>(source);
    private static any_2<TSource>(source, predicate);
    static anyAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    static average(source: AsyncIterable<number>): Promise<number>;
    static average<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static average_1(source);
    private static average_2<TSource>(source, func);
    static asParallel<TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource>;
    static averageAsync<TSource>(source: AsyncIterable<TSource>, func: (x: TSource) => Promise<number>): Promise<number>;
    static concat<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>): IAsyncEnumerable<TSource>;
    static contains<TSource>(source: AsyncIterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    static containsAsync<TSource>(source: AsyncIterable<TSource>, value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    static count<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<number>;
    private static count_1<T>(source);
    private static count_2<T>(source, predicate);
    static countAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number>;
    static distinct<TSource>(source: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static distinctAsync<TSource>(source: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    /**
     * @throws {ArgumentOutOfRangeException}
     */
    static elementAt<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource>;
    static elementAtOrDefault<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource | null>;
    static empty<TSource>(): IAsyncEnumerable<TSource>;
    static enumerateObject<TInput>(source: TInput): IAsyncEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>>;
    static except<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static exceptAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    /**
     * @throws {InvalidOperationException} There are no elements
     */
    static first<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static first_1<T>(source);
    private static first_2<T>(source, predicate);
    /**
     * @throws {InvalidOperationException} There are no elements matching predicate
     */
    static firstAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T>;
    static firstOrDefault<T>(source: AsyncIterable<T>, predicate?: (x: T) => boolean): Promise<T | null>;
    private static firstOrDefault_1<T>(source);
    private static firstOrDefault_2<T>(source, predicate);
    static firstOrDefaultAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null>;
    static flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>): IAsyncEnumerable<TSource>;
    static flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>, shallow: false): IAsyncEnumerable<TSource>;
    static flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>, shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>;
    /**
     * @throws {InvalidOperationException} No Elements in the Promises Array
     */
    static from<TSource>(promises: Array<Promise<TSource>>): IAsyncEnumerable<TSource>;
    static from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>;
    static fromEvent<K extends keyof HTMLElementEventMap>(element: Element, type: K): IAsyncEnumerable<HTMLElementEventMap[K]>;
    static fromEvent(element: Element, type: string): IAsyncEnumerable<Event>;
    static each<TSource>(source: AsyncIterable<TSource>, action: (x: TSource) => void): IAsyncEnumerable<TSource>;
    static eachAsync<TSource>(source: AsyncIterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource>;
    static groupBy<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>;
    static groupBy<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>;
    static groupBy<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
    private static groupBy_0_Simple<TSource>(source, keySelector);
    private static groupBy_0<TSource, TKey>(source, keySelector, comparer);
    static groupByAsync<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>;
    static groupByAsync<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>;
    static groupByAsync<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
    private static groupByAsync_0_Simple<TSource>(source, keySelector);
    private static groupByAsync_0<TSource, TKey>(source, keySelector, comparer);
    static groupByWithSel<TSource, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>;
    static groupByWithSel<TSource, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>;
    static groupByWithSel<TSource, TKey, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>;
    private static groupBy_1_Simple<TSource, TElement>(source, keySelector, elementSelector);
    private static groupBy_1<TSource, TKey, TElement>(source, keySelector, elementSelector, comparer);
    static join<TOuter, TInner, TKey, TResult>(outer: AsyncIterable<TOuter>, inner: AsyncIterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult): IAsyncEnumerable<TResult>;
    static join<TOuter, TInner, TKey, TResult>(outer: AsyncIterable<TOuter>, inner: AsyncIterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>;
    static intersect<TSource>(first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static intersectAsync<TSource>(first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static select<TSource, TResult>(source: AsyncIterable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult>;
    static select<TSource, TKey extends keyof TSource>(source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
    private static select_1<TSource, TResult>(source, selector);
    private static select_2<TSource, TKey>(source, key);
    static selectAsync<TSource, TResult>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>;
    static selectAsync<TSource extends {
        [key: string]: Promise<any>;
    }, TKey extends keyof TSource>(source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
    private static selectAsync_1<TSource, TResult>(source, selector);
    private static selectAsync_2<TSource, TKey, TResult>(source, key);
    static selectMany<TSource extends {
        [key: string]: Iterable<Y>;
    }, Y>(source: AsyncIterable<TSource>, selector: keyof TSource): IAsyncEnumerable<Y>;
    static selectMany<TSource, Y>(source: AsyncIterable<TSource>, selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>;
    private static selectMany_1<TSource, Y>(source, selector);
    private static selectMany_2<TSource, Y>(source, selector);
    static selectManyAsync<TSource, Y>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<Iterable<Y>>): IAsyncEnumerable<Y>;
    /**
     * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
     */
    static single<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static single_1<TSource>(source);
    private static single_2<TSource>(source, predicate);
    /**
     * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
     */
    static singleAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    static singleOrDefault<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    private static singleOrDefault_1<TSource>(source);
    private static singleOrDefault_2<TSource>(source, predicate);
    static singleOrDefaultAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    static skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource>;
    static skipWhile<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    private static skipWhile_1<TSource>(source, predicate);
    private static skipWhile_2<TSource>(source, predicate);
    static skipWhileAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
    private static skipWhileAsync_1<TSource>(source, predicate);
    private static skipWhileAsync_2<TSource>(source, predicate);
    static ofType<TSource, TType extends OfType>(source: AsyncIterable<TSource>, type: TType): IAsyncEnumerable<InferType<TType>>;
    static orderBy<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    static orderByAsync<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    static orderByDescending<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    static orderByDescendingAsync<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    /**
     * @throws {InvalidOperationException} No Elements / No Match
     */
    static last<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static last_1<T>(source);
    private static last_2<TSource>(source, predicate);
    /**
     * @throws {InvalidOperationException} No Elements / No Match
     */
    static lastAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    static lastOrDefault<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    private static lastOrDefault_1<T>(source);
    private static lastOrDefault_2<T>(source, predicate);
    static lastOrDefaultAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null>;
    /**
     * @throws {InvalidOperationException} No Elements
     * @param source Async Iteration of Numbers
     */
    static max(source: AsyncIterable<number>): Promise<number>;
    /**
     * @throws {InvalidOperationException} No Matching Elements
     */
    static max<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static max_1(source);
    private static max_2<TSource>(source, selector);
    /**
     * @throws {InvalidOperationException} No Matching Elements
     */
    static maxAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    static min(source: AsyncIterable<number>): Promise<number>;
    static min<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static min_1(source);
    private static min_2(source, selector);
    /**
     * @throws {InvalidOperationException} No Matching Elements
     */
    static minAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    /**
     * Generates a sequence of integral numbers within a specified range.
     * @param start The value of the first integer in the sequence.
     * @param count The number of sequential integers to generate.
     * @throws {ArgumentOutOfRangeException} Start is Less than 0
     */
    static range(start: number, count: number): IAsyncEnumerable<number>;
    static repeat<T>(element: T, count: number, delay?: number): IAsyncEnumerable<T>;
    private static repeat_1<T>(element, count);
    private static repeat_2<T>(element, count, delay);
    static reverse<TSource>(source: AsyncIterable<TSource>): IAsyncEnumerable<TSource>;
    static sequenceEquals<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    static sequenceEqualsAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    static sum(source: AsyncIterable<number>): Promise<number>;
    static sum<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static sum_1(source);
    private static sum_2<TSource>(source, selector);
    static sumAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    static take<TSource>(source: AsyncIterable<TSource>, amount: number): IAsyncEnumerable<TSource>;
    static takeWhile<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    private static takeWhile_1<T>(source, predicate);
    private static takeWhile_2<T>(source, predicate);
    static takeWhileAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
    private static takeWhileAsync_1<T>(source, predicate);
    private static takeWhileAsync_2<T>(source, predicate);
    static toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]>;
    static toMap<K, V>(source: AsyncIterable<V>, selector: (x: V) => K): Promise<Map<K, V[]>>;
    static toMapAsync<K, V>(source: AsyncIterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>>;
    static toObject<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => string): Promise<{
        [key: string]: TSource;
    }>;
    static toObjectAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<string>): Promise<{
        [key: string]: TSource;
    }>;
    static toSet<TSource>(source: AsyncIterable<TSource>): Promise<Set<TSource>>;
    static union<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    private static union_1<TSource>(first, second);
    private static union_2<TSource>(first, second, comparer);
    static unionAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static where<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>;
    static where<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    private static where_1<T>(source, predicate);
    private static where_2<T>(source, predicate);
    static whereAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource>;
    static whereAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
    private static whereAsync_1<T>(source, predicate);
    private static whereAsync_2<T>(source, predicate);
    static zip<T, Y>(source: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<ITuple<T, Y>>;
    static zip<T, Y, OUT>(source: AsyncIterable<T>, second: AsyncIterable<Y>, resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT>;
    private static zip_1<T, Y>(source, second);
    private static zip_2<T, Y, OUT>(source, second, resultSelector);
    static zipAsync<T, Y, OUT>(source: AsyncIterable<T>, second: AsyncIterable<Y>, resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT>;
    private constructor();
}
