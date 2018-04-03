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
    average(this: IAsyncParallel<number>): Promise<number>
    average(selector: (x: TSource) => number): Promise<number>,
    averageAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    count(predicate?: (x: TSource) => boolean): Promise<number>,
    countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number>,
    elementAt(index: number): Promise<TSource>,
    elementAtOrDefault(index: number): Promise<TSource | null>,
    first(predicate?: (x: TSource) => boolean): Promise<TSource>,
    firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>
    last(predicate?: (x: TSource) => boolean): Promise<TSource>,
    lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>,
    max(this: IAsyncParallel<number>): Promise<number>,
    max(selector: (x: TSource) => number): Promise<number>,
    maxAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    min(this: IAsyncParallel<number>): Promise<number>,
    min(selector: (x: TSource) => number): Promise<number>,
    minAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    single(predicate?: (x: TSource) => boolean): Promise<TSource>,
    singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
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
