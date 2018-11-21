import "core-js/modules/es7.symbol.async-iterator";
import { IParallelEnumerable } from "../parallel/parallel";
import { IAsyncEqualityComparer, IComparer, IEqualityComparer, IGrouping, InferType, ITuple, OfType } from "./../shared/shared";
import { IAsyncEnumerable } from "./IAsyncEnumerable";
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable";
/**
 * Provides static methods that work with IAsyncEnumerable<T> and AsyncIterable<T>
 */
export { aggregate } from "./_private/aggregate";
export { all } from "./_private/all";
export { allAsync } from "./_private/allAsync";
export { any } from "./_private/any";
export { anyAsync } from "./_private/anyAsync";
export { average } from "./_private/average";
export { averageAsync } from "./_private/averageAsync";
export { contains } from "./_private/contains";
export { containsAsync } from "./_private/containsAsync";
export { count } from "./_private/count";
export { countAsync } from "./_private/countAsync";
export { elementAt } from "./_private/elementAt";
export declare function asParallel<TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource>;
export declare function concat<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>): IAsyncEnumerable<TSource>;
export declare function distinct<TSource>(source: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function distinctAsync<TSource>(source: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function elementAtOrDefault<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource | null>;
export declare function empty<TSource>(): IAsyncEnumerable<TSource>;
export declare function enumerateObject<TInput>(source: TInput): IAsyncEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>>;
export declare function except<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function exceptAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export { first } from "./_private/first";
export { firstAsync } from "./_private/firstAsync";
export { firstOrDefault } from "./_private/firstOrDefault";
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync";
export declare function flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>): IAsyncEnumerable<TSource>;
export declare function flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>, shallow: false): IAsyncEnumerable<TSource>;
export declare function flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>, shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>;
/**
 * @throws {InvalidOperationException} No Elements in the Promises Array
 */
export declare function from<TSource>(promises: Array<Promise<TSource>>): IAsyncEnumerable<TSource>;
export declare function from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>;
export declare function fromEvent<K extends keyof HTMLElementEventMap>(element: Element, type: K): IAsyncEnumerable<HTMLElementEventMap[K]>;
export declare function fromEvent(element: Element, type: string): IAsyncEnumerable<Event>;
export declare function each<TSource>(source: AsyncIterable<TSource>, action: (x: TSource) => void): IAsyncEnumerable<TSource>;
export declare function eachAsync<TSource>(source: AsyncIterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource>;
export declare function groupBy<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>;
export declare function groupBy<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>;
export declare function groupBy<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByAsync<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>;
export declare function groupByAsync<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>;
export declare function groupByAsync<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByWithSel<TSource, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>;
export declare function groupByWithSel<TSource, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>;
export declare function groupByWithSel<TSource, TKey, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>;
export declare function join<TOuter, TInner, TKey, TResult>(outer: AsyncIterable<TOuter>, inner: AsyncIterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult): IAsyncEnumerable<TResult>;
export declare function join<TOuter, TInner, TKey, TResult>(outer: AsyncIterable<TOuter>, inner: AsyncIterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>;
export declare function intersect<TSource>(first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function intersectAsync<TSource>(first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function select<TSource, TResult>(source: AsyncIterable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult>;
export declare function select<TSource, TKey extends keyof TSource>(source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
export declare function selectAsync<TSource, TResult>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>;
export declare function selectAsync<TSource extends {
    [key: string]: Promise<any>;
}, TKey extends keyof TSource>(source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
export declare function selectMany<TSource extends {
    [key: string]: Iterable<Y>;
}, Y>(source: AsyncIterable<TSource>, selector: keyof TSource): IAsyncEnumerable<Y>;
export declare function selectMany<TSource, Y>(source: AsyncIterable<TSource>, selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>;
export declare function selectManyAsync<TSource, Y>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<Iterable<Y>>): IAsyncEnumerable<Y>;
export { single } from "./_private/single";
export { singleAsync } from "./_private/singleAsync";
export { singleOrDefault } from "./_private/singleOrDefault";
export declare function singleOrDefaultAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
export declare function skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource>;
export declare function skipWhile<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
export declare function skipWhileAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
export declare function ofType<TSource, TType extends OfType>(source: AsyncIterable<TSource>, type: TType): IAsyncEnumerable<InferType<TType>>;
export declare function orderBy<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
export declare function orderByAsync<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
export declare function orderByDescending<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
export declare function orderByDescendingAsync<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export declare function last<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export declare function lastAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
export declare function lastOrDefault<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
export declare function lastOrDefaultAsync<T>(source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null>;
/**
 * @throws {InvalidOperationException} No Elements
 * @param source Async Iteration of Numbers
 */
export declare function max(source: AsyncIterable<number>): Promise<number>;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function max<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function maxAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
export declare function min(source: AsyncIterable<number>): Promise<number>;
export declare function min<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export declare function minAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export declare function range(start: number, count: number): IAsyncEnumerable<number>;
export declare function repeat<T>(element: T, count: number, delay?: number): IAsyncEnumerable<T>;
export declare function reverse<TSource>(source: AsyncIterable<TSource>): IAsyncEnumerable<TSource>;
export declare function sequenceEquals<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
export declare function sequenceEqualsAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
export declare function sum(source: AsyncIterable<number>): Promise<number>;
export declare function sum<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
export declare function sumAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
export declare function take<TSource>(source: AsyncIterable<TSource>, amount: number): IAsyncEnumerable<TSource>;
export declare function takeWhile<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
export declare function takeWhileAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
export declare function toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]>;
export declare function toMap<K, V>(source: AsyncIterable<V>, selector: (x: V) => K): Promise<Map<K, V[]>>;
export declare function toMapAsync<K, V>(source: AsyncIterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>>;
export declare function toObject<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => string): Promise<{
    [key: string]: TSource;
}>;
export declare function toObjectAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<string>): Promise<{
    [key: string]: TSource;
}>;
export declare function toSet<TSource>(source: AsyncIterable<TSource>): Promise<Set<TSource>>;
export declare function union<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function unionAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
export declare function where<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>;
export declare function where<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
export declare function whereAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource>;
export declare function whereAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
export declare function zip<T, Y>(source: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<ITuple<T, Y>>;
export declare function zip<T, Y, OUT>(source: AsyncIterable<T>, second: AsyncIterable<Y>, resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT>;
export declare function zipAsync<T, Y, OUT>(source: AsyncIterable<T>, second: AsyncIterable<Y>, resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT>;
