import "core-js/modules/es7.symbol.async-iterator";
import { IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple } from "../shared/shared";
import { IAsyncEnumerable } from "./IAsyncEnumerable";
import { IAsyncGrouping } from "./IAsyncGrouping";
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable";
export declare class BasicAsyncEnumerable<TSource> implements IAsyncEnumerable<TSource> {
    private readonly iterator;
    constructor(iterator: () => AsyncIterableIterator<TSource>);
    aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
    aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
    all(predicate: (x: TSource) => boolean): Promise<boolean>;
    any(predicate?: (x: TSource) => boolean): Promise<boolean>;
    average(this: IAsyncEnumerable<number>): Promise<number>;
    average(selector: (x: TSource) => number): Promise<number>;
    concat(second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>;
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    count(predicate?: (x: TSource) => boolean): Promise<number>;
    distinct(comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    elementAt(index: number): Promise<TSource>;
    elementAtOrDefault(index: number): Promise<TSource | null>;
    each(action: (x: TSource) => void): IAsyncEnumerable<TSource>;
    except(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    first(predicate?: (x: TSource) => boolean): Promise<TSource>;
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    groupBy(keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>;
    groupBy(keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>;
    groupBy<TKey>(keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
    groupByWithSel<TElement>(keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>;
    groupByWithSel<TElement>(keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>;
    groupByWithSel<TKey, TElement>(keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>;
    intersect(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    joinByKey<TInner, TKey, TResult>(inner: IAsyncEnumerable<TInner>, outerKeySelector: (x: TSource) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>;
    last(predicate?: (x: TSource) => boolean): Promise<TSource>;
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    max(this: IAsyncEnumerable<number>): Promise<number | never>;
    max(selector: (x: TSource) => number): Promise<number | never>;
    min(this: IAsyncEnumerable<number>): Promise<number | never>;
    min(selector: (x: TSource) => number): Promise<number | never>;
    ofType(type: "object"): IAsyncEnumerable<Object>;
    ofType(type: "function"): IAsyncEnumerable<Function>;
    ofType(type: "symbol"): IAsyncEnumerable<Symbol>;
    ofType(type: "boolean"): IAsyncEnumerable<boolean>;
    ofType(type: "number"): IAsyncEnumerable<number>;
    ofType(type: "string"): IAsyncEnumerable<string>;
    ofType<TResult>(type: IConstructor<TResult>): IAsyncEnumerable<TResult>;
    orderBy(predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>;
    orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
    orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
    orderByDescending(predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    reverse(): IAsyncEnumerable<TSource>;
    select<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>;
    selectMany<TBindedSource extends {
        [key: string]: Iterable<TOut>;
    }, TOut>(this: IAsyncEnumerable<TBindedSource>, selector: keyof TBindedSource): IAsyncEnumerable<TOut>;
    selectMany<Y>(selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>;
    sequenceEquals(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    single(predicate?: (x: TSource) => boolean): Promise<TSource>;
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    skip(count: number): IAsyncEnumerable<TSource>;
    skipWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    sum(this: IAsyncEnumerable<number>): Promise<number>;
    sum(this: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
    take(amount: number): IAsyncEnumerable<TSource>;
    takeWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    toArray(): Promise<TSource[]>;
    toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>;
    toSet(): Promise<Set<TSource>>;
    union(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    where(predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>;
    where(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    zip<TSecond, TResult>(second: IAsyncEnumerable<TSecond>, resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>;
    zip<TSecond>(second: IAsyncEnumerable<TSecond>): IAsyncEnumerable<ITuple<TSource, TSecond>>;
    [Symbol.asyncIterator](): AsyncIterableIterator<TSource>;
}
export declare class AsyncGrouping<TKey, TValue> extends Array<Promise<TValue>> implements IAsyncGrouping<TKey, TValue> {
    readonly key: TKey;
    private currentIndex;
    constructor(key: TKey, startingItem: Promise<TValue>);
    next(): Promise<IteratorResult<TValue>>;
    [Symbol.asyncIterator](): AsyncIterableIterator<TValue>;
}
export declare class AsyncEnumerable {
    static aggregate<TSource>(source: AsyncIterable<TSource>, func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
    static aggregate<TSource, TAccumulate>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
    static aggregate<TSource, TAccumulate, TResult>(source: AsyncIterable<TSource>, seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
    private static aggregate_1<TSource>(source, func);
    private static aggregate_2<TSource, TAccumulate>(source, seed, func);
    private static aggregate_3<TSource, TAccumulate, TResult>(source, seed, func, resultSelector);
    static all<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<boolean>;
    static any<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<boolean>;
    private static any_1<TSource>(source);
    private static any_2<TSource>(source, predicate);
    static average(source: AsyncIterable<number>): Promise<number>;
    static average<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static average_1(source);
    private static average_2<TSource>(source, func);
    static concat<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>): IAsyncEnumerable<TSource>;
    static contains<TSource>(source: AsyncIterable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    static count<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<number>;
    private static count_1<T>(source);
    private static count_2<T>(source, predicate);
    static distinct<TSource>(source: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static elementAt<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource>;
    static elementAtOrDefault<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource | null>;
    static enumerateObject<TInput>(source: TInput): IAsyncEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>>;
    static except<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static first<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static first_1<T>(source);
    private static first_2<T>(source, predicate);
    static firstOrDefault<T>(source: AsyncIterable<T>, predicate?: (x: T) => boolean): Promise<T | null>;
    private static firstOrDefault_1<T>(source);
    private static firstOrDefault_2<T>(source, predicate);
    static flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>): IAsyncEnumerable<TSource>;
    static flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>, shallow: false): IAsyncEnumerable<TSource>;
    static flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>, shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>;
    static from<TSource>(promises: Array<Promise<TSource>>): IAsyncEnumerable<TSource>;
    static from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>;
    static fromEvent<K extends keyof HTMLElementEventMap>(element: Element, type: K): IAsyncEnumerable<HTMLElementEventMap[K]>;
    static fromEvent(element: Element, type: string): IAsyncEnumerable<Event>;
    static each<TSource>(source: AsyncIterable<TSource>, action: (x: TSource) => void): IAsyncEnumerable<TSource>;
    static groupBy<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>;
    static groupBy<TSource>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>;
    static groupBy<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
    private static groupBy_0_Simple<TSource>(source, keySelector);
    private static groupBy_0<TSource, TKey>(source, keySelector, comparer);
    static groupByWithSel<TSource, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>;
    static groupByWithSel<TSource, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>;
    static groupByWithSel<TSource, TKey, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>;
    private static groupBy_1_Simple<TSource, TElement>(source, keySelector, elementSelector);
    private static groupBy_1<TSource, TKey, TElement>(source, keySelector, elementSelector, comparer);
    static join<TOuter, TInner, TKey, TResult>(outer: AsyncIterable<TOuter>, inner: AsyncIterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult): IAsyncEnumerable<TResult>;
    static join<TOuter, TInner, TKey, TResult>(outer: AsyncIterable<TOuter>, inner: AsyncIterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>;
    static intersect<TSource>(first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    static select<TSource, TResult>(source: AsyncIterable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult>;
    static select<TSource, TKey extends keyof TSource>(source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
    private static select_1<TSource, TResult>(source, selector);
    private static select_2<TSource, TKey>(source, key);
    static selectMany<TSource extends {
        [key: string]: Iterable<Y>;
    }, Y>(source: AsyncIterable<TSource>, selector: keyof TSource): IAsyncEnumerable<Y>;
    static selectMany<TSource, Y>(source: AsyncIterable<TSource>, selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>;
    private static selectMany_1<TSource, Y>(source, selector);
    private static selectMany_2<TSource, Y>(source, selector);
    static single<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static single_1<TSource>(source);
    private static single_2<TSource>(source, predicate);
    static singleOrDefault<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    private static singleOrDefault_1<TSource>(source);
    private static singleOrDefault_2<TSource>(source, predicate);
    static skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource>;
    static skipWhile<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    private static skipWhile_1<TSource>(source, predicate);
    private static skipWhile_2<TSource>(source, predicate);
    static ofType<TSource, TResult>(source: AsyncIterable<TSource>, type?: IConstructor<TResult> | string): IAsyncEnumerable<TResult>;
    private static orderByInner<TSource>(source, keySelector);
    static orderBy<TSource>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => string): IOrderedAsyncEnumerable<TSource>;
    static orderBy<TSource>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    static orderBy<TSource>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => number): IOrderedAsyncEnumerable<TSource>;
    static orderBy<TSource>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
    static orderByDescending<TSource>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => string): IOrderedAsyncEnumerable<TSource>;
    static orderByDescending<TSource>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    static orderByDescending<TSource>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => number): IOrderedAsyncEnumerable<TSource>;
    static orderByDescending<TSource>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
    static last<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
    private static last_1<T>(source);
    private static last_2<TSource>(source, predicate);
    static lastOrDefault<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    private static lastOrDefault_1<T>(source);
    private static lastOrDefault_2<T>(source, predicate);
    static max(source: AsyncIterable<number>): Promise<number>;
    static max<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static max_1(source);
    private static max_2<TSource>(source, selector);
    static min(source: AsyncIterable<number>): Promise<number>;
    static min<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static min_1(source);
    private static min_2(source, selector);
    static range(start: number, count: number): IAsyncEnumerable<number>;
    static repeat<T>(element: T, count: number, delay?: number): IAsyncEnumerable<T>;
    private static repeat_1<T>(element, count);
    private static repeat_2<T>(element, count, delay);
    static reverse<TSource>(source: AsyncIterable<TSource>): IAsyncEnumerable<TSource>;
    static sequenceEquals<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    static sum(source: AsyncIterable<number>): Promise<number>;
    static sum<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
    private static sum_1(source);
    private static sum_2<TSource>(source, selector);
    static take<TSource>(source: AsyncIterable<TSource>, amount: number): IAsyncEnumerable<TSource>;
    static takeWhile<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    private static takeWhile_1<T>(source, predicate);
    private static takeWhile_2<T>(source, predicate);
    static thenBy<TSource>(source: IOrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => string): IOrderedAsyncEnumerable<TSource>;
    static thenBy<TSource>(source: IOrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    static thenBy<TSource>(source: IOrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => number): IOrderedAsyncEnumerable<TSource>;
    static thenBy<TSource>(source: IOrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
    static thenByDescending<TSource>(source: IOrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => string): IOrderedAsyncEnumerable<TSource>;
    static thenByDescending<TSource>(source: IOrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    static thenByDescending<TSource>(source: IOrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => number): IOrderedAsyncEnumerable<TSource>;
    static thenByDescending<TSource>(source: IOrderedAsyncEnumerable<TSource>, keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
    static toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]>;
    static toMap<K, V>(source: AsyncIterable<V>, selector: (x: V) => K): Promise<Map<K, V[]>>;
    static toObject<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => string): Promise<{
        [key: string]: TSource;
    }>;
    static toSet<TSource>(source: AsyncIterable<TSource>): Promise<Set<TSource>>;
    static union<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    private static union_1<TSource>(first, second);
    private static union_2<TSource>(first, second, comparer);
    static where<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>;
    static where<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    private static where_1<T>(source, predicate);
    private static where_2<T>(source, predicate);
    static zip<T, Y>(source: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<ITuple<T, Y>>;
    static zip<T, Y, OUT>(source: AsyncIterable<T>, second: AsyncIterable<Y>, resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT>;
    private static zip_1<T, Y>(source, second);
    private static zip_2<T, Y, OUT>(source, second, resultSelector);
    private constructor();
}
