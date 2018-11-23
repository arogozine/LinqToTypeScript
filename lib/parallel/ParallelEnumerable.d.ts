import { IAsyncEnumerable, IAsyncEqualityComparer, IAsyncParallel, IComparer, IEqualityComparer, IGrouping, InferType, IOrderedParallelEnumerable, IParallelEnumerable, OfType, ParallelGeneratorType } from "../types";
import { toArray } from "./_private/toArray";
import { BasicParallelEnumerable } from "./BasicParallelEnumerable";
/**
 * Contains static methods to work with Parallel Async
 */
export { aggregate } from "./_private/aggregate";
export { all } from "./_private/all";
export { allAsync } from "./_private//allAsync";
export declare function empty<TSource>(): IParallelEnumerable<TSource>;
export { any } from "./_private/any";
export { anyAsync } from "./_private/anyAsync";
export declare function asAsync<TSource>(source: IParallelEnumerable<TSource>): IAsyncEnumerable<TSource>;
export { average } from "./_private/average";
export { averageAsync } from "./_private/averageAsync";
export declare function concat<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>): IParallelEnumerable<TSource>;
export { contains } from "./_private/contains";
export { containsAsync } from "./_private/containsAsync";
export { count } from "./_private/count";
export { countAsync } from "./_private/countAsync";
export declare function distinct<TSource>(source: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export declare function distinctAsync<TSource>(source: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export declare function each<TSource>(source: IParallelEnumerable<TSource>, action: (x: TSource) => void): IParallelEnumerable<TSource>;
export declare function eachAsync<TSource>(source: IParallelEnumerable<TSource>, action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource>;
export { elementAt } from "./_private/elementAt";
export { elementAtOrDefault } from "./_private/elementAtOrDefault";
export declare function except<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export declare function exceptAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export { first } from "./_private/first";
export { firstAsync } from "./_private/firstAsync";
export { firstOrDefault } from "./_private/firstOrDefault";
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync";
export declare function flatten<TSource>(source: IAsyncParallel<TSource | IAsyncParallel<TSource>>): IParallelEnumerable<TSource>;
export declare function flatten<TSource>(source: IAsyncParallel<TSource | IAsyncParallel<TSource>>, shallow: false): IParallelEnumerable<TSource>;
export declare function flatten<TSource>(source: IAsyncParallel<TSource | IAsyncParallel<TSource>>, shallow: true): IParallelEnumerable<TSource | AsyncIterable<TSource>>;
/**
 * Creates an IParallelEnumerable from a function that returns an Array of Promises
 */
export declare function from<TSource>(type: ParallelGeneratorType.ArrayOfPromises, generator: () => Array<Promise<TSource>>): IParallelEnumerable<TSource>;
/**
 * Creates an IParallelEnumerable from a function that returns a Promise of data values
 */
export declare function from<TSource>(type: ParallelGeneratorType.PromiseToArray, generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>;
/**
 * Creates an IParallelEnumerable from a function that returns an promise of an array of promises
 */
export declare function from<TSource>(type: ParallelGeneratorType.PromiseOfPromises, generator: () => Promise<Array<Promise<TSource>>>): IParallelEnumerable<TSource>;
export declare function groupBy<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>;
export declare function groupBy<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>;
export declare function groupBy<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByAsync<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<number> | number): IParallelEnumerable<IGrouping<number, TSource>>;
export declare function groupByAsync<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<string> | string): IParallelEnumerable<IGrouping<string, TSource>>;
export declare function groupByAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByWithSel<TSource, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>;
export declare function groupByWithSel<TSource, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>;
export declare function groupByWithSel<TSource, TKey, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>;
export declare function join<TOuter, TInner, TKey, TResult>(outer: IAsyncParallel<TOuter>, inner: IAsyncParallel<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult): IParallelEnumerable<TResult>;
export declare function join<TOuter, TInner, TKey, TResult>(outer: IAsyncParallel<TOuter>, inner: IAsyncParallel<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer: IEqualityComparer<TKey>): IParallelEnumerable<TResult>;
export declare function intersect<TSource>(first: IParallelEnumerable<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export declare function intersectAsync<TSource>(first: IParallelEnumerable<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export declare function min(source: IParallelEnumerable<number>): Promise<number>;
export declare function min<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
export { last } from "./_private/last";
export { lastAsync } from "./_private/lastAsync";
export { lastOrDefault } from "./_private/lastOrDefault";
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync";
export declare function max(source: IParallelEnumerable<number>): Promise<number>;
export declare function max<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
export declare function maxAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
export declare function minAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
export declare function select<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => OUT): IParallelEnumerable<OUT>;
export declare function select<TSource, TKey extends keyof TSource>(source: IParallelEnumerable<TSource>, key: TKey): IParallelEnumerable<TSource[TKey]>;
export declare function selectAsync<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>;
export declare function selectAsync<TSource extends {
    [key: string]: Promise<TResult>;
}, TKey extends keyof TSource, TResult>(source: IParallelEnumerable<TResult>, selector: TKey): IParallelEnumerable<TResult>;
export declare function selectMany<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>;
export declare function selectMany<TBindedSource extends {
    [key: string]: Iterable<TOut>;
}, TOut>(source: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>;
export declare function selectManyAsync<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<Iterable<OUT>>): IParallelEnumerable<OUT>;
export declare function ofType<TSource, TType extends OfType>(source: IAsyncParallel<TSource>, type: TType): IParallelEnumerable<InferType<TType>>;
export declare function orderBy<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
export declare function orderByAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
export declare function orderByDescending<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
export declare function orderByDescendingAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export declare function range(start: number, count: number): IParallelEnumerable<number>;
export declare function repeat<T>(element: T, count: number, delay?: number): IParallelEnumerable<T>;
export declare function reverse<TSource>(source: IParallelEnumerable<TSource>): IParallelEnumerable<TSource>;
export { sequenceEquals } from "./_private/sequenceEquals";
export { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync";
export { single } from "./_private/single";
export { singleAsync } from "./_private/singleAsync";
export { singleOrDefault } from "./_private/singleOrDefault";
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync";
export declare function skip<TSource>(source: IParallelEnumerable<TSource>, count: number): IParallelEnumerable<TSource>;
export declare function skipWhile<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
export declare function skipWhileAsync<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
export { sum } from "./_private/sum";
export { sumAsync } from "./_private/sumAsync";
export declare function take<TSource>(source: IParallelEnumerable<TSource>, amount: number): IParallelEnumerable<TSource>;
export declare function takeWhile<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
export declare function takeWhileAsync<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
export { toArray };
export { toMap } from "./_private/toMap";
export { toMapAsync } from "./_private/toMapAsync";
export { toObject } from "./_private/toObject";
export { toSet } from "./_private/toSet";
export declare function union<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export declare function unionAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export declare function where<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource) => boolean): IParallelEnumerable<TSource>;
export declare function where<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
export declare function whereAsync<T>(source: IAsyncParallel<T>, predicate: (x: T, index: number) => Promise<boolean>): BasicParallelEnumerable<T>;
export declare function zip<T, Y>(source: IAsyncParallel<T>, second: IAsyncParallel<Y>): IParallelEnumerable<[T, Y]>;
export declare function zip<T, Y, OUT>(source: IAsyncParallel<T>, second: IAsyncParallel<Y>, resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT>;
export declare function zipAsync<T, Y, OUT>(source: IAsyncParallel<T>, second: IAsyncParallel<Y>, resultSelector: (x: T, y: Y) => Promise<OUT>): IParallelEnumerable<OUT>;
