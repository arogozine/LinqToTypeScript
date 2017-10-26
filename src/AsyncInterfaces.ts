import { IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple, RecOrdMap } from "./Interfaces"

export interface IAsyncGrouping<TKey, TValue> extends AsyncIterableIterator<TValue> {
    readonly key: TKey
}

export interface IAsyncEnumerable<TSource> extends AsyncIterable<TSource> {
    aggregate: {
        (func: (x: TSource, y: TSource) => TSource): Promise<TSource>,
        <TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>,
        <TAccumulate, TResult>(
            seed: TAccumulate,
            func: (x: TAccumulate, y: TSource) => TAccumulate,
            resultSelector: (x: TAccumulate) => TResult): Promise<TResult>,
    }
    all: {
        (predicate: (x: TSource) => boolean): Promise<boolean>,
    }
    any: {
        (): Promise<boolean>,
        (predicate: (x: TSource) => boolean): Promise<boolean>,
    }
    average: {
        (this: IAsyncEnumerable<number>): Promise<number>
        (selector: (x: TSource) => number): Promise<number>,
    }
    concat: {
        (second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>,
    }
    contains: {
        (value: TSource): Promise<boolean>,
        (value: TSource, comparer: IEqualityComparer<TSource>): Promise<boolean>,
    }
    count: {
        (): Promise<number>
        (predicate: (x: TSource) => boolean): Promise<number>,
    }
    distinct: {
        (): IAsyncEnumerable<TSource>,
        (comparer: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    }
    each: {
        (action: (x: TSource) => void): IAsyncEnumerable<TSource>,
    }
    elementAt: {
        (index: number): Promise<TSource>,
    }
    elementAtOrDefault: {
        (index: number): Promise<TSource | null>,
    }
    except: {
        (second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>
        (second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    }
    first: {
        (): Promise<TSource>,
        (predicate: (x: TSource) => boolean): Promise<TSource>,
    }
    firstOrDefault: {
        (): Promise<TSource | null>,
        (predicate: (x: TSource) => boolean): Promise<TSource | null>,
    }
    groupBy: {
        (keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
        (keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
        <TKey>(
            keySelector: (x: TSource) => TKey,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>,
    }
    groupByWithSel: {
        <TElement>(
            keySelector: ((x: TSource) => number),
            elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>
        <TElement>(
            keySelector: ((x: TSource) => string),
            elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>
        <TKey, TElement>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>,
    }
    intersect: {
        (second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>
        (second: IAsyncEnumerable<TSource>, comparer: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>,
    }
    // join in LINQ - but renamed to avoid clash with Array.prototype.join
    joinByKey: {
        <TInner, TKey, TResult>(
            inner: IAsyncEnumerable<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult): IAsyncEnumerable<TResult>
        <TInner, TKey, TResult>(
            inner: IAsyncEnumerable<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>,
    }
    last: {
        (): Promise<TSource>,
        (predicate: (x: TSource) => boolean): Promise<TSource>,
    }
    lastOrDefault: {
        (): Promise<TSource | null>,
        (predicate: (x: TSource) => boolean): Promise<TSource | null>,
    }
    max: {
        (this: IAsyncEnumerable<number>): Promise<number | never>,
        (selector: (x: TSource) => number): Promise<number | never>,
    },
    min: {
        (this: IAsyncEnumerable<number>): Promise<number | never>,
        (selector: (x: TSource) => number): Promise<number | never>,
    }
    ofType: {
        /* tslint:disable:ban-types */
        (type: "object"): IAsyncEnumerable<Object>
        (type: "function"): IAsyncEnumerable<Function>
        (type: "symbol"): IAsyncEnumerable<Symbol>
        /* tslint:enable:ban-types */
        (type: "boolean"): IAsyncEnumerable<boolean>
        (type: "number"): IAsyncEnumerable<number>
        (type: "string"): IAsyncEnumerable<string>
        <TResult>(type: IConstructor<TResult>): IAsyncEnumerable<TResult>,
        // <TResult>(this: AsyncIterable<TResult>): AsyncIterable<TResult>,
    }
    orderBy: {
        (predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
        (predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
        (predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    }
    orderByDescending: {
        (predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
        (predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
        (predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    }
    reverse: {
        (): IAsyncEnumerable<TSource>,
    }
    select: {
        <OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>
        <TKey extends keyof TSource>(key: TKey): IAsyncEnumerable<TSource[TKey]>,
    }
    selectMany: {
        <OUT>(selector: (x: TSource) => Iterable<OUT>): IAsyncEnumerable<OUT>,
        <OUT>(
            this: IAsyncEnumerable<{ [key: string]: Iterable<OUT>}>,
            selector: keyof TSource): IAsyncEnumerable<OUT>,
    }
    sequenceEquals: {
        (second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    }
    single: {
        (): Promise<TSource>
        (predicate: (x: TSource) => boolean): Promise<TSource>,
    }
    singleOrDefault: {
        (): Promise<TSource | null>
        (predicate: (x: TSource) => boolean): Promise<TSource | null>,
    }
    skip: {
        (count: number): IAsyncEnumerable<TSource>,
    }
    skipWhile: {
        (predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>,
        (predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    },
    sum: {
        (this: IAsyncEnumerable<number>): Promise<number>
        (this: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>,
    }
    take: {
        (amount: number): IAsyncEnumerable<TSource>,
    }
    takeWhile: {
        (pedicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>,
        (pedicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    }
    toArray: {
        (): Promise<TSource[]>,
    }
    toMap: { // = ToDictionary
        <TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>,
    }
    toSet: {
        (): Promise<Set<TSource>>,
    }
    union: {
        (second: IAsyncEnumerable<TSource>, comparer: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>
        (second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>,
    }
    where: {
        (predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>,
        (predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>,
    }
    zip: {
        <TSecond, TResult>(
            second: IAsyncEnumerable<TSecond>,
            resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>,
        <TSecond>(second: IAsyncEnumerable<TSecond>): IAsyncEnumerable<ITuple<TSource, TSecond>>,
    }
    [Symbol.asyncIterator]: () => AsyncIterableIterator<TSource>
}

export interface IOrderedAsyncEnumerable<TSource> extends IAsyncEnumerable<TSource> {
    thenBy: {
        (keySelector: (x: TSource) => string | number): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    }
    thenByDescending: {
        (keySelector: (x: TSource) => string | number): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
        (keySelector: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>,
    }
    getMap: {
        (): Promise<RecOrdMap<TSource>>,
    }
}
