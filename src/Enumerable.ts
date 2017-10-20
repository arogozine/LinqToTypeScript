// import "core-js/symbol"

import {
    IComparer,
    IConstructor,
    IEnumerable,
    IEqualityComparer,
    IGrouping,
    IOrderedEnumerable,
    ITuple,
    RecOrdMap,
} from "./Interfaces"
import {
    ArgumentOutOfRangeException,
    ArrayIterator,
    AsTuple,
    EqualityComparer,
    ErrorString,
    InvalidOperationException,
    StrictEqualityComparer,
} from "./TypesAndHelpers"

//#region Classes

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
        return Enumerable.aggregate(this, seedOrFunc, func as any, resultSelector as any)
    }

    public all(predicate: (x: T) => boolean): boolean {
        return super.every(predicate)
    }

    public any(): boolean
    public any(predicate: (x: T) => boolean): boolean
    public any(predicate?: (x: T) => boolean): boolean {
        return this.some(predicate || (() => true))
    }

    public average(this: IEnumerable<number>): number
    public average(selector: (x: T) => number): number
    public average(selector?: (x: T) => number): number {
        return Enumerable.average(this, selector as any)
    }

    public concat(items: IEnumerable<T>): IEnumerable<T>
    public concat(...items: T[][]): ArrayEnumerable<T>
    public concat(...items: Array<T | T[]>): ArrayEnumerable<T>
    public concat() {
        let items: any
        if (arguments.length === 1) {
            items = arguments[0]
        } else {
            items = [...arguments]
        }

        if (items instanceof BasicEnumerable) {
            // this scoping
            const enumerable = this
            function *iterator() {
                for (const x of enumerable) {
                    yield x
                }
                for (const x of items) {
                    yield x
                }
            }

            return new BasicEnumerable(iterator)
        } else {
            return super.concat.apply(this, [items])
        }
    }

    public contains(value: T): boolean
    public contains(value: T, comparer: IEqualityComparer<T>): boolean
    public contains(value: T, comparer?: IEqualityComparer<T>): boolean {
        return Enumerable.contains(this, value, comparer as any)
    }

    public count(): number
    public count(predicate: (x: T) => boolean): number
    public count(predicate?: (x: T) => boolean): number {
        if (predicate) {
            let count = 0
            for (let i = 0; i < this.length; i ++) {
                if (predicate(this[i]) === true) {
                    count++
                }
            }
            return count
        } else {
            return this.length
        }
    }

    public distinct(): IEnumerable<T>
    public distinct(comparer: IEqualityComparer<T>): IEnumerable<T>
    public distinct(comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.distinct(this, comparer as any)
    }

    public elementAt(index: number): T {
        if (index >= this.length) {
            throw new ArgumentOutOfRangeException("index")
        }

        return this[index]
    }

    public elementAtOrDefault(index: number): T | null {
        return Enumerable.elementAtOrDefault(this, index)
    }

    public except(second: IEnumerable<T>): IEnumerable<T>
    public except(second: IEnumerable<T>, comparer: IEqualityComparer<T>): IEnumerable<T>
    public except(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.except(this, second, comparer as any)
    }

    public first(): T
    public first(predicate: (x: T) => boolean): T
    public first(predicate?: (x: T) => boolean): T {
        if (predicate) {
            const value = this.find(predicate)
            if (typeof value === "undefined") {
                throw new InvalidOperationException(ErrorString.NoMatch)
            } else {
                return value
            }
        } else {
            if (this.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return this[0]
        }
    }

    public firstOrDefault(): T | null
    public firstOrDefault(predicate: (x: T) => boolean): T | null
    public firstOrDefault(predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            const value = this.find(predicate)
            if (typeof value === "undefined") {
                return null
            } else {
                return value
            }
        } else {
            return this.length === 0 ? null : this[0]
        }
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
        return Enumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(): T
    public last(predicate: (x: T) => boolean): T
    public last(predicate?: (x: T) => boolean): T {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i]
                if (predicate(value) === true) {
                    return value
                }
            }

            throw new InvalidOperationException(ErrorString.NoMatch)
        } else {
            if (this.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return this[this.length - 1]
        }
    }

    public lastOrDefault(): T | null
    public lastOrDefault(predicate: (x: T) => boolean): T | null
    public lastOrDefault(predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i]
                if (predicate(value) === true) {
                    return value
                }
            }

            return null
        } else {
            return this.length === 0 ? null : this[this.length - 1]
        }
    }

    public max(this: IEnumerable<number>): number | never
    public max(selector: (x: T) => number): number | never
    public max(selector?: (x: T) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            let max = Number.MIN_VALUE

            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i]), max)
            }

            return max
        } else {
            return Math.max.apply(null, this as ArrayEnumerable<any>)
        }
    }

    public min(this: IEnumerable<number>): number | never
    public min(selector: (x: T) => number): number | never
    public min(selector?: (x: T) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            let min = Number.MAX_VALUE

            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i]), min)
            }

            return min
        } else {
            return Math.min.apply(null, this as ArrayEnumerable<any>)
        }
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
    public ofType(type?: string | IConstructor<any>) {
        return Enumerable.ofType(this, type)
    }

    // tslint:enable:ban-types

    public orderBy(predicate: (x: T) => number | string): IOrderedEnumerable<T>
    public orderBy(predicate: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public orderBy(predicate: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public orderBy(predicate: any, comparer?: IComparer<any>) {
        return Enumerable.orderBy(this, predicate, comparer as any)
    }

    public orderByDescending(predicate: (x: T) => number | string): IOrderedEnumerable<T>
    public orderByDescending(predicate: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public orderByDescending(predicate: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public orderByDescending(predicate: any, comparer?: IComparer<any>) {
        return Enumerable.orderByDescending(this, predicate, comparer as any)
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
        return Enumerable.sequenceEquals(this, second, comparer as any)
    }

    public single(): T
    public single(predicate: (x: T) => boolean): T
    public single(predicate?: (x: T) => boolean): T {
        return Enumerable.single(this, predicate as any)
    }

    public singleOrDefault(): T | null
    public singleOrDefault(predicate: (x: T) => boolean): T | null
    public singleOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.singleOrDefault(this, predicate as any)
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
        return Enumerable.sum(this, selector as any)
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
        return Enumerable.union(this, second, comparer as any)
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
        return Enumerable.zip(this, second, resultSelector as any)
    }
}

export class Grouping<TKey, TElement> extends ArrayEnumerable<TElement> {
    public readonly key: TKey
    constructor(key: TKey, startingItem: TElement) {
        super(1)
        this.key = key
        this[0] = startingItem
    }
}

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

    public any(): boolean
    public any(predicate: (x: T) => boolean): boolean
    public any(predicate?: (x: T) => boolean): boolean {
        return Enumerable.any(this, predicate as any)
    }

    public average(this: IEnumerable<number>): number
    public average(selector: (x: T) => number): number
    public average(selector?: (x: T) => number): number {
        return Enumerable.average(this, selector as any)
    }

    public concat(second: IEnumerable<T>): IEnumerable<T> {
        return Enumerable.concat(this, second)
    }

    public contains(value: T): boolean
    public contains(value: T, comparer: IEqualityComparer<T>): boolean
    public contains(value: T, comparer?: IEqualityComparer<T>): boolean {
        return Enumerable.contains(this, value, comparer as any)
    }

    public count(): number
    public count(predicate: (x: T) => boolean): number
    public count(predicate?: (x: T) => boolean): number {
        return Enumerable.count(this, predicate as any)
    }

    public distinct(): IEnumerable<T>
    public distinct(comparer: IEqualityComparer<T>): IEnumerable<T>
    public distinct(comparer?: IEqualityComparer<T>): IEnumerable<T> {
        return Enumerable.distinct(this, comparer as any)
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
        return Enumerable.except(this, second, comparer as any)
    }

    public first(): T
    public first(predicate: (x: T) => boolean): T
    public first(predicate?: (x: T) => boolean): T {
        return Enumerable.first(this, predicate as any)
    }

    public firstOrDefault(): T | null
    public firstOrDefault(predicate: (x: T) => boolean): T | null
    public firstOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.firstOrDefault(this, predicate as any)
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
        return Enumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(): T
    public last(predicate: (x: T) => boolean): T
    public last(predicate?: (x: T) => boolean): T {
        return Enumerable.last(this, predicate as any)
    }

    public lastOrDefault(): T | null
    public lastOrDefault(predicate: (x: T) => boolean): T | null
    public lastOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.lastOrDefault(this, predicate as any)
    }

    public max(this: IEnumerable<number>): number | never
    public max(selector: (x: T) => number): number | never
    public max(selector?: (x: T) => number): number | never {
        return Enumerable.max(this, selector as any)
    }

    public min(this: IEnumerable<number>): number | never
    public min(selector: (x: T) => number): number | never
    public min(selector?: (x: T) => number): number | never {
        return Enumerable.min(this, selector as any)
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
    public ofType(type?: string | IConstructor<any>) {
        return Enumerable.ofType(this, type)
    }

    // tslint:enable:ban-types

    public orderBy(predicate: (x: T) => number | string): IOrderedEnumerable<T>
    public orderBy(predicate: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public orderBy(predicate: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public orderBy(predicate: any, comparer?: IComparer<any>) {
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
    public select<TKey extends keyof T>(key: TKey): IEnumerable<T[TKey]>
    public select(keyOrSelector: any) {
        return Enumerable.select(this, keyOrSelector)
    }

    public selectMany<OUT>(selector: (x: T) => Iterable<OUT>): IEnumerable<OUT> {
        return Enumerable.selectMany(this, selector)
    }

    public sequenceEquals(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): boolean {
        return Enumerable.sequenceEquals(this, second, comparer as any)
    }

    public single(): T
    public single(predicate: (x: T) => boolean): T
    public single(predicate?: (x: T) => boolean): T {
        return Enumerable.single(this, predicate as any)
    }

    public singleOrDefault(): T | null
    public singleOrDefault(predicate: (x: T) => boolean): T | null
    public singleOrDefault(predicate?: (x: T) => boolean): T | null {
        return Enumerable.singleOrDefault(this, predicate as any)
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
        return Enumerable.sum(this, selector as any)
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
        return Enumerable.union(this, second, comparer as any)
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
        return Enumerable.zip(this, second, resultSelector as any)
    }

    public abstract [Symbol.iterator](): IterableIterator<T>
}

export class BasicEnumerable<T> extends BaseEnumerable<T> {
    constructor(private readonly iterator: () => IterableIterator<T>) {
        super()
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this.iterator()
    }
}

class OrderedEnumerableDescending<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {

    private static *unrollAndSort<T>(
        map: RecOrdMap<T>,
        comparer?: IComparer<string | number>): IterableIterator<T> {

        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined)

        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i]
            const values = map.get(key)

            if (values instanceof Map) {
                yield* OrderedEnumerableDescending.unrollAndSort(values as RecOrdMap<T>, comparer)
            } else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values as T[]) {
                    yield value
                }
            }
        }
    }

    private static generate<T>(
        mapFunc: () => RecOrdMap<T>,
        comparer?: IComparer<number | string>): () => IterableIterator<T> {
        return () => OrderedEnumerableDescending.unrollAndSort(mapFunc(), comparer)
    }

    constructor(private readonly map: () => RecOrdMap<T>, comparer?: IComparer<number | string>) {
        super(OrderedEnumerableDescending.generate(map, comparer))
    }

    public getMap(): RecOrdMap<T> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public thenBy(keySelector: any, comparer?: any) {
        return Enumerable.thenBy(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any) {
        return Enumerable.thenByDescending(this, keySelector, comparer)
    }
}

class OrderedEnumerable<T> extends BasicEnumerable<T> implements IOrderedEnumerable<T> {

    private static *unrollAndSort<T>(
        map: RecOrdMap<T>,
        comparer?: IComparer<string | number>): IterableIterator<T> {

        for (const key of [...map.keys()].sort(comparer ? comparer : undefined))
        {
            const values = map.get(key)

            if (values instanceof Map) {
                yield* OrderedEnumerable.unrollAndSort(values as RecOrdMap<T>, comparer)
            } else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values as T[]) {
                    yield value
                }
            }
        }
    }

    private static generate<T>(
        mapFunc: () => RecOrdMap<T>,
        comparer?: IComparer<number | string>): () => IterableIterator<T> {
        return () => OrderedEnumerable.unrollAndSort(mapFunc(), comparer)
    }

    constructor(private readonly map: () => RecOrdMap<T>, comparer?: IComparer<number | string>) {
        super(OrderedEnumerable.generate(map, comparer))
    }

    public getMap(): RecOrdMap<T> {
        return this.map()
    }

    public thenBy(keySelector: (x: T) => string | number): IOrderedEnumerable<T>
    public thenBy(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public thenBy(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public thenBy(keySelector: any, comparer?: any) {
        return Enumerable.thenBy(this, keySelector, comparer)
    }

    public thenByDescending(keySelector: (x: T) => string | number): IOrderedEnumerable<T>
    public thenByDescending(keySelector: (x: T) => number, comparer: IComparer<number>): IOrderedEnumerable<T>
    public thenByDescending(keySelector: (x: T) => string, comparer: IComparer<string>): IOrderedEnumerable<T>
    public thenByDescending(keySelector: any, comparer?: any) {
        return Enumerable.thenByDescending(this, keySelector, comparer)
    }
}

//#endregion

// Enumerable class based on,
// https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx

export class Enumerable {

    public static aggregate<TSource>(
        source: IEnumerable<TSource>,
        func: (x: TSource, y: TSource) => TSource): TSource
    public static aggregate<TSource, TAccumulate>(
        source: IEnumerable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate
    public static aggregate<TSource, TAccumulate, TResult>(
        source: IEnumerable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): TResult
    public static aggregate<TSource, TAccumulate, TResult>(
        source: IEnumerable<TSource>,
        seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
        func?: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector?: (x: TAccumulate) => TResult): TSource | TAccumulate | TResult | null {
        if (resultSelector) {
            if (typeof func === "undefined") {
                throw new ReferenceError(`TAccumulate function is undefined`)
            }

            return Enumerable.aggregate_3(source, seedOrFunc as TAccumulate, func, resultSelector)
        } else if (func) {
            return Enumerable.aggregate_2(source, seedOrFunc as TAccumulate, func)
        } else {
            return Enumerable.aggregate_1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
        }
    }

    private static aggregate_1<TSource>(
        source: IEnumerable<TSource>,
        func: (x: TSource, y: TSource) => TSource): TSource | null {
        let aggregateValue: TSource | undefined

        for (const value of source)
        {
            if (aggregateValue) {
                aggregateValue = func(aggregateValue, value)
            } else {
                aggregateValue = value
            }
        }

        if (typeof aggregateValue === "undefined") {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return aggregateValue
    }

    private static aggregate_2<TSource, TAccumulate>(
        source: IEnumerable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate {
        let aggregateValue = seed

        for (const value of source) {
            aggregateValue = func(aggregateValue, value)
        }

        return aggregateValue
    }

    private static aggregate_3<TSource, TAccumulate, TResult>(
        source: IEnumerable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): TResult {
        let aggregateValue = seed

        for (const value of source) {
            aggregateValue = func(aggregateValue, value)
        }

        return resultSelector(aggregateValue)
    }

    public static all<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): boolean {
        for (const item of source) {
            if (predicate(item) === false) {
                return false
            }
        }

        return true
    }

    public static any<TSource>(source: IEnumerable<TSource>): boolean
    public static any<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): boolean
    public static any<TSource>(
        source: IEnumerable<TSource>,
        predicate?: (x: TSource) => boolean): boolean {
        if (predicate) {
            return Enumerable.any_2(source, predicate)
        } else {
            return Enumerable.any_1(source)
        }
    }

    private static any_1<TSource>(source: IEnumerable<TSource>): boolean {
        for (const _ of source) {
            return true
        }

        return false
    }

    private static any_2<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): boolean {
        for (const item of source) {
            if (predicate(item) === true) {
                return true
            }
        }

        return false
    }

    public static average(source: IEnumerable<number>): number
    public static average<TSource>(source: IEnumerable<TSource>, selector: (x: TSource) => number): number
    public static average<TSource>(
        source: IEnumerable<TSource> | IEnumerable<number>,
        selector?: (x: TSource) => number): number {
        if (selector) {
            return Enumerable.average_2(source as IEnumerable<TSource>, selector)
        } else {
            return Enumerable.average_1(source as IEnumerable<number>)
        }
    }

    private static average_1(source: IEnumerable<number>): number {
        let value: number | undefined
        let count: number | undefined
        for (const item of source) {
            value = (value || 0) + item
            count = (count || 0) + 1
        }

        if (typeof value === "undefined") {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return value / (count as number)
    }

    private static average_2<TSource>(source: IEnumerable<TSource>, func: (x: TSource) => number): number {
        let value: number | undefined
        let count: number | undefined
        for (const item of source) {
            value = (value || 0) + func(item)
            count = (count || 0) + 1
        }

        if (typeof value === "undefined") {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return value / (count as number)
    }

    public static concat<TSource>(first: IEnumerable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource> {
        function* iterator() {
            yield* first
            yield* second
        }

        return new BasicEnumerable(iterator)
    }

    public static contains<TSource>(
        source: IEnumerable<TSource>,
        value: TSource): boolean
    public static contains<TSource>(
        source: IEnumerable<TSource>,
        value: TSource,
        comparer: IEqualityComparer<TSource>): boolean
    public static contains<TSource>(
        source: IEnumerable<TSource>,
        value: TSource,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

        for (const item of source) {
            if (comparer(value, item)) {
                return true
            }
        }

        return false
    }

    public static count<TSource>(source: IEnumerable<TSource>): number
    public static count<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): number
    public static count<TSource>(source: IEnumerable<TSource>, predicate?: (x: TSource) => boolean): number {
        if (predicate) {
            return Enumerable.count_2(source, predicate)
        } else {
            return Enumerable.count_1(source)
        }
    }

    private static count_1<T>(source: IEnumerable<T>): number {
        let count = 0

        for (const _ of source) {
            count++
        }

        return count
    }

    private static count_2<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): number {
        let count = 0
        for (const value of source) {
            if (predicate(value) === true) {
                count++
            }
        }
        return count
    }

    public static distinct<TSource>(
        source: IEnumerable<TSource>): IEnumerable<TSource>
    public static distinct<TSource>(
        source: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource>): IEnumerable<TSource>
    public static distinct<TSource>(
        source: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> {

        function* iterator() {
            const distinctElements: TSource[] = []
            for (const item of source) {

                const foundItem = distinctElements.find((x) => comparer(x, item))

                if (!foundItem) {
                    distinctElements.push(item)
                    yield item
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static elementAt<TSource>(source: IEnumerable<TSource>, index: number): TSource {
        let i = 0
        for (const item of source) {
            if (index === i++) {
                return item
            }
        }

        throw new ArgumentOutOfRangeException("index")
    }

    public static elementAtOrDefault<TSource>(source: IEnumerable<TSource>, index: number): TSource | null {
        let i = 0
        for (const item of source) {
            if (index === i++) {
                return item
            }
        }

        return null
    }

    public static enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>> {
        function *iterable() {
            /* tslint:disable */
            for (let key in source) {
                yield {
                    first: key,
                    second: source[key]
                }
            }
            /* tslint: enable */
        }

        return new BasicEnumerable(iterable)
    }

    public static except<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>): IEnumerable<TSource>;
    public static except<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource>): IEnumerable<TSource>;
    public static except<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = EqualityComparer): IEnumerable<TSource> {

        function *iterator() {
            const secondArray = [...second]

            for (let firstItem of first) {

                let exists = false
                for (let j = 0; j < secondArray.length; j++) {
                    const secondItem = secondArray[j]

                    if (comparer(firstItem, secondItem) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    yield firstItem
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static first<TSource>(source: IEnumerable<TSource>): TSource;
    public static first<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): TSource;
    public static first<TSource>(source: IEnumerable<TSource>, predicate?: (x: TSource) => boolean): TSource {
        if (predicate) {
            return Enumerable.first_2(source, predicate)
        } else {
            return Enumerable.first_1(source)
        }
    }

    private static first_1<T>(source: IEnumerable<T>) {
        const first = source[Symbol.iterator]().next()

        if (first.done === true) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return first.value
    }

    private static first_2<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): T {
        for (let value of source) {
            if (predicate(value) === true) {
                return value
            }
        }

        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    public static firstOrDefault<T>(source: IEnumerable<T>): T | null;
    public static firstOrDefault<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): T | null;
    public static firstOrDefault<T>(source: IEnumerable<T>, predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            return Enumerable.firstOrDefault_2(source, predicate)
        } else {
            return Enumerable.firstOrDefault_1(source)
        }
    }

    private static firstOrDefault_1<T>(source: IEnumerable<T>): T | null {
        const first = source[Symbol.iterator]().next()
        return first.value || null
    }

    private static firstOrDefault_2<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): T | null {
        for (let value of source) {
            if (predicate(value) === true) {
                return value
            }
        }

        return null
    }

    public static flatten<TSource>(source: IEnumerable<TSource | Iterable<TSource>>): IEnumerable<TSource>;
    public static flatten<TSource>(source: IEnumerable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>;
    public static flatten<TSource>(source: IEnumerable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>;
    public static flatten<TSource>(source: IEnumerable<TSource | Iterable<TSource>>, shallow?: boolean): IEnumerable<TSource | Iterable<TSource>> {

        function* iterator(source: Iterable<any>): IterableIterator<TSource | Iterable<TSource>> {
            for (let item of source) {
                // JS string is an Iterable.
                // We exclude it from being flattened
                if (item[Symbol.iterator] !== undefined && typeof item !== "string") {
                    yield* shallow ? item : iterator(item)
                } else {
                    yield item
                }
            }
        }

        return new BasicEnumerable(() => iterator(source))
    }

    public static each<TSource>(source: IEnumerable<TSource>, action: (x: TSource) => void): IEnumerable<TSource> {
        for (let value of source) {
            action(value)
        }

        return source
    }

    public static groupBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>;
    public static groupBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>;
    public static groupBy<TSource, TKey>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>;
    public static groupBy<TSource, TKey>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey | string | number, TSource>> {

        if (comparer) {
            return Enumerable.groupBy_0<TSource, TKey>(source,
                keySelector as (x: TSource) => TKey, comparer)
        } else {
            return Enumerable.groupBy_0_Simple(source,
                keySelector as ((x: TSource) => number) | ((x: TSource) => string))
        }
    }

    private static groupBy_0_Simple<TSource>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
            IEnumerable<IGrouping<string | number, TSource>> {

        function *iterator(): IterableIterator<IGrouping<string | number, TSource>> {
            const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
            for (let value of source) {

                const key = keySelector(value)
                const grouping: Grouping<string | number, TSource> = keyMap[key]

                if (grouping) {
                    grouping.push(value)
                } else {
                    keyMap[key] = new Grouping<string | number, TSource>(key, value)
                }
            }

            for (const value in keyMap) {
                yield keyMap[value]
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static groupBy_0<TSource, TKey> (
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>> {

        function generate(): IterableIterator<IGrouping<TKey, TSource>> {

            const keyMap = new Array<Grouping<TKey, TSource>>()

            for (const value of source) {
                const key = keySelector(value)
                let found = false

                for (let i = 0; i < keyMap.length; i++) {
                    const group = keyMap[i];
                    if (comparer(group.key, key)) {
                        group.push(value)
                        found = true
                        break
                    }
                }

                if (found === false) {
                    keyMap.push(new Grouping<TKey, TSource>(key, value))
                }

            }

            return new ArrayIterator(keyMap)
        }

        return new BasicEnumerable(generate)
    }

    public static groupByWithSel<TSource, TElement>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>
    public static groupByWithSel<TSource, TElement>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
    public static groupByWithSel<TSource, TKey, TElement>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey | string | number, TElement>> {

        if (comparer) {
            return Enumerable.GroupBy_1(source,
                keySelector as (x: TSource) => TKey, elementSelector, comparer)
        } else {
            return Enumerable.GroupBy_1_Simple(source,
                keySelector as (x: TSource) => number | string, elementSelector)
        }
    }

    private static GroupBy_1_Simple<TSource, TElement>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string | number,
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string | number, TElement>> {

        function *generate(): IterableIterator<IGrouping<string | number, TElement>> {
            const keyMap: { [key: string]: Grouping<string | number, TElement> } = {}
            for (const value of source) {

                const key = keySelector(value)
                const grouping: Grouping<string | number, TElement> = keyMap[key]
                const element = elementSelector(value)

                if (grouping) {
                    grouping.push(element)
                } else {
                    keyMap[key] = new Grouping<string | number, TElement>(key, element)
                }
            }

            /* tslint:disable:forin */
            for (const value in keyMap) {
                yield keyMap[value]
            }
            /* tslint:enable */
        }

        return new BasicEnumerable(generate)
    }

    private static GroupBy_1<TSource, TKey, TElement>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>> {

        function generate(): IterableIterator<IGrouping<TKey, TElement>> {
            const keyMap = new Array<Grouping<TKey, TElement>>()
            for (const value of source) {
                const key = keySelector(value)
                let found = false

                for (let i = 0; i < keyMap.length; i++) {
                    const group = keyMap[i]
                    if (comparer(group.key, key)) {
                        group.push(elementSelector(value))
                        found = true
                        break
                    }
                }

                if (found === false) {
                    const element = elementSelector(value)
                    keyMap.push(new Grouping<TKey, TElement>(key, element))
                }

            }

            return new ArrayIterator(keyMap)
        }

        return new BasicEnumerable(generate)
    }

    public static groupByWithResult<TSource, TResult>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        resultSelector: (x: string, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
    public static groupByWithResult<TSource, TResult>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        resultSelector: (x: string, values: IEnumerable<TSource>) => TResult,
        comparer: IEqualityComparer<string>): IEnumerable<TResult>

    public static groupByWithResult<TSource, TResult>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        resultSelector: (x: number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
    public static groupByWithResult<TSource, TResult>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        resultSelector: (x: number, values: IEnumerable<TSource>) => TResult,
        comparer: IEqualityComparer<number>): IEnumerable<TResult>

    public static groupByWithResult<TSource, TKey, TResult>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
    public static groupByWithResult<TSource, TKey, TResult>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
        comparer: IEqualityComparer<TKey>): IEnumerable<TResult>

    public static groupByWithResult<TSource, TKey, TResult>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
        resultSelector: (x: string | number | TKey, values: IEnumerable<TSource>) => TResult,
        comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {

        if (comparer) {
            return Enumerable.GroupBy_2(source,
                keySelector as (x: TSource) => TKey,
                resultSelector,
                comparer)
        } else {
            return Enumerable.GroupBy_2_Simple(source,
                keySelector as ((x: TSource) => string) | ((x: TSource) => number),
                resultSelector)
        }
    }

    private static GroupBy_2_Simple<TSource, TResult>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number),
        resultSelector: (x: string | number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult> {

        function *iterator(): IterableIterator<TResult> {
            const groupByResult = Enumerable.groupBy_0_Simple(source, keySelector)

            for (const group of groupByResult) {
                yield resultSelector(group.key, group)
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static GroupBy_2<TSource, TKey, TResult>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

        function *iterator(): IterableIterator<TResult> {
            const groupByResult = Enumerable.groupBy_0(source, keySelector, comparer)

            for (const group of groupByResult) {
                yield resultSelector(group.key, group)
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static GroupByWithResultAndSelector<TSource, TKey, TElement, TResult>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement,
        resultSelector: ((key: TKey, values: IEnumerable<TElement>) => TResult) |
            ((key: string | number, values: IEnumerable<TElement>) => TResult),
        comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
        if (comparer) {
            return Enumerable.GroupBy_3(source,
                keySelector as (x: TSource) => TKey,
                elementSelector,
                resultSelector as (key: TKey, values: IEnumerable<TElement>) => TResult)
        } else {
            return Enumerable.GroupBy_3_Simple(source,
                keySelector as ((x: TSource) => string) | ((x: TSource) => number),
                elementSelector,
                resultSelector as (key: string | number, values: IEnumerable<TElement>) => TResult)
        }
    }

    private static GroupBy_3<TSource, TKey, TElement, TResult>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        resultSelector: (key: TKey, values: IEnumerable<TElement>) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

        function *iterator(): IterableIterator<TResult> {
            const groupByResult = Enumerable.GroupBy_1(source, keySelector, elementSelector, comparer)

            for (const group of groupByResult) {
                yield resultSelector(group.key, group)
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static GroupBy_3_Simple<TSource, TElement, TResult>(
        source: IEnumerable<TSource>,
        keySelector: ((x: TSource) => string) | ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement,
        resultSelector: (key: string | number, values: IEnumerable<TElement>) => TResult): IEnumerable<TResult> {

        function *iterator(): IterableIterator<TResult> {
            const groupByResult = Enumerable.GroupBy_1_Simple(source, keySelector, elementSelector)

            for (const group of groupByResult) {
                yield resultSelector(group.key, group)
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static join<TOuter, TInner, TKey, TResult>(
        outer: IEnumerable<TOuter>,
        inner: IEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult): IEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: IEnumerable<TOuter>,
        inner: IEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey>): IEnumerable<TResult>
    public static join<TOuter, TInner, TKey, TResult>(
        outer: IEnumerable<TOuter>,
        inner: IEnumerable<TInner>,
        outerKeySelector: (x: TOuter) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: TOuter, y: TInner) => TResult,
        comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {
        function *iterator(): IterableIterator<TResult> {
            const innerArray = [...inner]
            for (const o of outer) {
                const outerKey = outerKeySelector(o)

                for (const i of innerArray) {
                    const innerKey = innerKeySelector(i)
                    if (comparer(outerKey, innerKey) === true) {
                        yield resultSelector(o, i)
                    }
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static intersect<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>): IEnumerable<TSource>
    public static intersect<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource>): IEnumerable<TSource>
    public static intersect<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> {

        function *iterator(): IterableIterator<TSource> {

            const firstResults = [...first.distinct(comparer)]

            if (firstResults.length === 0) {
                return
            }

            const secondResults = [...second]

            for (let i = 0; i < firstResults.length; i++) {
                const firstValue = firstResults[i]

                for (let j = 0; j < secondResults.length; j++) {
                    const secondValue = secondResults[j]

                    if (comparer(firstValue, secondValue) === true) {
                        yield firstValue
                        break
                    }
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static partition<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): TSource[][] {
        const fail: TSource[] = []
        const pass: TSource[] = []

        for (const value of source) {
            if (predicate(value) === true) {
                pass.push(value)
            } else {
                fail.push(value)
            }
        }

        return [fail, pass]
    }

    public static select<TSource, TResult>(
        source: IEnumerable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>
    public static select<TSource, TKey extends keyof TSource>(
        source: IEnumerable<TSource>, key: TKey): IEnumerable<TSource[TKey]>
    public static select<T, Y>(source: IEnumerable<T>, selector: (x: T) => Y | string): IEnumerable<any> {

        if (typeof selector === "string") {
            return Enumerable.select_2(source, selector)
        } else {
            return Enumerable.select_1(source, selector)
        }
    }

    private static select_1<TSource, TResult>(
        source: IEnumerable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult> {
        function* iterator() {
            for (const value of source) {
                yield selector(value)
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static select_2<TSource, TKey extends keyof TSource>(
        source: IEnumerable<TSource>, key: TKey): IEnumerable<TSource[TKey]> {
        function* iterator() {
            for (const value of source) {
                yield value[key]
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static selectMany<TSource, Y>(
        source: IEnumerable<TSource>,
        selector: (x: TSource) => Iterable<Y>): IEnumerable<Y> {
        function* iterator() {
            for (const value of source) {
                for (const selectorValue of selector(value)){
                    yield selectorValue
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static single<TSource>(source: IEnumerable<TSource>): TSource
    public static single<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): TSource
    public static single<TSource>(source: IEnumerable<TSource>, predicate?: (x: TSource) => boolean): TSource {
        if (predicate) {
            return Enumerable.single_2(source, predicate)
        } else {
            return Enumerable.single_1(source)
        }
    }

    private static single_1<TSource>(source: IEnumerable<TSource>): TSource {
        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }

        if (hasValue === false) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return singleValue as TSource
    }

    private static single_2<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): TSource {
        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
            if (predicate(value)) {
                if (hasValue === true) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else {
                    hasValue = true
                    singleValue = value
                }
            }
        }

        if (hasValue === false) {
            throw new InvalidOperationException(ErrorString.NoMatch)
        }

        return singleValue as TSource
    }

    public static singleOrDefault<TSource>(source: IEnumerable<TSource>): TSource | null
    public static singleOrDefault<TSource>(
        source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): TSource | null
    public static singleOrDefault<TSource>(
        source: IEnumerable<TSource>,
        predicate?: (x: TSource) => boolean): TSource | null {

        if (predicate) {
            return Enumerable.singleOrDefault_2(source, predicate)
        } else {
            return Enumerable.singleOrDefault_1(source)
        }
    }

    private static singleOrDefault_1<TSource>(source: IEnumerable<TSource>): TSource | null {
        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }

        return singleValue
    }

    private static singleOrDefault_2<TSource>(
        source: IEnumerable<TSource>,
        predicate: (x: TSource) => boolean): TSource | null {

        let hasValue = false
        let singleValue: TSource | null = null

        for (const value of source) {
            if (predicate(value)) {
                if (hasValue === true) {
                    throw new InvalidOperationException(ErrorString.MoreThanOneElement)
                } else {
                    hasValue = true
                    singleValue = value
                }
            }
        }

        return singleValue
    }

    public static skipWhile<TSource>(
        source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): IEnumerable<TSource>
    public static skipWhile<TSource>(
        source: IEnumerable<TSource>, predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>
    public static skipWhile<TSource>(
        source: IEnumerable<TSource>,
        predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IEnumerable<TSource> {

        if (predicate.length === 1) {
            return Enumerable.skipWhile_1(source, predicate as any)
        } else {
            return Enumerable.skipWhile_2(source, predicate)
        }
    }

    private static skipWhile_1<TSource>(
        source: IEnumerable<TSource>,
        predicate: (x: TSource) => boolean): IEnumerable<TSource> {

        function* iterator() {
            let skip = true
            for (const item of source) {

                if (skip === false) {
                    yield item
                } else if (predicate(item) === false) {
                    skip = false
                    yield item
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static skipWhile_2<TSource>(
        source: IEnumerable<TSource>,
        predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {

        function* iterator() {
            let index = 0
            let skip = true
            for (const item of source) {

                if (skip === false) {
                    yield item
                } else if (predicate(item, index) === false) {
                    skip = false
                    yield item
                }

                index++
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static skip<TSource>(source: IEnumerable<TSource>, count: number): IEnumerable<TSource> {

        function* iterator() {
            let i = 0
            for (const item of source) {
                if (i++ >= count) {
                    yield item
                }
            }
        }

        return new BasicEnumerable<TSource>(iterator)
    }

    public static empty<TSource>(): IEnumerable<TSource> {
        const iterator = function*() {
            for (const x of [] as TSource[]) {
                yield x
            }
        }
        return new BasicEnumerable(iterator)
    }

    public static last<TSource>(source: IEnumerable<TSource>): TSource
    public static last<TSource>(source: IEnumerable<TSource>, predicate: (x: TSource) => boolean): TSource
    public static last<TSource>(source: IEnumerable<TSource>, predicate?: (x: TSource) => boolean): TSource {
        if (predicate) {
            return Enumerable.last_2(source, predicate)
        } else {
            return Enumerable.last_1(source)
        }
    }

    private static last_1<T>(source: IEnumerable<T>): T {
        let last: T | null = null

        for (const value of source) {
            last = value
        }

        if (!last) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return last
    }

    private static last_2<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): T {
        let last: T | null = null

        for (const value of source) {
            if (predicate(value) === true) {
                last = value
            }
        }

        if (!last) {
            throw new InvalidOperationException(ErrorString.NoMatch)
        }

        return last
    }

    public static lastOrDefault<T>(source: IEnumerable<T>): T | null
    public static lastOrDefault<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): T | null
    public static lastOrDefault<T>(source: IEnumerable<T>, predicate?: (x: T) => boolean): T | null {

        if (predicate) {
            return Enumerable.lastOrDefault_2(source, predicate)
        } else {
            return Enumerable.lastOrDefault_1(source)
        }
    }

    private static lastOrDefault_1<T>(source: IEnumerable<T>): T | null {
        let last: T | null = null

        for (const value of source) {
            last = value
        }

        return last
    }

    private static lastOrDefault_2<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): T | null {

        let last: T | null = null

        for (const value of source) {
            if (predicate(value) === true) {
                last = value
            }
        }

        return last
    }

    public static max(source: IEnumerable<number>): number
    public static max<TSource>(source: IEnumerable<TSource>, selector: (x: TSource) => number): number
    public static max<TSource>(
        source: IEnumerable<TSource> | IEnumerable<number>,
        selector?: (x: TSource) => number): number {
        if (selector) {
            return Enumerable.max_2<TSource>(source as IEnumerable<TSource>, selector)
        } else {
            return Enumerable.max_1(source as IEnumerable<number>)
        }
    }

    private static max_1(source: IEnumerable<number>): number {
        let max: number | null = null
        for (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, item)
        }

        if (max === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return max
        }
    }

    private static max_2<TSource>(source: IEnumerable<TSource>, selector: (x: TSource) => number): number {
        let max: number | null = null
        for (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, selector(item))
        }

        if (max === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return max
        }
    }

    public static min(source: IEnumerable<number>): number
    public static min<TSource>(source: IEnumerable<TSource>, selector: (x: TSource) => number): number
    public static min(source: IEnumerable<number>, selector?: (x: number) => number): number {
        if (selector) {
            return Enumerable.min_2(source, selector)
        } else {
            return Enumerable.min_1(source)
        }
    }

    private static min_1(source: IEnumerable<number>) {
        let min: number | null = null
        for (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, item)
        }

        if (min === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return min
        }
    }

    private static min_2(source: IEnumerable<number>, selector: (x: number) => number) {
        let min: number | null = null
        for (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, selector(item))
        }

        if (min === null) {
            throw new InvalidOperationException(ErrorString.NoElements)
        } else {
            return min
        }
    }

    public static ofType<TSource, TResult>(
        source: IEnumerable<TSource>,
        type?: IConstructor<TResult> | string): IEnumerable<TResult> {

        if (!type) {
            return source as any
        }

        const typeCheck: (x: TSource) => boolean = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof type)

        function *iterator(): IterableIterator<TResult> {
            for (const item of source) {
                if (typeCheck(item)) {
                    yield item as any
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static orderByInner<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number | string): () => Map<number | string, TSource[]> {
        return function lazyMap(): Map<number | string, TSource[]> {
            const map = new Map<number | string, TSource[]>()
            for (const item of source) {
                const key = keySelector(item)
                const currentMapping = map.get(key)

                if (currentMapping) {
                    currentMapping.push(item)
                } else {
                    map.set(key, [item])
                }
            }

            return map
        }
    }

    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedEnumerable<TSource>
    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedEnumerable<TSource>
    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedEnumerable<TSource>
    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedEnumerable<TSource>
    public static orderBy<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number | string,
        comparer?: IComparer<number | string>): IOrderedEnumerable<TSource> {
        return new OrderedEnumerable(Enumerable.orderByInner(source, keySelector), comparer)
    }

    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedEnumerable<TSource>
    public static orderByDescending<TSource>(
        source: IEnumerable<TSource>,
        keySelector: (x: TSource) => number | string,
        comparer?: IComparer<number | string>): IOrderedEnumerable<TSource> {
        return new OrderedEnumerableDescending(Enumerable.orderByInner(source, keySelector), comparer)
    }

    public static range(start: number, count: number): IEnumerable<number> {
        function* iterator() {
            const max = start + count
            for (let i = start; i < max; i++) {
                yield i
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static repeat<T>(element: T, count: number): IEnumerable<T> {
        function* iterator() {
            for (let i = 0; i < count; i++) {
                yield element
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static reverse<TSource>(source: IEnumerable<TSource>): IEnumerable<TSource> {
        function* iterator() {
            for (const x of [...source].reverse()) {
                yield x
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static sequenceEquals<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>): boolean
    public static sequenceEquals<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource>): boolean
    public static sequenceEquals<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

        const firstIterator = first[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        let firstResult = firstIterator.next()
        let secondResult = secondIterator.next()

        while (!firstResult.done && !secondResult.done) {
            if (!comparer(firstResult.value, secondResult.value)) {
                return false
            }

            firstResult = firstIterator.next()
            secondResult = secondIterator.next()
        }

        return firstResult.done && secondResult.done
    }

    public static sum(source: IEnumerable<number>): number
    public static sum<TSource>(source: IEnumerable<TSource>, selector: (x: TSource) => number): number
    public static sum<TSource>(
        source: IEnumerable<number> | IEnumerable<TSource>,
        selector?: (x: TSource) => number): number {

        if (selector) {
            return Enumerable.sum_2(source as IEnumerable<TSource>, selector)
        } else {
            return Enumerable.sum_1(source as IEnumerable<number>)
        }
    }

    private static sum_1(source: IEnumerable<number>): number {
        let sum = 0
        for (const value of source) {
            sum += value
        }

        return sum
    }

    private static sum_2<TSource>(source: IEnumerable<TSource>, selector: (x: TSource) => number): number {
        let sum = 0
        for (const value of source) {
            sum += selector(value)
        }

        return sum
    }

    public static take<T>(source: IEnumerable<T>, amount: number): IEnumerable<T> {

        function* iterator() {
            // negative amounts should yield empty
            let amountLeft = amount > 0 ? amount : 0
            for (const item of source) {
                if (amountLeft-- === 0) {
                    break
                } else {
                    yield item
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    public static takeWhile<T>(
        source: IEnumerable<T>,
        predicate: (x: T) => boolean): IEnumerable<T>
    public static takeWhile<T>(
        source: IEnumerable<T>,
        predicate: (x: T, index: number) => boolean): IEnumerable<T>
    public static takeWhile<T>(
        source: IEnumerable<T>,
        predicate: ((x: T) => boolean) | ((x: T, index: number) => boolean)): IEnumerable<T> {

        if (predicate.length === 1) {
            return Enumerable.takeWhile_1(source, predicate as (x: T) => boolean)
        } else {
            return Enumerable.takeWhile_2(source, predicate as (x: T, index: number) => boolean)
        }
    }

    private static takeWhile_1<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
        function* iterator() {
            for (const item of source) {
                if (predicate(item)) {
                    yield item
                } else {
                    break
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    private static takeWhile_2<T>(source: IEnumerable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        function* iterator() {
            let index = 0
            for (const item of source) {
                if (predicate(item, index++)) {
                    yield item
                } else {
                    break
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedEnumerable<TSource>
    public static thenBy<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number | string>): IOrderedEnumerable<TSource> {

        function sortInnerMost(item: TSource[] | RecOrdMap<TSource>): RecOrdMap<TSource> {

            if (item instanceof Map) {
                for (const key of item.keys())
                {
                    item.set(key, sortInnerMost(item.get(key) as TSource[] | RecOrdMap<TSource>))
                }

                return item
            } else {
                const map = new Map<number | string, TSource[]>()
                for (let i = 0; i < item.length; i++) {
                    const value = item[i]
                    const key = keySelector(value)

                    const mapping = map.get(key)
                    if (mapping) {
                        mapping.push(value)
                    } else {
                        map.set(key, [value])
                    }
                }

                return map
            }
        }

        return new OrderedEnumerable(() => sortInnerMost(source.getMap()), comparer)
    }

    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => string): IOrderedEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => string,
        comparer: IComparer<string>): IOrderedEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => number): IOrderedEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: (x: TSource) => number,
        comparer: IComparer<number>): IOrderedEnumerable<TSource>
    public static thenByDescending<TSource>(
        source: IOrderedEnumerable<TSource>,
        keySelector: ((x: TSource) => number) | ((x: TSource) => string),
        comparer?: IComparer<number | string>): IOrderedEnumerable<TSource> {

        function sortInnerMost(item: TSource[] | RecOrdMap<TSource>): RecOrdMap<TSource> {

            if (item instanceof Map) {
                for (const key of item.keys())
                {
                    item.set(key, sortInnerMost(item.get(key) as TSource[] | RecOrdMap<TSource>))
                }

                return item
            } else {
                const map = new Map<number | string, TSource[]>()
                for (let i = 0; i < item.length; i++) {
                    const value = item[i]
                    const key = keySelector(value)

                    const mapping = map.get(key)
                    if (mapping) {
                        mapping.push(value)
                    } else {
                        map.set(key, [value])
                    }
                }

                return map
            }
        }

        return new OrderedEnumerableDescending(() => sortInnerMost(source.getMap()), comparer)
    }

    public static toArray<TSource>(source: IEnumerable<TSource>): TSource[] {
        return [...source]
    }

    public static toMap<K, V>(source: IEnumerable<V>, selector: (x: V) => K): Map<K, V[]> {
        const map = new Map<K, V[]>()

        for (const value of source) {
            const key = selector(value)
            const array = map.get(key)

            if (typeof array === "undefined") {
                map.set(key, [value])
            } else {
                array.push(value)
            }
        }

        return map
    }

    public static toObject<TSource>(
        source: IEnumerable<TSource>,
        selector: (x: TSource) => string): {[key: string]: TSource} {

        const map: {[key: string]: TSource} = {}

        for (const value of source) {
            map[selector(value)] = value
        }

        return map
    }

    public static toSet<TSource>(source: IEnumerable<TSource>): Set<TSource> {
        return new Set<TSource>(source)
    }

    public static union<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>): IEnumerable<TSource>
    public static union<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource>): IEnumerable<TSource>
    public static union<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
            if (comparer) {
                return Enumerable.union_2(first, second, comparer)
            } else {
                return Enumerable.union_1(first, second)
            }
    }

    private static union_1<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>) {

        function* iterator() {

            const set = new Set<TSource>()

            for (const item of first) {
                if (set.has(item) === false) {
                    yield item
                    set.add(item)
                }
            }

            for (const item of second) {
                if (set.has(item) === false) {
                    yield item
                    set.add(item)
                }
            }
        }

        return new BasicEnumerable<TSource>(iterator)
    }

    private static union_2<TSource>(
        first: IEnumerable<TSource>,
        second: IEnumerable<TSource>,
        comparer: IEqualityComparer<TSource>) {

        function *iterator(): IterableIterator<TSource> {
            const result: TSource[] = []

            for (const source of [first, second]) {
                for (const value of source) {
                    let exists = false

                    for (const resultValue of result) {
                        if (comparer(value, resultValue) === true) {
                            exists = true
                            break
                        }
                    }

                    if (exists === false) {
                        yield value
                        result.push(value)
                    }
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    public static where<T>(
        source: IEnumerable<T>,
        predicate: (x: T) => boolean): IEnumerable<T>
    public static where<T>(
        source: IEnumerable<T>,
        predicate: (x: T, index: number) => boolean): IEnumerable<T>
    public static where<T>(
        source: IEnumerable<T>,
        predicate: ((x: T) => boolean) | ((x: T, index: number) => boolean)): IEnumerable<T> {
        if (predicate.length === 1) {
            return Enumerable.where_1(source, predicate as (x: T) => boolean)
        } else {
            return Enumerable.where_2(source, predicate as (x: T, index: number) => boolean)
        }
    }

    private static where_1<T>(source: IEnumerable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
        function* iterator() {
            for (const item of source) {
                if (predicate(item) === true) {
                    yield item
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    private static where_2<T>(source: IEnumerable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
        function* iterator() {
            let i = 0
            for (const item of source) {
                if (predicate(item, i++) === true) {
                    yield item
                }
            }
        }

        return new BasicEnumerable<T>(iterator)
    }

    public static zip<T, Y>(
        source: IEnumerable<T>,
        second: Iterable<Y>): IEnumerable<ITuple<T, Y>>
    public static zip<T, Y, OUT>(
        source: IEnumerable<T>,
        second: Iterable<Y>,
        resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT>
    public static zip<T, Y, OUT>(
        source: IEnumerable<T>,
        second: Iterable<Y>,
        resultSelector?: (x: T, y: Y) => OUT): IEnumerable<OUT> | IEnumerable<ITuple<T, Y>> {
        if (resultSelector) {
            return Enumerable.zip_2(source, second, resultSelector)
        } else {
            return Enumerable.zip_1(source, second)
        }
    }

    private static zip_1<T, Y>(source: IEnumerable<T>, second: Iterable<Y>): IEnumerable<ITuple<T, Y>> {
        function* iterator() {
            const firstIterator = source[Symbol.iterator]()
            const secondIterator = second[Symbol.iterator]()

            while (true) {
                const a = firstIterator.next()
                const b = secondIterator.next()

                if (a.done && b.done) {
                    break
                } else {
                    yield AsTuple(a.value, b.value)
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    private static zip_2<T, Y, OUT>(
        source: IEnumerable<T>,
        second: Iterable<Y>,
        resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT> {
        function* iterator() {
            const firstIterator = source[Symbol.iterator]()
            const secondIterator = second[Symbol.iterator]()

            while (true) {
                const a = firstIterator.next()
                const b = secondIterator.next()

                if (a.done && b.done) {
                    break
                } else {
                    yield resultSelector(a.value, b.value)
                }
            }
        }

        return new BasicEnumerable(iterator)
    }

    private constructor() {
        /* */
    }
}
