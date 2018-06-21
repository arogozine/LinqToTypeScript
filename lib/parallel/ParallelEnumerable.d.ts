import { IAsyncEnumerable } from "../async/async";
import { IAsyncEqualityComparer, IAsyncParallel, IComparer, IEqualityComparer, IGrouping, InferType, ITuple, OfType } from "../shared/shared";
import { BasicParallelEnumerable } from "./BasicParallelEnumerable";
import { IOrderedParallelEnumerable } from "./IOrderedParallelEnumerable";
import { IParallelEnumerable } from "./IParallelEnumerable";
import { ParallelGeneratorType } from "./ParallelGeneratorType";
/**
 * Contains static methods to work with Parallel Async
 */
export declare class ParallelEnumerable {
    private constructor();
    static aggregate<TSource>(source: AsyncIterable<TSource>, func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
    static aggregate<TSource, TAccumulate>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
    static aggregate<TSource, TAccumulate, TResult>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
    private static aggregate_1;
    private static aggregate_2;
    private static aggregate_3;
    static all<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => boolean): Promise<boolean>;
    static allAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    static empty<TSource>(): IParallelEnumerable<TSource>;
    static any<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<boolean>;
    static anyAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    static asAsync<TSource>(source: IParallelEnumerable<TSource>): IAsyncEnumerable<TSource>;
    static average(source: IAsyncParallel<number>): Promise<number>;
    static average<TSource>(source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static average_1;
    private static average_2;
    static averageAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    static concat<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>): IParallelEnumerable<TSource>;
    static contains<TSource>(source: IParallelEnumerable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    static containsAsync<TSource>(source: IParallelEnumerable<TSource>, value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    static count<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<number>;
    private static count_1;
    private static count_2;
    static countAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<number>;
    static distinct<TSource>(source: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    static distinctAsync<TSource>(source: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    static each<TSource>(source: IParallelEnumerable<TSource>, action: (x: TSource) => void): IParallelEnumerable<TSource>;
    static eachAsync<TSource>(source: IParallelEnumerable<TSource>, action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource>;
    static elementAt<TSource>(source: IParallelEnumerable<TSource>, index: number): Promise<TSource>;
    static elementAtOrDefault<TSource>(source: IParallelEnumerable<TSource>, index: number): Promise<TSource | null>;
    static except<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    static exceptAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    static first<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static first_1;
    private static first_2;
    static firstAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    static firstOrDefault<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    private static firstOrDefault_1;
    private static firstOrDefault_2;
    static firstOrDefaultAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    static flatten<TSource>(source: IAsyncParallel<TSource | IAsyncParallel<TSource>>): IParallelEnumerable<TSource>;
    static flatten<TSource>(source: IAsyncParallel<TSource | IAsyncParallel<TSource>>, shallow: false): IParallelEnumerable<TSource>;
    static flatten<TSource>(source: IAsyncParallel<TSource | IAsyncParallel<TSource>>, shallow: true): IParallelEnumerable<TSource | AsyncIterable<TSource>>;
    /**
     * Creates an IParallelEnumerable from a function that returns an Array of Promises
     */
    static from<TSource>(type: ParallelGeneratorType.ArrayOfPromises, generator: () => Array<Promise<TSource>>): IParallelEnumerable<TSource>;
    /**
     * Creates an IParallelEnumerable from a function that returns a Promise of data values
     */
    static from<TSource>(type: ParallelGeneratorType.PromiseToArray, generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>;
    /**
     * Creates an IParallelEnumerable from a function that returns an promise of an array of promises
     */
    static from<TSource>(type: ParallelGeneratorType.PromiseOfPromises, generator: () => Promise<Array<Promise<TSource>>>): IParallelEnumerable<TSource>;
    static groupBy<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>;
    static groupBy<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>;
    static groupBy<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
    private static groupBy_0_Simple;
    private static groupBy_0;
    static groupByAsync<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<number> | number): IParallelEnumerable<IGrouping<number, TSource>>;
    static groupByAsync<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<string> | string): IParallelEnumerable<IGrouping<string, TSource>>;
    static groupByAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
    private static groupByAsync_0_Simple;
    private static groupByAsync_0;
    static groupByWithSel<TSource, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>;
    static groupByWithSel<TSource, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>;
    static groupByWithSel<TSource, TKey, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>;
    private static groupBy_1_Simple;
    private static groupBy_1;
    static join<TOuter, TInner, TKey, TResult>(outer: IAsyncParallel<TOuter>, inner: IAsyncParallel<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult): IParallelEnumerable<TResult>;
    static join<TOuter, TInner, TKey, TResult>(outer: IAsyncParallel<TOuter>, inner: IAsyncParallel<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer: IEqualityComparer<TKey>): IParallelEnumerable<TResult>;
    static intersect<TSource>(first: IParallelEnumerable<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    static intersectAsync<TSource>(first: IParallelEnumerable<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    static min(source: IParallelEnumerable<number>): Promise<number>;
    static min<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
    static last<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static last_1;
    private static last_2;
    static lastAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    static lastOrDefault<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    private static lastOrDefault_1;
    private static lastOrDefault_2;
    static lastOrDefaultAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    static max(source: IParallelEnumerable<number>): Promise<number>;
    static max<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
    static maxAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    static minAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    static select<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => OUT): IParallelEnumerable<OUT>;
    static select<TSource, TKey extends keyof TSource>(source: IParallelEnumerable<TSource>, key: TKey): IParallelEnumerable<TSource[TKey]>;
    static selectAsync<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>;
    static selectAsync<TSource extends {
        [key: string]: Promise<TResult>;
    }, TKey extends keyof TSource, TResult>(source: IParallelEnumerable<TResult>, selector: TKey): IParallelEnumerable<TResult>;
    static selectMany<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>;
    static selectMany<TBindedSource extends {
        [key: string]: Iterable<TOut>;
    }, TOut>(source: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>;
    static selectManyAsync<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<Iterable<OUT>>): IParallelEnumerable<OUT>;
    static ofType<TSource, TType extends OfType>(source: IAsyncParallel<TSource>, type: TType): IParallelEnumerable<InferType<TType>>;
    static orderBy<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
    static orderByAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
    static orderByDescending<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
    static orderByDescendingAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
    static repeat<T>(element: T, count: number, delay?: number): IParallelEnumerable<T>;
    private static repeat_1;
    private static repeat_2;
    static reverse<TSource>(source: IParallelEnumerable<TSource>): IParallelEnumerable<TSource>;
    static sequenceEquals<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    static sequenceEqualsAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains more than one element
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    static single<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static single_1;
    private static single_2;
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    static singleAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    static singleOrDefault<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    private static singleOrDefault_1;
    private static singleOrDefault_2;
    static singleOrDefaultAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    static skip<TSource>(source: IParallelEnumerable<TSource>, count: number): IParallelEnumerable<TSource>;
    static skipWhile<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    static skipWhileAsync<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
    static sum(source: IAsyncParallel<number>): Promise<number>;
    static sum<TSource>(source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static sum_1;
    private static sum_2;
    static sumAsync<TSource>(source: IAsyncParallel<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
    static take<TSource>(source: IParallelEnumerable<TSource>, amount: number): IParallelEnumerable<TSource>;
    static takeWhile<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    static takeWhileAsync<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
    static toArray<TSource>(source: IParallelEnumerable<TSource>): Promise<TSource[]>;
    static toMap<K, V>(source: AsyncIterable<V>, selector: (x: V) => K): Promise<Map<K, V[]>>;
    static toMapAsync<K, V>(source: AsyncIterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>>;
    static toObject<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => string): Promise<{
        [key: string]: TSource;
    }>;
    static toSet<TSource>(source: AsyncIterable<TSource>): Promise<Set<TSource>>;
    static union<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    private static union_1;
    private static union_2;
    static unionAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    static where<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource) => boolean): IParallelEnumerable<TSource>;
    static where<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    static whereAsync<T>(source: IAsyncParallel<T>, predicate: (x: T, index: number) => Promise<boolean>): BasicParallelEnumerable<T>;
    static zip<T, Y>(source: IAsyncParallel<T>, second: IAsyncParallel<Y>): IParallelEnumerable<ITuple<T, Y>>;
    static zip<T, Y, OUT>(source: IAsyncParallel<T>, second: IAsyncParallel<Y>, resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT>;
    private static zip_1;
    private static zip_2;
    static ZipAsync<T, Y, OUT>(source: IAsyncParallel<T>, second: IAsyncParallel<Y>, resultSelector: (x: T, y: Y) => Promise<OUT>): IParallelEnumerable<OUT>;
    private static nextIterationAsync;
    private static nextIteration;
}
