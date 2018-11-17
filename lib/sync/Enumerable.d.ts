import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable";
import { IAsyncEqualityComparer, IComparer, IEqualityComparer, ITuple } from "../shared/shared";
import { IAsyncEnumerable } from "./../async/async";
import { IEnumerable } from "./IEnumerable";
import { IOrderedEnumerable } from "./IOrderedEnumerable";
export { aggregate } from "./_private/aggregate";
export { all } from "./_private/all";
export { allAsync } from "./_private/allAsync";
export { any } from "./_private/any";
export { anyAsync } from "./_private/anyAsync";
export { asAsync } from "./_private/asAsync";
export { asParallel } from "./_private/asParallel";
export { average } from "./_private/average";
export { averageAsync } from "./_private/averageAsync";
export { concat } from "./_private/concat";
export { contains } from "./_private/contains";
export { containsAsync } from "./_private/containsAsync";
export { count } from "./_private/count";
export { countAsync } from "./_private/countAsync";
export { distinct } from "./_private/distinct";
export { distinctAsync } from "./_private/distinctAsync";
export { each } from "./_private/each";
export { eachAsync } from "./_private/eachAsync";
export { elementAt } from "./_private/elementAt";
export { elementAtOrDefault } from "./_private/elementAtOrDefault";
export { empty } from "./_private/empty";
export { enumerateObject } from "./_private/enumerateObject";
export { except } from "./_private/except";
export { exceptAsync } from "./_private/exceptAsync";
export { first } from "./_private/first";
export { firstAsync } from "./_private/firstAsync";
export { firstOrDefault } from "./_private/firstOrDefault";
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync";
export { flatten } from "./_private/flatten";
export { from } from "./_private/from";
export { groupBy } from "./_private/groupBy";
export { groupByAsync } from "./_private/groupByAsync";
export { groupByWithSel } from "./_private/groupByWithSel";
export { groupByWithResult } from "./_private/groupByWithResult";
export { GroupByWithResultAndSelector } from "./_private/GroupByWithResultAndSelector";
export { intersect } from "./_private/intersect";
export { intersectAsync } from "./_private/intersectAsync";
export { join } from "./_private/join";
export { last } from "./_private/last";
export { lastAsync } from "./_private/lastAsync";
export { lastOrDefault } from "./_private/lastOrDefault";
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync";
export { max } from "./_private/max";
export { maxAsync } from "./_private/maxAsync";
export { min } from "./_private/min";
export { minAsync } from "./_private/minAsync";
export { ofType } from "./_private/ofType";
export { orderBy } from "./_private/orderBy";
export { partition } from "./_private/partition";
export { partitionAsync } from "./_private/partitionAsync";
export { select } from "./_private/select";
export { selectAsync } from "./_private/selectAsync";
export { selectMany } from "./_private/selectMany";
export { selectManyAsync } from "./_private/selectManyAsync";
export { single } from "./_private/single";
export { singleAsync } from "./_private/singleAsync";
export { singleOrDefault } from "./_private/singleOrDefault";
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync";
export { skip } from "./_private/skip";
export { skipWhile } from "./_private/skipWhile";
export { skipWhileAsync } from "./_private/skipWhileAsync";
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
