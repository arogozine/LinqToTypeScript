import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable";
import { IParallelEnumerable } from "../parallel/parallel";
import { IComparer, IEqualityComparer, IGrouping, InferType, ITuple, OfType } from "../shared/shared";
import { IAsyncEnumerable } from "./../async/IAsyncEnumerable";
import { IAsyncEqualityComparer } from "./../shared/IAsyncEqualityComparer";
import { BasicEnumerable } from "./BasicEnumerable";
import { IEnumerable } from "./IEnumerable";
import { IOrderedEnumerable } from "./IOrderedEnumerable";
/**
 * Container for all static methods dealing with IEnumerable<T> / Iterable type
 */
export declare class Enumerable {
    static aggregate<TSource>(source: Iterable<TSource>, func: (x: TSource, y: TSource) => TSource): TSource;
    static aggregate<TSource, TAccumulate>(source: Iterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate;
    static aggregate<TSource, TAccumulate, TResult>(source: Iterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): TResult;
    /**
     * @throws {InvalidOperationException} No Elements
     */
    private static aggregate_1<TSource>(source, func);
    private static aggregate_2<TSource, TAccumulate>(source, seed, func);
    private static aggregate_3<TSource, TAccumulate, TResult>(source, seed, func, resultSelector);
    static all<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean;
    static allAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    static any<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): boolean;
    private static any_1<TSource>(source);
    private static any_2<TSource>(source, predicate);
    static anyAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    /**
     * Converts the iterable to an @see {IAsyncEnumerable}
     */
    static asAsync<TSource>(source: Iterable<TSource>): IAsyncEnumerable<TSource>;
    /**
     * Converts an iterable to @see {IAsyncParallel}
     */
    static asParallel<TSource>(source: Iterable<TSource>): IParallelEnumerable<TSource>;
    /**
     * @throws {InvalidOperationException}
     * @param source Iteration of Numbers
     */
    static average(source: Iterable<number>): number;
    /**
     * @throws {InvalidOperationException}
     */
    static average<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
    private static average_1(source);
    private static average_2<TSource>(source, func);
    /**
     * @throws {InvalidOperationException} No Elements
     */
    static averageAsync<TSource>(source: Iterable<TSource>, func: (x: TSource) => Promise<number>): Promise<number>;
    static concat<TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource>;
    static contains<TSource>(source: Iterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): boolean;
    static containsAsync<TSource>(source: Iterable<TSource>, value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    static count<TSource>(source: Iterable<TSource>): number;
    static count<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): number;
    private static count_1<T>(source);
    private static count_2<T>(source, predicate);
    static countAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number>;
    static distinct<TSource>(source: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    static distinctAsync<TSource>(source: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static each<TSource>(source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource>;
    static eachAsync<TSource>(source: Iterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource>;
    /**
     * Returns Element at specified position
     * @throws {ArgumentOutOfRangeException} Index outside of iteration
     * @param source Iteration of Elements
     * @param index Index for Element
     */
    static elementAt<TSource>(source: Iterable<TSource>, index: number): TSource;
    static elementAtOrDefault<TSource>(source: Iterable<TSource>, index: number): TSource | null;
    /**
     * Empty Enumerable
     */
    static empty<TSource>(): IEnumerable<TSource>;
    static enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>>;
    static except<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    static exceptAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    /**
     * @throws {InvalidOperationException} No Elements in Iteration
     */
    static first<TSource>(source: Iterable<TSource>): TSource;
    /**
     * @throws {InvalidOperationException} No elements in Iteration matching predicate
     */
    static first<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource;
    private static first_1<T>(source);
    private static first_2<T>(source, predicate);
    /**
     * @throws {InvalidOperationException} No Matching Elements in Iteration
     * @param source Source Iteration
     * @param predicate Predicate to Select First Element
     */
    static firstAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T>;
    static firstOrDefault<T>(source: Iterable<T>): T | null;
    static firstOrDefault<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null;
    private static firstOrDefault_1<T>(source);
    private static firstOrDefault_2<T>(source, predicate);
    static firstOrDefaultAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null>;
    static flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>): IEnumerable<TSource>;
    static flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>;
    static flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>;
    /**
     * Creates an IEnumerable from an array
     * @param source Array of Elements
     */
    static from<TSource>(source: TSource[]): IEnumerable<TSource>;
    /**
     * Creates an IEnumerable from an iteration of elements
     * @param source Iteration of Elements
     */
    static from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>;
    static groupBy<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>;
    static groupBy<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>;
    static groupBy<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>;
    private static groupBy_0_Simple<TSource>(source, keySelector);
    private static groupBy_0<TSource, TKey>(source, keySelector, comparer);
    static groupByWithSel<TSource, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>;
    static groupByWithSel<TSource, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>;
    static groupByWithSel<TSource, TKey, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>;
    private static groupBy_1_Simple<TSource, TElement>(source, keySelector, elementSelector);
    private static groupBy_1<TSource, TKey, TElement>(source, keySelector, elementSelector, comparer);
    static groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => string, resultSelector: (x: string, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
    static groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => string, resultSelector: (x: string, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<string>): IEnumerable<TResult>;
    static groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
    static groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: number, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<number>): IEnumerable<TResult>;
    static groupByWithResult<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
    static groupByWithResult<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
    private static groupBy_2_Simple<TSource, TResult>(source, keySelector, resultSelector);
    private static groupBy_2<TSource, TKey, TResult>(source, keySelector, resultSelector, comparer?);
    static GroupByWithResultAndSelector<TSource, TKey, TElement, TResult>(source: Iterable<TSource>, keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number), elementSelector: (x: TSource) => TElement, resultSelector: ((key: TKey, values: IEnumerable<TElement>) => TResult) | ((key: string | number, values: IEnumerable<TElement>) => TResult), comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>;
    private static groupBy_3<TSource, TKey, TElement, TResult>(source, keySelector, elementSelector, resultSelector, comparer?);
    private static groupBy_3_Simple<TSource, TElement, TResult>(source, keySelector, elementSelector, resultSelector);
    static join<TOuter, TInner, TKey, TResult>(outer: Iterable<TOuter>, inner: Iterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult): IEnumerable<TResult>;
    static join<TOuter, TInner, TKey, TResult>(outer: Iterable<TOuter>, inner: Iterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
    static intersect<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    static intersectAsync<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static partition<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource[][];
    static partitionAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource[][]>;
    static select<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>;
    static select<TSource, TKey extends keyof TSource>(source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>;
    private static select_1<TSource, TResult>(source, selector);
    private static select_2<TSource, TKey>(source, key);
    static selectAsync<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>;
    static selectAsync<TSource extends {
        [key: string]: Promise<any>;
    }, TKey extends keyof TSource>(source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
    private static selectAsync_1<TSource, TResult>(source, selector);
    private static selectAsync_2<TSource, TKey, TResult>(source, key);
    static selectMany<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult>;
    static selectMany<TSource extends {
        [key: string]: Iterable<TResult>;
    }, TResult>(source: Iterable<TSource>, selector: keyof TSource): IEnumerable<TResult>;
    private static selectMany_1<TSource, TResult>(source, selector);
    static selectMany_2<TSource extends {
        [key: string]: Iterable<TResult>;
    }, TResult>(source: Iterable<TSource>, selector: keyof TSource): BasicEnumerable<TResult>;
    static selectManyAsync<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult>;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains more than one element
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    static single<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource;
    private static single_1<TSource>(source);
    private static single_2<TSource>(source, predicate);
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    static singleAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    /**
     * @throws {InvalidOperationException} More than one element
     */
    static singleOrDefault<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource | null;
    private static singleOrDefault_1<TSource>(source);
    private static singleOrDefault_2<TSource>(source, predicate);
    /**
     * @throws {InvalidOperationException} More than one element matchines predicate
     */
    static singleOrDefaultAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    static skipWhile<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
    private static skipWhile_1<TSource>(source, predicate);
    private static skipWhile_2<TSource>(source, predicate);
    static skipWhileAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
    private static skipWhileAsync_1<TSource>(source, predicate);
    private static skipWhileAsync_2<TSource>(source, predicate);
    static skip<TSource>(source: Iterable<TSource>, count: number): IEnumerable<TSource>;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    static last<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource;
    private static last_1<TSource>(source);
    private static last_2<TSource>(source, predicate);
    /**
     * @throws {InvalidOperationException} No Matching Element
     */
    static lastAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    static lastOrDefault<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource | null;
    private static lastOrDefault_1<TSource>(source);
    private static lastOrDefault_2<TSource>(source, predicate);
    static lastOrDefaultAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    /**
     * @throws {InvalidOperationException} No Elements
     */
    static max(source: Iterable<number>): number;
    /**
     * @throws {InvalidOperationException} No Matching Elements
     */
    static max<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
    private static max_1(source);
    private static max_2<TSource>(source, selector);
    static maxAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    /**
     * @throws {InvalidOperationException} No Elements
     */
    static min(source: Iterable<number>): number;
    /**
     * @throws {InvalidOperationException} No Matching Elements
     */
    static min<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
    private static min_1(source);
    private static min_2<TSource>(source, selector);
    /**
     * @throws {InvalidOperationException} No Matching Elements
     */
    static minAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    static ofType<TSource, TType extends OfType>(source: Iterable<TSource>, type: TType): IEnumerable<InferType<TType>>;
    static orderBy<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>;
    static orderByAsync<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    static orderByDescending<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>;
    static orderByDescendingAsync<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
    static range(start: number, count: number): IEnumerable<number>;
    static repeat<T>(element: T, count: number): IEnumerable<T>;
    /**
     * Reverses an Iterable
     * @param source Iterable
     */
    static reverse<TSource>(source: Iterable<TSource>): IEnumerable<TSource>;
    /**
     * Determines whether or not two sequences are equal
     * @param first first iterable
     * @param second second iterable
     * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
     */
    static sequenceEquals<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): boolean;
    static sequenceEqualsAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    static sum(source: Iterable<number>): number;
    static sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
    private static sum_1(source);
    private static sum_2<TSource>(source, selector);
    static sumAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    static take<T>(source: Iterable<T>, amount: number): IEnumerable<T>;
    static takeWhile<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
    private static takeWhile_1<T>(source, predicate);
    private static takeWhile_2<T>(source, predicate);
    static takeWhileAsync<T>(source: Iterable<T>, predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T>;
    private static takeWhileAsync_1<T>(source, predicate);
    private static takeWhileAsync_2<T>(source, predicate);
    static toArray<TSource>(source: Iterable<TSource>): TSource[];
    static toMap<K, V>(source: Iterable<V>, selector: (x: V) => K): Map<K, V[]>;
    static toMapAsync<K, V>(source: Iterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>>;
    static toObject<TSource>(source: Iterable<TSource>, selector: (x: TSource) => string): {
        [key: string]: TSource;
    };
    static toObjectAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<string>): Promise<{
        [key: string]: TSource;
    }>;
    static toSet<TSource>(source: Iterable<TSource>): Set<TSource>;
    static union<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    private static union_1<TSource>(first, second);
    private static union_2<TSource>(first, second, comparer);
    static unionAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static where<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
    private static where_1<T>(source, predicate);
    private static where_2<T>(source, predicate);
    static whereAsync<T>(source: Iterable<T>, predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T>;
    private static whereAsync_1<T>(source, predicate);
    private static whereAsync_2<T>(source, predicate);
    static zip<T, Y>(source: Iterable<T>, second: Iterable<Y>): IEnumerable<ITuple<T, Y>>;
    static zip<T, Y, OUT>(source: Iterable<T>, second: Iterable<Y>, resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT>;
    private static zip_1<T, Y>(source, second);
    private static zip_2<T, Y, OUT>(source, second, resultSelector);
    static zipAsync<T, Y, OUT>(source: Iterable<T>, second: Iterable<Y>, resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT>;
    private constructor();
}
