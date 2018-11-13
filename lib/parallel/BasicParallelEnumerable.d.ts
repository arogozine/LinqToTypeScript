import { IAsyncEnumerable } from "../async/IAsyncEnumerable";
import { IAsyncEqualityComparer, IAsyncParallel, IComparer, IEqualityComparer, IGrouping, InferType, ITuple, OfType } from "../shared/shared";
import { IParallelEnumerable } from "./IParallelEnumerable";
import { IOrderedParallelEnumerable } from "./parallel";
import { TypedData } from "./TypedData";
/**
 * Base implementation of IParallelEnumerable<T>
 * @private
 */
export declare class BasicParallelEnumerable<TSource> implements IParallelEnumerable<TSource> {
    readonly dataFunc: TypedData<TSource>;
    constructor(dataFunc: TypedData<TSource>);
    aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
    aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
    all(predicate: (x: TSource) => boolean): Promise<boolean>;
    allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    any(predicate?: (x: TSource) => boolean): Promise<boolean>;
    anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean>;
    asAsync(): IAsyncEnumerable<TSource>;
    average(this: IParallelEnumerable<number>): Promise<number>;
    average(selector: (x: TSource) => number): Promise<number>;
    averageAsync(selector: (x: TSource) => Promise<number>): Promise<number>;
    concat(second: IAsyncParallel<TSource>): IParallelEnumerable<TSource>;
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    count(predicate?: (x: TSource) => boolean): Promise<number>;
    countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number>;
    distinct(comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    each(action: (x: TSource) => void): IParallelEnumerable<TSource>;
    eachAsync(action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource>;
    elementAt(index: number): Promise<TSource>;
    elementAtOrDefault(index: number): Promise<TSource | null>;
    except(second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    exceptAsync(second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    first(predicate?: (x: TSource) => boolean): Promise<TSource>;
    firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    groupBy(keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>;
    groupBy(keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>;
    groupBy<TKey>(keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
    groupByAsync<TKey>(keySelector: (x: TSource) => Promise<TKey> | TKey, comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
    groupByWithSel<TElement>(keySelector: (x: TSource) => number, elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>;
    groupByWithSel<TElement>(keySelector: (x: TSource) => string, elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>;
    groupByWithSel<TKey, TElement>(keySelector: (x: TSource) => TKey, elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>;
    intersect(second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    intersectAsync(second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    joinByKey<TInner, TKey, TResult>(inner: IAsyncParallel<TInner>, outerKeySelector: (x: TSource) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult>;
    last(predicate?: (x: TSource) => boolean): Promise<TSource>;
    lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    max(this: IParallelEnumerable<number>): Promise<number>;
    max(selector: (x: TSource) => number): Promise<number>;
    maxAsync(selector: (x: TSource) => Promise<number>): Promise<number>;
    min(this: IParallelEnumerable<number>): Promise<number>;
    min(selector: (x: TSource) => number): Promise<number>;
    minAsync(selector: (x: TSource) => Promise<number>): Promise<number>;
    ofType<TType extends OfType>(type: TType): IParallelEnumerable<InferType<TType>>;
    orderBy<TKey>(predicate: (x: TSource) => TKey, comparer: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
    orderByAsync<TKey>(predicate: (x: TSource) => Promise<TKey>, comparer: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
    orderByDescending<TKey>(predicate: (x: TSource) => TKey, comparer: IComparer<TKey>): IParallelEnumerable<TSource>;
    orderByDescendingAsync<TKey>(predicate: (x: TSource) => Promise<TKey>, comparer: IComparer<TKey>): IParallelEnumerable<TSource>;
    reverse(): IParallelEnumerable<TSource>;
    select<OUT>(selector: (x: TSource) => OUT): IParallelEnumerable<OUT>;
    select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>;
    selectAsync<OUT>(selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>;
    selectAsync<TKey extends keyof TSource, TResult>(this: IParallelEnumerable<{
        [key: string]: Promise<TResult>;
    }>, selector: TKey): IParallelEnumerable<TResult>;
    selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>;
    selectMany<TBindedSource extends {
        [key: string]: Iterable<TOut>;
    }, TOut>(this: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>;
    selectManyAsync<OUT>(selector: (x: TSource) => Promise<Iterable<OUT>>): IParallelEnumerable<OUT>;
    sequenceEquals(second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    sequenceEqualsAsync(second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
    single(predicate?: (x: TSource) => boolean): Promise<TSource>;
    singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>;
    skip(count: number): IParallelEnumerable<TSource>;
    skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
    sum(this: IParallelEnumerable<number>): Promise<number>;
    sum(selector: (x: TSource) => number): Promise<number>;
    sumAsync(selector: (x: TSource) => Promise<number>): Promise<number>;
    take(amount: number): IParallelEnumerable<TSource>;
    takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
    toArray(): Promise<TSource[]>;
    toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>;
    toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>>;
    toSet(): Promise<Set<TSource>>;
    union(second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    unionAsync(second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
    where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
    whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
    zip<TSecond, TResult>(second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSecond>, resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>;
    zip<TSecond>(second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSecond>): IParallelEnumerable<ITuple<TSource, TSecond>>;
    zipAsync<TSecond, TResult>(second: IAsyncParallel<TSecond>, resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult>;
    [Symbol.asyncIterator](): AsyncIterableIterator<TSource>;
}
