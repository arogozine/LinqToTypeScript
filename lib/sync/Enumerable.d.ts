import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable";
import { IParallelEnumerable } from "../parallel/parallel";
import { IAsyncEqualityComparer, IComparer, IEqualityComparer, IGrouping, InferType, ITuple, OfType } from "../shared/shared";
import { IAsyncEnumerable } from "./../async/IAsyncEnumerable";
import { BasicEnumerable } from "./BasicEnumerable";
import { IEnumerable } from "./IEnumerable";
import { IOrderedEnumerable } from "./IOrderedEnumerable";
export declare function aggregate<TSource>(source: Iterable<TSource>, func: (x: TSource, y: TSource) => TSource): TSource;
export declare function aggregate<TSource, TAccumulate>(source: Iterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate;
export declare function aggregate<TSource, TAccumulate, TResult>(source: Iterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): TResult;
export declare function all<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean;
export declare function allAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
export declare function any<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): boolean;
export declare function anyAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
/**
 * Converts the iterable to an @see {IAsyncEnumerable}
 */
export declare function asAsync<TSource>(source: Iterable<TSource>): IAsyncEnumerable<TSource>;
/**
 * Converts an iterable to @see {IAsyncParallel}
 */
export declare function asParallel<TSource>(source: Iterable<TSource>): IParallelEnumerable<TSource>;
/**
 * @throws {InvalidOperationException}
 * @param source Iteration of Numbers
 */
export declare function average(source: Iterable<number>): number;
/**
 * @throws {InvalidOperationException}
 */
export declare function average<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
/**
 * @throws {InvalidOperationException} No Elements
 */
export declare function averageAsync<TSource>(source: Iterable<TSource>, func: (x: TSource) => Promise<number>): Promise<number>;
export declare function concat<TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource>;
export declare function contains<TSource>(source: Iterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): boolean;
export declare function containsAsync<TSource>(source: Iterable<TSource>, value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
export declare function count<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): number;
export declare function countAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number>;
export declare function distinct<TSource>(source: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
export declare function distinctAsync<TSource>(source: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function each<TSource>(source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource>;
export declare function eachAsync<TSource>(source: Iterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource>;
/**
 * Returns Element at specified position
 * @throws {ArgumentOutOfRangeException} Index outside of iteration
 * @param source Iteration of Elements
 * @param index Index for Element
 */
export declare function elementAt<TSource>(source: Iterable<TSource>, index: number): TSource;
export declare function elementAtOrDefault<TSource>(source: Iterable<TSource>, index: number): TSource | null;
/**
 * Empty Enumerable
 */
export declare function empty<TSource>(): IEnumerable<TSource>;
export declare function enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>>;
export declare function except<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
export declare function exceptAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
/**
 * @throws {InvalidOperationException} No Elements in Iteration
 */
export declare function first<TSource>(source: Iterable<TSource>): TSource;
/**
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
export declare function first<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource;
/**
 * @throws {InvalidOperationException} No Matching Elements in Iteration
 * @param source Source Iteration
 * @param predicate Predicate to Select First Element
 */
export declare function firstAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T>;
export declare function firstOrDefault<T>(source: Iterable<T>): T | null;
export declare function firstOrDefault<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null;
export declare function firstOrDefaultAsync<T>(source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null>;
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>): IEnumerable<TSource>;
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>;
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>;
/**
 * Creates an IEnumerable from an array
 * @param source Array of Elements
 */
export declare function from<TSource>(source: TSource[]): IEnumerable<TSource>;
/**
 * Creates an IEnumerable from an iteration of elements
 * @param source Iteration of Elements
 */
export declare function from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>;
export declare function groupBy<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>;
export declare function groupBy<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>;
export declare function groupBy<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByWithSel<TSource, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>;
export declare function groupByWithSel<TSource, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>;
export declare function groupByWithSel<TSource, TKey, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>;
export declare function groupByAsync<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>;
export declare function groupByAsync<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>;
export declare function groupByAsync<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => string, resultSelector: (x: string, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => string, resultSelector: (x: string, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<string>): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: number, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<number>): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
export declare function GroupByWithResultAndSelector<TSource, TKey, TElement, TResult>(source: Iterable<TSource>, keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number), elementSelector: (x: TSource) => TElement, resultSelector: ((key: TKey, values: IEnumerable<TElement>) => TResult) | ((key: string | number, values: IEnumerable<TElement>) => TResult), comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>;
export declare function join<TOuter, TInner, TKey, TResult>(outer: Iterable<TOuter>, inner: Iterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult): IEnumerable<TResult>;
export declare function join<TOuter, TInner, TKey, TResult>(outer: Iterable<TOuter>, inner: Iterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
export declare function intersect<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
export declare function intersectAsync<TSource>(first: IEnumerable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function partition<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource[][];
export declare function partitionAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource[][]>;
export declare function select<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>;
export declare function select<TSource, TKey extends keyof TSource>(source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>;
export declare function selectAsync<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>;
export declare function selectAsync<TSource extends {
    [key: string]: Promise<any>;
}, TKey extends keyof TSource>(source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
export declare function selectMany<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult>;
export declare function selectMany<TSource extends {
    [key: string]: Iterable<TResult>;
}, TResult>(source: Iterable<TSource>, selector: keyof TSource): IEnumerable<TResult>;
export declare function selectMany_2<TSource extends {
    [key: string]: Iterable<TResult>;
}, TResult>(source: Iterable<TSource>, selector: keyof TSource): BasicEnumerable<TResult>;
export declare function selectManyAsync<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult>;
/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains more than one element
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export declare function single<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource;
/**
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export declare function singleAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
/**
 * @throws {InvalidOperationException} More than one element
 */
export declare function singleOrDefault<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource | null;
/**
 * @throws {InvalidOperationException} More than one element matchines predicate
 */
export declare function singleOrDefaultAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
export declare function skipWhile<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
export declare function skipWhileAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
export declare function skip<TSource>(source: Iterable<TSource>, count: number): IEnumerable<TSource>;
/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains no matching element
 */
export declare function last<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource;
/**
 * @throws {InvalidOperationException} No Matching Element
 */
export declare function lastAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
export declare function lastOrDefault<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource | null;
export declare function lastOrDefaultAsync<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
/**
 * @throws {InvalidOperationException} No Elements
 */
export declare function max(source: Iterable<number>): number;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function max<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
export declare function maxAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
/**
 * @throws {InvalidOperationException} No Elements
 */
export declare function min(source: Iterable<number>): number;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function min<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function minAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
export declare function ofType<TSource, TType extends OfType>(source: Iterable<TSource>, type: TType): IEnumerable<InferType<TType>>;
export declare function orderBy<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>;
export declare function orderByAsync<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
export declare function orderByDescending<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource>;
export declare function orderByDescendingAsync<TSource, TKey>(source: IEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export declare function range(start: number, count: number): IEnumerable<number>;
export declare function repeat<T>(element: T, count: number): IEnumerable<T>;
/**
 * Reverses an Iterable
 * @param source Iterable
 */
export declare function reverse<TSource>(source: Iterable<TSource>): IEnumerable<TSource>;
/**
 * Determines whether or not two sequences are equal
 * @param first first iterable
 * @param second second iterable
 * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
 */
export declare function sequenceEquals<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): boolean;
export declare function sequenceEqualsAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
export declare function sum(source: Iterable<number>): number;
export declare function sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
export declare function sumAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
export declare function take<T>(source: Iterable<T>, amount: number): IEnumerable<T>;
export declare function takeWhile<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
export declare function takeWhileAsync<T>(source: Iterable<T>, predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T>;
export declare function toArray<TSource>(source: Iterable<TSource>): TSource[];
export declare function toMap<K, V>(source: Iterable<V>, selector: (x: V) => K): Map<K, V[]>;
export declare function toMapAsync<K, V>(source: Iterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>>;
export declare function toObject<TSource>(source: Iterable<TSource>, selector: (x: TSource) => string): {
    [key: string]: TSource;
};
export declare function toObjectAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<string>): Promise<{
    [key: string]: TSource;
}>;
export declare function toSet<TSource>(source: Iterable<TSource>): Set<TSource>;
export declare function union<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
export declare function unionAsync<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function where<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
export declare function whereAsync<T>(source: Iterable<T>, predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T>;
export declare function zip<T, Y>(source: Iterable<T>, second: Iterable<Y>): IEnumerable<ITuple<T, Y>>;
export declare function zip<T, Y, OUT>(source: Iterable<T>, second: Iterable<Y>, resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT>;
export declare function zipAsync<T, Y, OUT>(source: Iterable<T>, second: Iterable<Y>, resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT>;
