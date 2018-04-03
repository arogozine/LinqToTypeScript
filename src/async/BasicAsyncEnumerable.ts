import { IAsyncEqualityComparer } from "@shared/IAsyncEqualityComparer"
import { DataType, ParallelEnumerable } from "../parallel/parallel"
import { IAsyncParallel, IComparer, IConstructor, IEqualityComparer, IGrouping, ITuple } from "../shared/shared"
import { AsyncEnumerable } from "./AsyncEnumerable"
import { IAsyncEnumerable } from "./IAsyncEnumerable"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"

/**
 * The class behind IAsyncEnumerable<T>
 * @private
 */
export class BasicAsyncEnumerable<TSource> implements IAsyncEnumerable<TSource> {
    constructor(private readonly iterator: () => AsyncIterableIterator<TSource>) {
        //
    }

    public asParallel(): IAsyncParallel<TSource> {
        return ParallelEnumerable.from(DataType.PromiseToArray, () => this.toArray())
    }

    public aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>
    public aggregate<TAccumulate>(
        seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
    public aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): Promise<TResult>
    public aggregate<TAccumulate, TResult>(
        seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
        func?: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector?: (x: TAccumulate) => TResult): Promise<any> {
        return AsyncEnumerable.aggregate(this, seedOrFunc, func as any, resultSelector as any)
    }

    public all(predicate: (x: TSource) => boolean): Promise<boolean> {
        return AsyncEnumerable.all(this, predicate)
    }

    public allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return AsyncEnumerable.allAsync(this, predicate)
    }

    public any(predicate?: (x: TSource) => boolean): Promise<boolean> {
        return AsyncEnumerable.any(this, predicate)
    }

    public anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return AsyncEnumerable.anyAsync(this, predicate)
    }

    public average(this: IAsyncEnumerable<number>): Promise<number>
    public average(selector: (x: TSource) => number): Promise<number>
    public average(selector?: (x: TSource) => number): Promise<number> {
        return AsyncEnumerable.average(this, selector as any)
    }

    public averageAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return AsyncEnumerable.averageAsync(this, selector)
    }

    public concat(second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.concat(this, second)
    }

    public contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return AsyncEnumerable.contains(this, value, comparer)
    }

    public count(predicate?: (x: TSource) => boolean): Promise<number> {
        return AsyncEnumerable.count(this, predicate)
    }

    public countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number> {
        return AsyncEnumerable.countAsync(this, predicate)
    }

    public distinct(comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.distinct(this, comparer)
    }

    public elementAt(index: number): Promise<TSource> {
        return AsyncEnumerable.elementAt(this, index)
    }

    public elementAtOrDefault(index: number): Promise<TSource | null> {
        return AsyncEnumerable.elementAtOrDefault(this, index)
    }

    public each(action: (x: TSource) => void): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.each(this, action)
    }

    public eachAsync(action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.eachAsync(this, action)
    }

    public except(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.except(this, second, comparer)
    }

    public first(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return AsyncEnumerable.first(this, predicate)
    }

    public firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return AsyncEnumerable.firstAsync(this, predicate)
    }

    public firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return AsyncEnumerable.firstOrDefault(this, predicate)
    }

    public firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return AsyncEnumerable.firstOrDefaultAsync(this, predicate)
    }

    public groupBy(keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
    public groupBy(keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey | string | number,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey | string | number, TSource>> {
        return AsyncEnumerable.groupBy(this, keySelector, comparer as any)
    }

    public groupByWithSel<TElement>(
        keySelector: ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>
    public groupByWithSel<TElement>(
        keySelector: ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>> {
        return AsyncEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer as any)
    }

    public intersect(
        second: IAsyncEnumerable<TSource>,
        comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.intersect(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
        inner: IAsyncEnumerable<TInner>,
        outerKeySelector: (x: TSource) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TSource, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult> {
        return AsyncEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return AsyncEnumerable.last(this, predicate)
    }

    public lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return AsyncEnumerable.lastAsync(this, predicate)
    }

    public lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return AsyncEnumerable.lastOrDefault(this, predicate)
    }

    public lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return AsyncEnumerable.lastOrDefaultAsync(this, predicate)
    }

    public max(this: IAsyncEnumerable<number>): Promise<number>
    public max(selector: (x: TSource) => number): Promise<number>
    public max(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number> {
        return AsyncEnumerable.max(this as any, selector as any)
    }

    public maxAsync(selector: (x: TSource) => Promise<number>): Promise<number | never> {
        return AsyncEnumerable.maxAsync(this, selector)
    }

    public min(this: IAsyncEnumerable<number>): Promise<number | never>
    public min(selector: (x: TSource) => number): Promise<number | never>
    public min(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number | never> {
        return AsyncEnumerable.min<TSource>(this as any, selector as any)
    }

    public minAsync(selector: (x: TSource) => Promise<number>): Promise<number | never> {
        return AsyncEnumerable.minAsync(this, selector)
    }

    /* tslint:disable:ban-types */
    public ofType(type: "object"): IAsyncEnumerable<Object>
    public ofType(type: "function"): IAsyncEnumerable<Function>
    public ofType(type: "symbol"): IAsyncEnumerable<Symbol>
    /* tslint:enable:ban-types */
    public ofType(type: "boolean"): IAsyncEnumerable<boolean>
    public ofType(type: "number"): IAsyncEnumerable<number>
    public ofType(type: "string"): IAsyncEnumerable<string>
    public ofType<TResult>(type: IConstructor<TResult>): IAsyncEnumerable<TResult>
    public ofType<TResult>(type: IConstructor<TResult> | string): IAsyncEnumerable<TResult> {
        return AsyncEnumerable.ofType(this, type)
    }

    public orderBy(predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
    public orderBy(predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public orderBy(predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public orderBy(
        predicate: (x: TSource) => string | number,
        comparer?: IComparer<string> | IComparer<number>): IOrderedAsyncEnumerable<TSource> {
        return AsyncEnumerable.orderBy(this, predicate as any, comparer as any)
    }

    public orderByDescending(
        predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>
    public orderByDescending(
        predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>
    public orderByDescending(
        predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>
    public orderByDescending(
        predicate: (x: TSource) => string | number,
        comparer?: IComparer<string> | IComparer<number>): IOrderedAsyncEnumerable<TSource> {
        return AsyncEnumerable.orderByDescending(this, predicate as any, comparer as any)
    }

    public reverse(): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.reverse(this)
    }

    public select<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT> {
        return AsyncEnumerable.select(this, selector)
    }

    public selectAsync<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>
    public selectAsync<TKey extends keyof TSource, TResult>(
        this: IAsyncEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IAsyncEnumerable<TResult>
    public selectAsync(keyOrSelector: any): IAsyncEnumerable<any> {
        return AsyncEnumerable.selectAsync(this, keyOrSelector)
    }

    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
        this: IAsyncEnumerable<TBindedSource>,
        selector: keyof TBindedSource): IAsyncEnumerable<TOut>
    public selectMany<Y>(selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>
    public selectMany<Y>(selector: ((x: TSource) => Iterable<Y>) | string): IAsyncEnumerable<Y> {
        return AsyncEnumerable.selectMany(this, selector as any)
    }

    public selectManyAsync<Y>(selector: (x: TSource) => Promise<Iterable<Y>>): IAsyncEnumerable<Y> {
        return AsyncEnumerable.selectManyAsync(this, selector)
    }

    public sequenceEquals(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return AsyncEnumerable.sequenceEquals(this, second, comparer)
    }

    public sequenceEqualsAsync(second: AsyncIterable<TSource>,
                               comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return AsyncEnumerable.sequenceEqualsAsync(this, second, comparer)
    }

    public single(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return AsyncEnumerable.single(this, predicate)
    }

    public singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return AsyncEnumerable.singleAsync(this, predicate)
    }

    public singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return AsyncEnumerable.singleOrDefault(this, predicate)
    }

    public singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return AsyncEnumerable.singleOrDefaultAsync(this, predicate)
    }

    public skip(count: number): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.skip(this, count)
    }

    public skipWhile(
        predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.skipWhile(this, predicate)
    }

    public skipWhileAsync(
        predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.skipWhileAsync(this, predicate)
    }

    public sum(this: IAsyncEnumerable<number>): Promise<number>
    public sum(selector: (x: TSource) => number): Promise<number>
    public sum(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number> {
        return AsyncEnumerable.sum(this as any, selector as any)
    }

    public sumAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return AsyncEnumerable.sumAsync(this, selector)
    }

    public take(amount: number): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.takeWhileAsync(this, predicate)
    }

    public toArray(): Promise<TSource[]> {
        return AsyncEnumerable.toArray(this)
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>> {
        return AsyncEnumerable.toMap(this, selector)
    }

    public toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>> {
        return AsyncEnumerable.toMapAsync(this, selector)
    }

    public toSet(): Promise<Set<TSource>> {
        return AsyncEnumerable.toSet(this)
    }

    public union(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.union(this, second, comparer)
    }

    public unionAsync(second: AsyncIterable<TSource>,
                      comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.unionAsync(this, second, comparer)
    }

    public where(predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>
    public where(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    public where(
        predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.where(this, predicate)
    }

    public whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return AsyncEnumerable.whereAsync(this, predicate)
    }

    public zip<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>
    public zip<TSecond>(second: AsyncIterable<TSecond>): IAsyncEnumerable<ITuple<TSource, TSecond>>
    public zip<Y, OUT>(
        second: AsyncIterable<Y>,
        resultSelector?: (x: TSource, y: Y) => OUT): IAsyncEnumerable<any>  {
        return AsyncEnumerable.zip(this, second, resultSelector as any)
    }

    public zipAsync<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> {
        return AsyncEnumerable.ZipAsync(this, second, resultSelector)
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TSource> {
        return this.iterator()
    }
}
