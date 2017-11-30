import { IAsyncEnumerable } from "../AsyncInterfaces"
import { IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple } from "../Interfaces"

export interface IParallelEnumerable<TSource> {
    aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>,
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>,
    aggregate<TAccumulate, TResult>(
            seed: TAccumulate,
            func: (x: TAccumulate, y: TSource) => TAccumulate,
            resultSelector: (x: TAccumulate) => TResult): Promise<TResult>,
    all(predicate: (x: TSource) => boolean): Promise<boolean>,
    any(predicate?: (x: TSource) => boolean): Promise<boolean>,
    average(this: IParallelEnumerable<number>): Promise<number>
    average(selector: (x: TSource) => number): Promise<number>,
    concat(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>): IParallelEnumerable<TSource>,
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    count(predicate?: (x: TSource) => boolean): Promise<number>,
    distinct(comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    each(action: (x: TSource) => void): IParallelEnumerable<TSource>,
    elementAt(index: number): Promise<TSource>,
    elementAtOrDefault(index: number): Promise<TSource | null>,
    except(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
           comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    first(predicate?: (x: TSource) => boolean): Promise<TSource>,
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    groupBy(keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>
    groupBy(keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>
    groupBy<TKey>(
            keySelector: (x: TSource) => TKey,
            comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>,
    groupByWithSel<TElement>(
            keySelector: ((x: TSource) => number),
            elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>
    groupByWithSel<TElement>(
            keySelector: ((x: TSource) => string),
            elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>
    groupByWithSel<TKey, TElement>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement,
            comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>,
    intersect(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
              comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    // join in LINQ - but renamed to avoid clash with Array.prototype.join
    joinByKey<TInner, TKey, TResult>(
            inner: IAsyncEnumerable<TInner> | IParallelEnumerable<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult>,
    last(predicate?: (x: TSource) => boolean): Promise<TSource>,
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    max(this: IParallelEnumerable<number>): Promise<number | never>,
    max(selector: (x: TSource) => number): Promise<number | never>,
    min(this: IParallelEnumerable<number>): Promise<number | never>,
    min(selector: (x: TSource) => number): Promise<number | never>,
    /* tslint:disable:ban-types */
    ofType(type: "object"): IParallelEnumerable<Object>
    ofType(type: "function"): IParallelEnumerable<Function>
    ofType(type: "symbol"): IParallelEnumerable<Symbol>
    /* tslint:enable:ban-types */
    ofType(type: "boolean"): IParallelEnumerable<boolean>
    ofType(type: "number"): IParallelEnumerable<number>
    ofType(type: "string"): IParallelEnumerable<string>
    ofType<TResult>(type: IConstructor<TResult>): IParallelEnumerable<TResult>,
    orderBy(predicate: (x: TSource) => number | string): IParallelEnumerable<TSource>
    orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IParallelEnumerable<TSource>
    orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IParallelEnumerable<TSource>,
    orderByDescending(predicate: (x: TSource) => number | string): IParallelEnumerable<TSource>
    orderByDescending(predicate: (x: TSource) => number, comparer: IComparer<number>): IParallelEnumerable<TSource>
    orderByDescending(predicate: (x: TSource) => string, comparer: IComparer<string>): IParallelEnumerable<TSource>,
    reverse(): IParallelEnumerable<TSource>,
    select<OUT>(selector: (x: TSource) => OUT): IParallelEnumerable<OUT>
    select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>,
    selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>,
    selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
            this: IParallelEnumerable<TBindedSource>,
            selector: keyof TBindedSource): IParallelEnumerable<TOut>,
    sequenceEquals(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
                   comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    single(predicate?: (x: TSource) => boolean): Promise<TSource>,
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    skip(count: number): IParallelEnumerable<TSource>,
    skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>,
    sum(this: IParallelEnumerable<number>): Promise<number>
    sum(this: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>,
    take(amount: number): IParallelEnumerable<TSource>,
    takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>
    toArray(): Promise<TSource[]>
    toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>,
    toSet(): Promise<Set<TSource>>,
    union(second: IAsyncEnumerable<TSource> | IParallelEnumerable<TSource>,
          comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>,
    zip<TSecond, TResult>(
        second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSource>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>,
    zip<TSecond>(second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSecond>):
        IParallelEnumerable<ITuple<TSource, TSecond>>,
    [Symbol.asyncIterator]: () => AsyncIterableIterator<TSource>
}
