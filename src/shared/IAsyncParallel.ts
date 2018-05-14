import { IAsyncEqualityComparer } from "./IAsyncEqualityComparer"
import { IEqualityComparer } from "./IEqualityComparer"

/**
 * Common Methods between IAsyncEnumerable and IParallelEnumerable
 */
export interface IAsyncParallel<TSource> extends AsyncIterable<TSource> {
    aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>,
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>,
    aggregate<TAccumulate, TResult>(
            seed: TAccumulate,
            func: (x: TAccumulate, y: TSource) => TAccumulate,
            resultSelector: (x: TAccumulate) => TResult): Promise<TResult>,
    all(predicate: (x: TSource) => boolean): Promise<boolean>,
    allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean>,
    any(predicate?: (x: TSource) => boolean): Promise<boolean>,
    anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    average(this: IAsyncParallel<number>): Promise<number>
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    average(selector: (x: TSource) => number): Promise<number>,
    averageAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>,
    count(predicate?: (x: TSource) => boolean): Promise<number>,
    countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number>,
    /**
     * @throws {ArgumentOutOfRangeException}
     */
    elementAt(index: number): Promise<TSource>,
    elementAtOrDefault(index: number): Promise<TSource | null>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    first(predicate?: (x: TSource) => boolean): Promise<TSource>,
    /**
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    last(predicate?: (x: TSource) => boolean): Promise<TSource>,
    /**
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @param this Async Iteration of Numbers
     */
    max(this: IAsyncParallel<number>): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    max(selector: (x: TSource) => number): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    maxAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    min(this: IAsyncParallel<number>): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    min(selector: (x: TSource) => number): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    minAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains more than one element
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching element
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    single(predicate?: (x: TSource) => boolean): Promise<TSource>,
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     */
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     */
    singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>,
    sum(this: IAsyncParallel<number>): Promise<number>
    sum(selector: (x: TSource) => number): Promise<number>,
    sumAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    toArray(): Promise<TSource[]>
    toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>,
    toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>>,
    toSet(): Promise<Set<TSource>>,
    [Symbol.asyncIterator](): AsyncIterableIterator<TSource>
}
