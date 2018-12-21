import {
    IAsyncEnumerable,
    IAsyncEqualityComparer,
    IAsyncParallel,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    IOrderedAsyncEnumerable, OfType, SelectorKeyType } from "../types"
import { aggregate } from "./_private/aggregate"
import { all } from "./_private/all"
import { allAsync } from "./_private/allAsync"
import { any } from "./_private/any"
import { anyAsync } from "./_private/anyAsync"
import { average } from "./_private/average"
import { averageAsync } from "./_private/averageAsync"
import { contains } from "./_private/contains"
import { containsAsync } from "./_private/containsAsync"
import { count } from "./_private/count"
import { countAsync } from "./_private/countAsync"
import { elementAt } from "./_private/elementAt"
import { elementAtOrDefault } from "./_private/elementAtOrDefault"
import { first } from "./_private/first"
import { firstAsync } from "./_private/firstAsync"
import { firstOrDefault } from "./_private/firstOrDefault"
import { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync"
import { last } from "./_private/last"
import { lastAsync } from "./_private/lastAsync"
import { lastOrDefault } from "./_private/lastOrDefault"
import { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync"
import { max } from "./_private/max"
import { maxAsync } from "./_private/maxAsync"
import { min } from "./_private/min"
import { minAsync } from "./_private/minAsync"
import { single } from "./_private/single"
import { singleAsync } from "./_private/singleAsync"
import { singleOrDefault } from "./_private/singleOrDefault"
import { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync"
import { sum } from "./_private/sum"
import { sumAsync } from "./_private/sumAsync"
import { toArray } from "./_private/toArray"
import { toMap } from "./_private/toMap"
import { toMapAsync } from "./_private/toMapAsync"
import { toSet } from "./_private/toSet"
import {
    asParallel,
    concat,
    distinct, distinctAsync,
    each, eachAsync, except, exceptAsync,
    groupBy, groupByAsync, groupByWithSel,
    intersect, intersectAsync,
    join,
    ofType, orderBy, orderByAsync, orderByDescending, orderByDescendingAsync,
    reverse,
    select, selectAsync, selectMany, selectManyAsync, sequenceEquals, sequenceEqualsAsync,
    skip, skipWhile, skipWhileAsync,
    take, takeWhile, takeWhileAsync,
    union, unionAsync,
    where, whereAsync,
    zip, zipAsync,
} from "./AsyncEnumerable"

/**
 * The class behind IAsyncEnumerable<T>
 * @private
 */
export class BasicAsyncEnumerable<TSource> implements IAsyncEnumerable<TSource> {
    constructor(private readonly iterator: () => AsyncIterableIterator<TSource>) {
        //
    }

    public asParallel(): IAsyncParallel<TSource> {
        return asParallel(this)
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
        return aggregate(this, seedOrFunc, func as any, resultSelector as any)
    }

    public all(predicate: (x: TSource) => boolean): Promise<boolean> {
        return all(this, predicate)
    }

    public allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return allAsync(this, predicate)
    }

    public any(predicate?: (x: TSource) => boolean): Promise<boolean> {
        return any(this, predicate)
    }

    public anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return anyAsync(this, predicate)
    }

    public average(this: IAsyncEnumerable<number>): Promise<number>
    public average(selector: (x: TSource) => number): Promise<number>
    public average(selector?: (x: TSource) => number): Promise<number> {
        return average(this, selector as any)
    }

    public averageAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return averageAsync(this, selector)
    }

    public concat(second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource> {
        return concat(this, second)
    }

    public contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return contains(this, value, comparer)
    }

    public containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return containsAsync(this, value, comparer)
    }

    public count(predicate?: (x: TSource) => boolean): Promise<number> {
        return count(this, predicate)
    }

    public countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number> {
        return countAsync(this, predicate)
    }

    public distinct(comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return distinct(this, comparer)
    }

    public distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return distinctAsync(this, comparer)
    }

    public elementAt(index: number): Promise<TSource> {
        return elementAt(this, index)
    }

    public elementAtOrDefault(index: number): Promise<TSource | null> {
        return elementAtOrDefault(this, index)
    }

    public each(action: (x: TSource) => void): IAsyncEnumerable<TSource> {
        return each(this, action)
    }

    public eachAsync(action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
        return eachAsync(this, action)
    }

    public except(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return except(this, second, comparer)
    }

    public exceptAsync(second: IAsyncEnumerable<TSource>,
                       comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return exceptAsync(this, second, comparer)
    }

    public first(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return first(this, predicate)
    }

    public firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return firstAsync(this, predicate)
    }

    public firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return firstOrDefault(this, predicate)
    }

    public firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return firstOrDefaultAsync(this, predicate)
    }

    public groupBy<TKey extends SelectorKeyType>(
        keySelector: (x: TSource) => TKey): IAsyncEnumerable<IGrouping<TKey, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey | string | number,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey | string | number, TSource>> {
        return groupBy(this, keySelector, comparer as any)
    }

    public groupByAsync<TKey>(
        keySelector: (x: TSource) => TKey | string | number,
        comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>)
        : IAsyncEnumerable<IGrouping<TKey | string | number, TSource>> {
        return groupByAsync(this, keySelector, comparer as any)
    }

    public groupByWithSel<TElement, TKey extends SelectorKeyType>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>> {
        return groupByWithSel(this, keySelector, elementSelector, comparer as any)
    }

    public intersect(
        second: IAsyncEnumerable<TSource>,
        comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return intersect(this, second, comparer)
    }

    public intersectAsync(
        second: IAsyncEnumerable<TSource>,
        comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return intersectAsync(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
        inner: IAsyncEnumerable<TInner>,
        outerKeySelector: (x: TSource) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TSource, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult> {
        return join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return last(this, predicate)
    }

    public lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return lastAsync(this, predicate)
    }

    public lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return lastOrDefault(this, predicate)
    }

    public lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return lastOrDefaultAsync(this, predicate)
    }

    public max(this: IAsyncEnumerable<number>): Promise<number>
    public max(selector: (x: TSource) => number): Promise<number>
    public max(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number> {
        return max(this as any, selector as any)
    }

    public maxAsync(selector: (x: TSource) => Promise<number>): Promise<number | never> {
        return maxAsync(this, selector)
    }

    public min(this: IAsyncEnumerable<number>): Promise<number | never>
    public min(selector: (x: TSource) => number): Promise<number | never>
    public min(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number | never> {
        return min<TSource>(this as any, selector as any)
    }

    public minAsync(selector: (x: TSource) => Promise<number>): Promise<number | never> {
        return minAsync(this, selector)
    }

    public ofType<TType extends OfType>(type: TType): IAsyncEnumerable<InferType<TType>> {
        return ofType(this, type)
    }

    public orderBy<TKey>(predicate: (x: TSource) => TKey,
                         comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
        return orderBy(this, predicate, comparer)
    }

    public orderByAsync<TKey>(predicate: (x: TSource) => Promise<TKey>,
                              comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
        return orderByAsync(this, predicate, comparer)
    }

    public orderByDescending<TKey>(predicate: (x: TSource) => TKey,
                                   comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
        return orderByDescending(this, predicate, comparer)
    }

    public orderByDescendingAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
        return orderByDescendingAsync(this, predicate, comparer)
    }

    public reverse(): IAsyncEnumerable<TSource> {
        return reverse(this)
    }

    public select<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT> {
        return select(this, selector)
    }

    public selectAsync<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>
    public selectAsync<TKey extends keyof TSource, TResult>(
        this: IAsyncEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IAsyncEnumerable<TResult>
    public selectAsync(keyOrSelector: any): IAsyncEnumerable<any> {
        return selectAsync(this, keyOrSelector)
    }

    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
        this: IAsyncEnumerable<TBindedSource>,
        selector: keyof TBindedSource): IAsyncEnumerable<TOut>
    public selectMany<Y>(selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>
    public selectMany<Y>(selector: any): IAsyncEnumerable<Y> {
        return selectMany(this, selector)
    }

    public selectManyAsync<Y>(selector: (x: TSource) => Promise<Iterable<Y>>): IAsyncEnumerable<Y> {
        return selectManyAsync(this, selector)
    }

    public sequenceEquals(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return sequenceEquals(this, second, comparer)
    }

    public sequenceEqualsAsync(second: AsyncIterable<TSource>,
                               comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return sequenceEqualsAsync(this, second, comparer)
    }

    public single(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return single(this, predicate)
    }

    public singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return singleAsync(this, predicate)
    }

    public singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return singleOrDefault(this, predicate)
    }

    public singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return singleOrDefaultAsync(this, predicate)
    }

    // tslint:disable-next-line:no-shadowed-variable
    public skip(count: number): IAsyncEnumerable<TSource> {
        return skip(this, count)
    }

    public skipWhile(
        predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {
        return skipWhile(this, predicate)
    }

    public skipWhileAsync(
        predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return skipWhileAsync(this, predicate)
    }

    public sum(this: IAsyncEnumerable<number>): Promise<number>
    public sum(selector: (x: TSource) => number): Promise<number>
    public sum(
        this: IAsyncEnumerable<number> | IAsyncEnumerable<TSource>,
        selector?: (x: TSource) => number): Promise<number> {
        return sum(this as any, selector as any)
    }

    public sumAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return sumAsync(this, selector)
    }

    public take(amount: number): IAsyncEnumerable<TSource> {
        return take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {
        return takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return takeWhileAsync(this, predicate)
    }

    public toArray(): Promise<TSource[]> {
        return toArray(this)
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>> {
        return toMap(this, selector)
    }

    public toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>> {
        return toMapAsync(this, selector)
    }

    public toSet(): Promise<Set<TSource>> {
        return toSet(this)
    }

    public union(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return union(this, second, comparer)
    }

    public unionAsync(second: AsyncIterable<TSource>,
                      comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return unionAsync(this, second, comparer)
    }

    public where(predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>
    public where(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    public where(
        predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IAsyncEnumerable<TSource> {
        return where(this, predicate)
    }

    public whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return whereAsync(this, predicate)
    }

    public zip<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>
    public zip<TSecond>(second: AsyncIterable<TSecond>): IAsyncEnumerable<[TSource, TSecond]>
    public zip<Y, OUT>(
        second: AsyncIterable<Y>,
        resultSelector?: (x: TSource, y: Y) => OUT): IAsyncEnumerable<any>  {
        return zip(this, second, resultSelector as any)
    }

    public zipAsync<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> {
        return zipAsync(this, second, resultSelector)
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TSource> {
        return this.iterator()
    }
}
