import { BaseEnumerable, Enumerable } from "./Enumerable"
import {
    IComparer,
    IConstructor, IEnumerable, IEqualityComparer, IGrouping, IOrderedEnumerable, ITuple } from "./Interfaces"
// tslint:disable:max-line-length

export class ArrayEnumerable<T> extends Array<T> implements IEnumerable<T> {

    public aggregate(func: (x: T, y: T) => T): T
    public aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: T) => TAccumulate): TAccumulate
    public aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (x: TAccumulate, y: T) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): T
    public aggregate<TAccumulate, TResult>(
        seedOrFunc: ((x: T, y: T) => T) | TAccumulate,
        func?: (x: TAccumulate, y: T) => TAccumulate,
        resultSelector?: (x: TAccumulate) => TResult): T | TAccumulate | TResult {
        return Enumerable.aggregate(this, seedOrFunc, func, resultSelector)
    }

    public all(predicate: (x: T) => boolean): boolean {
        return Enumerable.all(this, predicate)
    }

    public any(): boolean
    public any(predicate: (x: T) => boolean): boolean
    public any(predicate?: (x: T) => boolean): boolean {
        return Enumerable.any(this, predicate)
    }

    public average(this: IEnumerable<number>): number
    public average(selector: (x: T) => number): number
    public average(selector?: (x: T) => number): number {
        return Enumerable.average(this, selector)
    }

    public concat(items: IEnumerable<T>): IEnumerable<T>
    public concat(...items: T[][]): ArrayEnumerable<T>
    public concat(...items: Array<T | T[]>): ArrayEnumerable<T>
    public concat(...items: any[]) {
        return super.concat.apply(this, ...items)
    }

    public contains(value: T): boolean
    public contains(value: T, comparer: IEqualityComparer<T>): boolean
    public contains(value: T, comparer?: IEqualityComparer<T>): boolean {
        return Enumerable.contains(this, value, comparer)
    }

    public count(): number
    public count(predicate: (x: T) => boolean): number
    public count(predicate?: (x: T) => boolean): number {
        return Enumerable.count(this, predicate)
    }

    public distinct(): IEnumerable<T>
    public distinct(comparer: IEqualityComparer<T>): IEnumerable<T>
    public distinct(comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.distinct(this, comparer)
    }

    public elementAt(index: number): T {
        return Enumerable.elementAt(this, index)
    }

    public elementAtOrDefault(index: number): T | null {
        return Enumerable.elementAtOrDefault(this, index)
    }

    public except(second: IEnumerable<T>): IEnumerable<T>
    public except(second: IEnumerable<T>, comparer: IEqualityComparer<T>): IEnumerable<T>
    public except(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.except(this, second)
    }

    public first(): T
    public first(predicate: (x: T) => boolean): T
    public first(predicate?: (x: T) => boolean): T {
        return Enumerable.first(this, predicate)
    }

    public firstOrDefault(): T | null
    public firstOrDefault(predicate: (x: T) => boolean): T | null
    public firstOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.firstOrDefault(this, predicate)
    }

    public each(action: (x: T) => void): IEnumerable<T> {
        return Enumerable.each(this, action)
    }

    public groupBy(keySelector: (x: T) => number): IEnumerable<IGrouping<number, T>>
    public groupBy(keySelector: (x: T) => string): IEnumerable<IGrouping<string, T>>
    public groupBy<TKey>(
        keySelector: (x: T) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, T>>
    public groupBy<TKey>(
        keySelector: (x: T) => TKey,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, T>> {
        return Enumerable.groupBy(this, keySelector, comparer)
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
        return Enumerable.groupByWithSel(this, keySelector, elementSelector, comparer)
    }

    public intersect(second: IEnumerable<T>): IEnumerable<T>
    public intersect(second: IEnumerable<T>, comparer: IEqualityComparer<T>): IEnumerable<T>
    public intersect(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.intersect(this, second, comparer)
    }

    // join in LINQ - but renamed to avoid clash with Array.prototype.join
    public joinByKey<TInner, TKey, TResult>(
        inner: IEnumerable<TInner>,
        outerKeySelector: (x: T) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: T, y: TInner) => TResult): IEnumerable<TResult>
    public joinByKey<TInner, TKey, TResult>(
        inner: IEnumerable<TInner>,
        outerKeySelector: (x: T) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: T, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey>): IEnumerable<TResult>
    public joinByKey<TInner, TKey, TResult>(
            inner: IEnumerable<TInner>,
            outerKeySelector: (x: T) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: T, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
        return Enumerable.join(this, inner, outerKeySelector, innerKeySelector, comparer as any)
    }

    public last(): T
    public last(predicate: (x: T) => boolean): T
    public last(predicate?: (x: T) => boolean): T {
        return Enumerable.last(this, predicate)
    }

    public lastOrDefault(): T | null
    public lastOrDefault(predicate: (x: T) => boolean): T | null
    public lastOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.lastOrDefault(this, predicate)
    }

    public max(this: IEnumerable<number>): number | never
    public max(selector: (x: T) => number): number | never
    public max(selector?: (x: T) => number): number | never {
        return Enumerable.max(this, selector)
    }

    public min(this: IEnumerable<number>): number | never
    public min(selector: (x: T) => number): number | never
    public min(selector?: (x: T) => number): number | never {
        return Enumerable.min(this, selector)
    }

    // tslint:disable:ban-types

    public ofType(type: "object"): IEnumerable<Object>
    public ofType(type: "function"): IEnumerable<Function>
    public ofType(type: "symbol"): IEnumerable<Symbol>
    public ofType(type: "boolean"): IEnumerable<boolean>
    public ofType(type: "number"): IEnumerable<number>
    public ofType(type: "string"): IEnumerable<string>
    public ofType<TResult>(type: IConstructor<TResult>): IEnumerable<TResult>
    public ofType<TResult>(this: IEnumerable<TResult>): IEnumerable<TResult>
    public ofType<TResult>(type?: string | IConstructor<any>) {
        return Enumerable.ofType(this, type)
    }

    // tslint:enable:ban-types

    public orderBy(predicate: (x: T) => number | string): IOrderedEnumerable<T>
    public orderBy(predicate: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public orderBy(predicate: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public orderBy(predicate: any, comparer?: IComparer<any>) {
        return Enumerable.orderBy(this, predicate, comparer)
    }

    public orderByDescending(predicate: (x: T) => number | string): IOrderedEnumerable<T>
    public orderByDescending(predicate: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public orderByDescending(predicate: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public orderByDescending(predicate: any, comparer?: IComparer<any>) {
        return Enumerable.orderByDescending(this, predicate, comparer)
    }

    public reverse(): ArrayEnumerable<T> {
        super.reverse()
        return this
    }

    public select<OUT>(selector: (x: T) => OUT): IEnumerable<OUT>
    public select<TKey extends keyof T>(key: TKey): IEnumerable<T[TKey]>
    public select(keyOrSelector: any) {
        return Enumerable.select(this, keyOrSelector)
    }

    public selectMany<OUT>(selector: (x: T) => Iterable<OUT>): IEnumerable<OUT> {
        return Enumerable.selectMany(this, selector)
    }

    public sequenceEquals(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): boolean {
        return Enumerable.sequenceEquals(this, second, comparer)
    }

    public single(): T
    public single(predicate: (x: T) => boolean): T
    public single(predicate?: (x: T) => boolean): T {
        return Enumerable.single(this, predicate)
    }

    public singleOrDefault(): T | null
    public singleOrDefault(predicate: (x: T) => boolean): T | null
    public singleOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.singleOrDefault(this, predicate)
    }

    public skip(count: number): IEnumerable<T> {
        return Enumerable.skip(this, count)
    }

    public skipWhile(predicate: (x: T) => boolean): IEnumerable<T>
    public skipWhile(predicate: (x: T, index: number) => boolean): IEnumerable<T>
    public skipWhile(predicate: any) {
        return Enumerable.skipWhile(this, predicate)
    }

    public sum(this: IEnumerable<number>): number
    public sum(this: IEnumerable<T>, selector: (x: T) => number): number
    public sum(selector?: (x: T) => number): number {
        return Enumerable.sum(this, selector)
    }

    public take(amount: number): IEnumerable<T> {
        return Enumerable.take(this, amount)
    }

    public takeWhile(predicate: (x: T) => boolean): IEnumerable<T>
    public takeWhile(predicate: (x: T, index: number) => boolean): IEnumerable<T>
    public takeWhile(predicate: any) {
        return Enumerable.takeWhile(this, predicate)
    }

    public toArray(): T[] {
        return Enumerable.toArray(this)
    }

    public toMap<TKey>(selector: (x: T) => TKey): Map<TKey, T[]> {
        return Enumerable.toMap(this, selector)
    }

    public toSet(): Set<T> {
        return Enumerable.toSet(this)
    }

    public union(second: IEnumerable<T>): IEnumerable<T>
    public union(second: IEnumerable<T>, comparer: IEqualityComparer<T>): IEnumerable<T>
    public union(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.union(this, second, comparer)
    }

    public where(predicate: (x: T) => boolean): IEnumerable<T>
    public where(predicate: (x: T, index: number) => boolean): IEnumerable<T>
    public where(predicate: any): IEnumerable<T> {
        return Enumerable.where(this, predicate)
    }

    public zip<TSecond>(second: Iterable<TSecond>): IEnumerable<ITuple<T, TSecond>>
    public zip<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: T, y: TSecond) => TResult): IEnumerable<TResult>
    public zip<TSecond>(second: Iterable<TSecond>, resultSelector?: (x: T, y: TSecond) => any) {
        return Enumerable.zip(this, second, resultSelector)
    }
}
