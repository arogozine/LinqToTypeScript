import { IAsyncEnumerable } from "@async/async"
import { IAsyncEqualityComparer } from "@shared/IAsyncEqualityComparer"
import {
    IComparer,
    IConstructor,
    IEqualityComparer,
    IGrouping,
    ITuple } from "@shared/shared"
import { Enumerable } from "./Enumerable"
import { IEnumerable } from "./IEnumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"

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
        return Enumerable.aggregate(this, seedOrFunc, func as any, resultSelector as any)
    }

    public all(predicate: (x: T) => boolean): boolean {
        return Enumerable.all(this, predicate)
    }

    public allAsync(predicate: (x: T) => Promise<boolean>): Promise<boolean> {
        return Enumerable.allAsync(this, predicate)
    }

    public any(predicate?: (x: T) => boolean): boolean {
        return Enumerable.any(this, predicate)
    }

    public anyAsync(predicate: (x: T) => Promise<boolean>): Promise<boolean> {
        return Enumerable.anyAsync(this, predicate)
    }

    public average(this: IEnumerable<number>): number
    public average(selector: (x: T) => number): number
    public average(selector?: (x: T) => number): number {
        return Enumerable.average(this, selector as any)
    }

    public averageAsync(selector: (x: T) => Promise<number>): Promise<number> {
        return Enumerable.averageAsync(this, selector)
    }

    public concat(second: IEnumerable<T>): IEnumerable<T> {
        return Enumerable.concat(this, second)
    }

    public contains(value: T): boolean
    public contains(value: T, comparer: IEqualityComparer<T>): boolean
    public contains(value: T, comparer?: IEqualityComparer<T>): boolean {
        return Enumerable.contains(this, value, comparer as any)
    }

    public count(predicate?: (x: T) => boolean): number {
        return Enumerable.count(this, predicate as any)
    }

    public countAsync(predicate: (x: T) => Promise<boolean>): Promise<number> {
        return Enumerable.countAsync(this, predicate as any)
    }

    public distinct(comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.distinct(this, comparer)
    }

    public elementAt(index: number): T {
        return Enumerable.elementAt(this, index)
    }

    public elementAtOrDefault(index: number): T | null {
        return Enumerable.elementAtOrDefault(this, index)
    }

    public except(second: Iterable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.except(this, second, comparer as any)
    }

    public first(predicate?: (x: T) => boolean): T {
        return Enumerable.first(this, predicate as any)
    }

    public firstAsync(predicate: (x: T) => Promise<boolean>): Promise<T> {
        return Enumerable.firstAsync(this, predicate)
    }

    public firstOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.firstOrDefault(this, predicate as any)
    }

    public firstOrDefaultAsync(predicate: (x: T) => Promise<boolean>): Promise<T | null> {
        return Enumerable.firstOrDefaultAsync(this, predicate)
    }

    public each(action: (x: T) => void): IEnumerable<T> {
        return Enumerable.each(this, action)
    }

    public eachAsync(action: (x: T) => Promise<void>): IAsyncEnumerable<T> {
        return Enumerable.eachAsync(this, action)
    }

    public groupBy(keySelector: (x: T) => number): IEnumerable<IGrouping<number, T>>
    public groupBy(keySelector: (x: T) => string): IEnumerable<IGrouping<string, T>>
    public groupBy<TKey>(
        keySelector: (x: T) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, T>>
    public groupBy<TKey>(
        keySelector: (x: T) => TKey,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, T>> {
        return Enumerable.groupBy(this, keySelector, comparer as any)
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
        return Enumerable.groupByWithSel(this, keySelector, elementSelector, comparer as any)
    }

    public intersect(second: IEnumerable<T>): IEnumerable<T>
    public intersect(second: IEnumerable<T>, comparer: IEqualityComparer<T>): IEnumerable<T>
    public intersect(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.intersect(this, second, comparer as any)
    }

    public joinByKey<TInner, TKey, TResult>(
            inner: IEnumerable<TInner>,
            outerKeySelector: (x: T) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: T, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
        return Enumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: T) => boolean): T {
        return Enumerable.last(this, predicate)
    }

    public lastAsync(predicate: (x: T) => Promise<boolean>): Promise<T> {
        return Enumerable.lastAsync(this, predicate)
    }

    public lastOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.lastOrDefault(this, predicate)
    }

    public lastOrDefaultAsync(predicate: (x: T) => Promise<boolean>): Promise<T | null> {
        return Enumerable.lastOrDefaultAsync(this, predicate)
    }

    public max(this: IEnumerable<number>): number | never
    public max(selector: (x: T) => number): number | never
    public max(selector?: (x: T) => number): number | never {
        return Enumerable.max(this, selector as any)
    }

    public maxAsync(selector: (x: T) => Promise<number>): Promise<number | never> {
        return Enumerable.maxAsync(this, selector)
    }

    public min(this: IEnumerable<number>): number | never
    public min(selector: (x: T) => number): number | never
    public min(selector?: (x: T) => number): number | never {
        return Enumerable.min(this, selector as any)
    }

    public minAsync(selector: (x: T) => Promise<number>): Promise<number | never> {
        return Enumerable.minAsync(this, selector)
    }

    // tslint:disable:ban-types

    public ofType(type: "object"): IEnumerable<Object>
    public ofType(type: "function"): IEnumerable<Function>
    public ofType(type: "symbol"): IEnumerable<Symbol>
    public ofType(type: "boolean"): IEnumerable<boolean>
    public ofType(type: "number"): IEnumerable<number>
    public ofType(type: "string"): IEnumerable<string>
    public ofType<TResult>(type: IConstructor<TResult>): IEnumerable<TResult>
    public ofType(type: string | IConstructor<any>) {
        return Enumerable.ofType(this, type)
    }

    // tslint:enable:ban-types

    public orderBy(predicate: (x: T) => number | string): IOrderedEnumerable<T>
    public orderBy(predicate: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public orderBy(predicate: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public orderBy(predicate: any, comparer?: IComparer<number> | IComparer<string>) {
        return Enumerable.orderBy(this, predicate, comparer as any)
    }

    public orderByDescending(predicate: (x: T) => number | string): IOrderedEnumerable<T>
    public orderByDescending(predicate: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public orderByDescending(predicate: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public orderByDescending(predicate: any, comparer?: IComparer<any>) {
        return Enumerable.orderByDescending(this, predicate, comparer as any)
    }

    public reverse(): IEnumerable<T> {
        return Enumerable.reverse(this)
    }

    public select<OUT>(selector: (x: T) => OUT): IEnumerable<OUT>
    public select<TKey extends keyof T>(
        this: IEnumerable<{ [key: string]: Iterable<T[TKey]>}>,
        selector: TKey): IEnumerable<T[TKey]>
    public select(keyOrSelector: any): IEnumerable<any> {
        return Enumerable.select(this, keyOrSelector)
    }

    public selectAsync<TKey extends keyof T, TResult>(
        this: IEnumerable<{ [key: string]: Promise<TResult> }>,
        key: TKey): IAsyncEnumerable<T[TKey]>
    public selectAsync<OUT>(selector: (x: T) => Promise<OUT>): IAsyncEnumerable<OUT> {
        return Enumerable.selectAsync(this, selector)
    }

    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
        this: IEnumerable<TBindedSource>,
        selector: keyof TBindedSource): IEnumerable<TOut>
    public selectMany<OUT>(selector: (x: T) => Iterable<OUT>): IEnumerable<OUT>
    public selectMany<OUT>(selector: ((x: T) => Iterable<OUT>) | string): IEnumerable<OUT> {
        return Enumerable.selectMany(this as any, selector as any)
    }

    public selectManyAsync<OUT>(selector: (x: T) => Promise<Iterable<OUT>>): IAsyncEnumerable<OUT> {
        return Enumerable.selectManyAsync(this, selector)
    }

    public sequenceEquals(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): boolean {
        return Enumerable.sequenceEquals(this, second, comparer)
    }

    public sequenceEqualsAsync(second: IEnumerable<T>, comparer: IAsyncEqualityComparer<T>): Promise<boolean> {
        return Enumerable.sequenceEqualsAsync(this, second, comparer)
    }

    public single(predicate?: (x: T) => boolean): T {
        return Enumerable.single(this, predicate)
    }

    public singleAsync(predicate: (x: T) => Promise<boolean>): Promise<T> {
        return Enumerable.singleAsync(this, predicate)
    }

    public singleOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.singleOrDefault(this, predicate)
    }

    public singleOrDefaultAsync(predicate: (x: T) => Promise<boolean>): Promise<T | null> {
        return Enumerable.singleOrDefaultAsync(this, predicate)
    }

    public skip(count: number): IEnumerable<T> {
        return Enumerable.skip(this, count)
    }

    public skipWhile(predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        return Enumerable.skipWhile(this, predicate)
    }

    public skipWhileAsync(predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        return Enumerable.skipWhileAsync(this, predicate)
    }

    public sum(this: IEnumerable<number>): number
    public sum(selector: (x: T) => number): number
    public sum(selector?: (x: T) => number): number {
        return Enumerable.sum(this, selector as any)
    }

    public sumAsync(selector: (x: T) => Promise<number>): Promise<number> {
        return Enumerable.sumAsync(this, selector)
    }

    public take(amount: number): IEnumerable<T> {
        return Enumerable.take(this, amount)
    }

    public takeWhile(predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        return Enumerable.takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        return Enumerable.takeWhileAsync(this, predicate)
    }

    public toArray(): T[] {
        return Enumerable.toArray(this)
    }

    public toMap<TKey>(selector: (x: T) => TKey): Map<TKey, T[]> {
        return Enumerable.toMap(this, selector)
    }

    public toMapAsync<TKey>(selector: (x: T) => Promise<TKey>): Promise<Map<TKey, T[]>> {
        return Enumerable.toMapAsync(this, selector)
    }

    public toSet(): Set<T> {
        return Enumerable.toSet(this)
    }

    public union(second: Iterable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.union(this, second, comparer as any)
    }

    public unionAsync(second: Iterable<T>, comparer: IAsyncEqualityComparer<T>): IAsyncEnumerable<T> {
        return Enumerable.unionAsync(this, second, comparer)
    }

    public where(predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        return Enumerable.where(this, predicate)
    }

    public whereAsync(predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
        return Enumerable.whereAsync(this, predicate)
    }

    public zip<TSecond>(second: Iterable<TSecond>): IEnumerable<ITuple<T, TSecond>>
    public zip<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: T, y: TSecond) => TResult): IEnumerable<TResult>
    public zip<TSecond>(second: Iterable<TSecond>, resultSelector?: (x: T, y: TSecond) => any): IEnumerable<any> {
        return Enumerable.zip(this, second, resultSelector as any)
    }

    public zipAsync<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: T, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> {
        return Enumerable.zipAsync(this, second, resultSelector)
    }

    public abstract [Symbol.iterator](): IterableIterator<T>
}
