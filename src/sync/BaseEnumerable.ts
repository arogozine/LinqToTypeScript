import {
    IAsyncEnumerable,
    IAsyncEqualityComparer,
    IComparer,
    IEnumerable,
    IEqualityComparer,
    IGrouping,
    InferType,
    IOrderedAsyncEnumerable, IOrderedEnumerable, IParallelEnumerable, OfType } from "../types"
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
    asAsync, asParallel,
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
 } from "./Enumerable"

/**
 * Container for all IEnumerable methods
 * to apply to built in ECMAScript collections
 * and what not
 * @private
 */
export abstract class BaseEnumerable<T> implements IEnumerable<T> {
    public aggregate(func: (x: T, y: T) => T): T
    public aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: T) => TAccumulate): TAccumulate
    public aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (x: TAccumulate, y: T) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): T
    public aggregate<TAccumulate, TResult>(
        seedOrFunc: ((x: T, y: T) => T) | TAccumulate,
        func?: (x: TAccumulate, y: T) => TAccumulate,
        resultSelector?: (x: TAccumulate) => TResult): T | TAccumulate | TResult {
        return aggregate(this, seedOrFunc, func as any, resultSelector as any)
    }

    public all(predicate: (x: T) => boolean): boolean {
        return all(this, predicate)
    }

    public allAsync(predicate: (x: T) => Promise<boolean>): Promise<boolean> {
        return allAsync(this, predicate)
    }

    public any(predicate?: (x: T) => boolean): boolean {
        return any(this, predicate)
    }

    public anyAsync(predicate: (x: T) => Promise<boolean>): Promise<boolean> {
        return anyAsync(this, predicate)
    }

    public asAsync(): IAsyncEnumerable<T> {
        return asAsync(this)
    }

    public asParallel(): IParallelEnumerable<T> {
        return asParallel(this)
    }

    public average(this: IEnumerable<number>): number
    public average(selector: (x: T) => number): number
    public average(selector?: (x: T) => number): number {
        return average(this, selector as any)
    }

    public averageAsync(selector: (x: T) => Promise<number>): Promise<number> {
        return averageAsync(this, selector)
    }

    public concat(second: IEnumerable<T>): IEnumerable<T> {
        return concat(this, second)
    }

    public contains(value: T, comparer?: IEqualityComparer<T>): boolean {
        return contains(this, value, comparer)
    }

    public containsAsync(value: T, comparer: IAsyncEqualityComparer<T>): Promise<boolean> {
        return containsAsync(this, value, comparer)
    }

    public count(predicate?: (x: T) => boolean): number {
        return count(this, predicate)
    }

    public countAsync(predicate: (x: T) => Promise<boolean>): Promise<number> {
        return countAsync(this, predicate)
    }

    public distinct(comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return distinct(this, comparer)
    }

    public distinctAsync(comparer: IAsyncEqualityComparer<T>): IAsyncEnumerable<T> {
        return distinctAsync(this, comparer)
    }

    public elementAt(index: number): T {
        return elementAt(this, index)
    }

    public elementAtOrDefault(index: number): T | null {
        return elementAtOrDefault(this, index)
    }

    public except(second: Iterable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return except(this, second, comparer)
    }

    public exceptAsync(second: Iterable<T>, comparer: IAsyncEqualityComparer<T>): IAsyncEnumerable<T> {
        return exceptAsync(this, second, comparer)
    }

    public first(predicate?: (x: T) => boolean): T {
        return first(this, predicate)
    }

    public firstAsync(predicate: (x: T) => Promise<boolean>): Promise<T> {
        return firstAsync(this, predicate)
    }

    public firstOrDefault(predicate?: (x: T) => boolean): T | null {
        return firstOrDefault(this, predicate)
    }

    public firstOrDefaultAsync(predicate: (x: T) => Promise<boolean>): Promise<T | null> {
        return firstOrDefaultAsync(this, predicate)
    }

    public each(action: (x: T) => void): IEnumerable<T> {
        return each(this, action)
    }

    public eachAsync(action: (x: T) => Promise<void>): IAsyncEnumerable<T> {
        return eachAsync(this, action)
    }

    public groupBy(keySelector: (x: T) => number): IEnumerable<IGrouping<number, T>>
    public groupBy(keySelector: (x: T) => string): IEnumerable<IGrouping<string, T>>
    public groupBy<TKey>(
        keySelector: (x: T) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, T>>
    public groupBy<TKey>(
        keySelector: (x: T) => TKey,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, T>> {
        return groupBy(this, keySelector, comparer as any)
    }

    public groupByAsync<TKey>(
        keySelector: (x: T) => TKey | Promise<TKey>,
        comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, T>> {
        return groupByAsync(this, keySelector, comparer as any)
    }

    public groupByWithSel<TElement>(
        keySelector: ((x: T) => number),
        elementSelector: (x: T) => TElement): IEnumerable<IGrouping<number, TElement>>
    public groupByWithSel<TElement>(
        keySelector: ((x: T) => string),
        elementSelector: (x: T) => TElement): IEnumerable<IGrouping<string, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: T) => TKey),
        elementSelector: (x: T) => TElement,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: T) => TKey),
        elementSelector: (x: T) => TElement,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>> {
        return groupByWithSel(this, keySelector, elementSelector, comparer as any)
    }

    public intersect(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return intersect(this, second, comparer)
    }

    public intersectAsync(second: IEnumerable<T>, comparer: IAsyncEqualityComparer<T>): IAsyncEnumerable<T> {
        return intersectAsync(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
            inner: IEnumerable<TInner>,
            outerKeySelector: (x: T) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: T, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
        return join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: T) => boolean): T {
        return last(this, predicate)
    }

    public lastAsync(predicate: (x: T) => Promise<boolean>): Promise<T> {
        return lastAsync(this, predicate)
    }

    public lastOrDefault(predicate?: (x: T) => boolean): T | null {
        return lastOrDefault(this, predicate)
    }

    public lastOrDefaultAsync(predicate: (x: T) => Promise<boolean>): Promise<T | null> {
        return lastOrDefaultAsync(this, predicate)
    }

    public max(this: IEnumerable<number>): number | never
    public max(selector: (x: T) => number): number | never
    public max(selector?: (x: T) => number): number | never {
        return max(this, selector as any)
    }

    public maxAsync(selector: (x: T) => Promise<number>): Promise<number | never> {
        return maxAsync(this, selector)
    }

    public min(this: IEnumerable<number>): number | never
    public min(selector: (x: T) => number): number | never
    public min(selector?: (x: T) => number): number | never {
        return min(this, selector as any)
    }

    public minAsync(selector: (x: T) => Promise<number>): Promise<number | never> {
        return minAsync(this, selector)
    }

    public ofType<TType extends OfType>(type: TType): IEnumerable<InferType<TType>> {
        return ofType(this, type)
    }

    public orderBy<TKey>(
        predicate: (x: T) => TKey,
        comparer?: IComparer<TKey>): IOrderedEnumerable<T> {
        return orderBy(this, predicate, comparer)
    }

    public orderByAsync<TKey>(
        predicate: (x: T) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T> {
        return orderByAsync(this, predicate, comparer)
    }

    public orderByDescending<TKey>(
        predicate: (x: T) => TKey,
        comparer?: IComparer<TKey>): IOrderedEnumerable<T> {
        return orderByDescending(this, predicate, comparer)
    }

    public orderByDescendingAsync<TKey>(
        predicate: (x: T) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<T> {
        return orderByDescendingAsync(this, predicate, comparer)
    }

    public reverse(): IEnumerable<T> {
        return reverse(this)
    }

    public select<OUT>(selector: (x: T) => OUT): IEnumerable<OUT>
    public select<TKey extends keyof T>(
        this: IEnumerable<{ [key: string]: Iterable<T[TKey]>}>,
        selector: TKey): IEnumerable<T[TKey]>
    public select(keyOrSelector: any): IEnumerable<any> {
        return select(this, keyOrSelector)
    }

    public selectAsync<TKey extends keyof T, TResult>(
        this: IEnumerable<{ [key: string]: Promise<TResult> }>,
        key: TKey): IAsyncEnumerable<T[TKey]>
    public selectAsync<OUT>(selector: (x: T) => Promise<OUT>): IAsyncEnumerable<OUT> {
        return selectAsync(this, selector)
    }

    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
        this: IEnumerable<TBindedSource>,
        selector: keyof TBindedSource): IEnumerable<TOut>
    public selectMany<OUT>(selector: (x: T) => Iterable<OUT>): IEnumerable<OUT>
    public selectMany<OUT>(selector: any): IEnumerable<OUT> {
        return selectMany(this, selector)
    }

    public selectManyAsync<OUT>(selector: (x: T) => Promise<Iterable<OUT>>): IAsyncEnumerable<OUT> {
        return selectManyAsync(this, selector)
    }

    public sequenceEquals(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): boolean {
        return sequenceEquals(this, second, comparer)
    }

    public sequenceEqualsAsync(second: IEnumerable<T>, comparer: IAsyncEqualityComparer<T>): Promise<boolean> {
        return sequenceEqualsAsync(this, second, comparer)
    }

    public single(predicate?: (x: T) => boolean): T {
        return single(this, predicate)
    }

    public singleAsync(predicate: (x: T) => Promise<boolean>): Promise<T> {
        return singleAsync(this, predicate)
    }

    public singleOrDefault(predicate?: (x: T) => boolean): T | null {
        return singleOrDefault(this, predicate)
    }

    public singleOrDefaultAsync(predicate: (x: T) => Promise<boolean>): Promise<T | null> {
        return singleOrDefaultAsync(this, predicate)
    }

    // tslint:disable-next-line:no-shadowed-variable
    public skip(count: number): IEnumerable<T> {
        return skip(this, count)
    }

    public skipWhile(predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        return skipWhile(this, predicate)
    }

    public skipWhileAsync(predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        return skipWhileAsync(this, predicate)
    }

    public sum(this: IEnumerable<number>): number
    public sum(selector: (x: T) => number): number
    public sum(selector?: (x: T) => number): number {
        return sum(this, selector as any)
    }

    public sumAsync(selector: (x: T) => Promise<number>): Promise<number> {
        return sumAsync(this, selector)
    }

    public take(amount: number): IEnumerable<T> {
        return take(this, amount)
    }

    public takeWhile(predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        return takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        return takeWhileAsync(this, predicate)
    }

    public toArray(): T[] {
        return toArray(this)
    }

    public toMap<TKey>(selector: (x: T) => TKey): Map<TKey, T[]> {
        return toMap(this, selector)
    }

    public toMapAsync<TKey>(selector: (x: T) => Promise<TKey>): Promise<Map<TKey, T[]>> {
        return toMapAsync(this, selector)
    }

    public toSet(): Set<T> {
        return toSet(this)
    }

    public union(second: Iterable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return union(this, second, comparer as any)
    }

    public unionAsync(second: Iterable<T>, comparer: IAsyncEqualityComparer<T>): IAsyncEnumerable<T> {
        return unionAsync(this, second, comparer)
    }

    public where(predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        return where(this, predicate)
    }

    public whereAsync(predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        return whereAsync(this, predicate)
    }

    public zip<TSecond>(second: Iterable<TSecond>): IEnumerable<[T, TSecond]>
    public zip<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: T, y: TSecond) => TResult): IEnumerable<TResult>
    public zip<TSecond>(second: Iterable<TSecond>, resultSelector?: (x: T, y: TSecond) => any): IEnumerable<any> {
        return zip(this, second, resultSelector as any)
    }

    public zipAsync<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: T, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> {
        return zipAsync(this, second, resultSelector)
    }

    public abstract [Symbol.iterator](): IterableIterator<T>
}
