import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
import { from as parallelFrom, IParallelEnumerable } from "../parallel/parallel"
import { ParallelGeneratorType } from "../parallel/ParallelGeneratorType"
import { IAsyncEnumerable } from "./../async/async"
import {
    ArgumentOutOfRangeException,
    ErrorString,
    IAsyncEqualityComparer,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    InvalidOperationException,
    ITuple,
    OfType} from "./../shared/shared"
import { BasicEnumerable } from "./BasicEnumerable"
import * as Enumerable from "./Enumerable"
import { IEnumerable } from "./IEnumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"

/**
 * Array backed Enumerable
 */
export class ArrayEnumerable<TSource> extends Array<TSource> implements IEnumerable<TSource> {
    public aggregate(func: (x: TSource, y: TSource) => TSource): TSource
    public aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate
    public aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): TSource
    public aggregate<TAccumulate, TResult>(
        seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
        func?: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector?: (x: TAccumulate) => TResult): TSource | TAccumulate | TResult {
        return Enumerable.aggregate(this, seedOrFunc, func as any, resultSelector as any)
    }

    public all(predicate: (x: TSource) => boolean): boolean {
        return super.every(predicate)
    }

    public allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return Enumerable.allAsync(this, predicate)
    }

    public any(predicate?: (x: TSource) => boolean): boolean {
        if (predicate) {
            return this.some(predicate)
        } else {
            return this.length !== 0
        }
    }

    public anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return Enumerable.anyAsync(this, predicate)
    }

    public asAsync(): IAsyncEnumerable<TSource> {
        return Enumerable.asAsync(this)
    }

    public asParallel(): IParallelEnumerable<TSource> {
        return parallelFrom(ParallelGeneratorType.PromiseToArray, async () => this)
    }

    public average(this: IEnumerable<number>): number
    public average(selector: (x: TSource) => number): number
    public average(selector?: (x: TSource) => number): number {
        return Enumerable.average(this, selector as any)
    }

    public averageAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return Enumerable.averageAsync(this, selector)
    }

    public concat(items: IEnumerable<TSource>): IEnumerable<TSource>
    public concat(...items: Array<ReadonlyArray<TSource>>): ArrayEnumerable<TSource>
    public concat(...items: Array<TSource | ReadonlyArray<TSource>>): ArrayEnumerable<TSource>
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

    public contains(value: TSource, comparer?: IEqualityComparer<TSource>): boolean {
        return Enumerable.contains(this, value, comparer)
    }

    public containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return Enumerable.containsAsync(this, value, comparer)
    }

    public count(): number
    public count(predicate: (x: TSource) => boolean): number
    public count(predicate?: (x: TSource) => boolean): number {
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

    public countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number> {
        return Enumerable.countAsync(this, predicate)
    }

    public distinct(comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        return Enumerable.distinct(this, comparer)
    }

    public distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return Enumerable.distinctAsync(this, comparer)
    }

    public elementAt(index: number): TSource {
        if (index < 0 || index >= this.length) {
            throw new ArgumentOutOfRangeException("index")
        }

        return this[index]
    }

    public elementAtOrDefault(index: number): TSource | null {
        return this[index] || null
    }

    public except(second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        return Enumerable.except(this, second, comparer)
    }

    public exceptAsync(second: Iterable<TSource>,
                       comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return Enumerable.exceptAsync(this, second, comparer)
    }

    public first(predicate?: (x: TSource) => boolean): TSource {
        if (predicate) {
            const value = this.find(predicate)
            if (value === undefined) {
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

    public firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return Enumerable.firstAsync(this, predicate)
    }

    public firstOrDefault(): TSource | null
    public firstOrDefault(predicate: (x: TSource) => boolean): TSource | null
    public firstOrDefault(predicate?: (x: TSource) => boolean): TSource | null {
        if (predicate) {
            const value = this.find(predicate)
            if (value === undefined) {
                return null
            } else {
                return value
            }
        } else {
            return this.length === 0 ? null : this[0]
        }
    }

    public firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return Enumerable.firstOrDefaultAsync(this, predicate)
    }

    public each(action: (x: TSource) => void): IEnumerable<TSource> {
        return Enumerable.each(this, action)
    }

    public eachAsync(action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
        return Enumerable.eachAsync(this, action)
    }

    public groupBy(keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>
    public groupBy(keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>> {
        return Enumerable.groupBy(this, keySelector, comparer as any)
    }

    public groupByAsync<TKey>(
        keySelector: (x: TSource) => TKey | Promise<TKey>,
        comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {
        return Enumerable.groupByAsync(this, keySelector, comparer as any)
    }

    public groupByWithSel<TElement>(
        keySelector: ((x: TSource) => number),
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>
    public groupByWithSel<TElement>(
        keySelector: ((x: TSource) => string),
        elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: ((x: TSource) => TKey),
        elementSelector: (x: TSource) => TElement,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>> {
        return Enumerable.groupByWithSel(this, keySelector, elementSelector, comparer as any)
    }

    public intersect(second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        return Enumerable.intersect(this, second, comparer)
    }

    public intersectAsync(second: IEnumerable<TSource>,
                          comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return Enumerable.intersectAsync(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
            inner: IEnumerable<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
        return Enumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: TSource) => boolean): TSource {
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

    public lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return Enumerable.lastAsync(this, predicate)
    }

    public lastOrDefault(predicate?: (x: TSource) => boolean): TSource | null {
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

    public lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return Enumerable.lastOrDefaultAsync(this, predicate)
    }

    public max(this: IEnumerable<number>): number | never
    public max(selector: (x: TSource) => number): number | never
    public max(selector?: (x: TSource) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            let max = Number.NEGATIVE_INFINITY

            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i]), max)
            }

            return max
        } else {
            return Math.max.apply(null, this as ArrayEnumerable<any>)
        }
    }

    public maxAsync(selector: (x: TSource) => Promise<number>): Promise<number | never> {
        return Enumerable.maxAsync(this, selector)
    }

    public min(this: IEnumerable<number>): number | never
    public min(selector: (x: TSource) => number): number | never
    public min(selector?: (x: TSource) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            let min = Number.POSITIVE_INFINITY

            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i]), min)
            }

            return min
        } else {
            return Math.min.apply(null, this as ArrayEnumerable<any>)
        }
    }

    public minAsync(selector: (x: TSource) => Promise<number>): Promise<number | never> {
        return Enumerable.minAsync(this, selector)
    }

    public ofType<TType extends OfType>(type: TType): IEnumerable<InferType<TType>> {
        return Enumerable.ofType(this, type)
    }

    public orderBy<TKey>(predicate: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
        return Enumerable.orderBy(this, predicate, comparer)
    }

    public orderByAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
        return Enumerable.orderByAsync(this, predicate, comparer)
    }

    public orderByDescending<TKey>(
        predicate: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
        return Enumerable.orderByDescending(this, predicate, comparer)
    }

    public orderByDescendingAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
        return Enumerable.orderByDescendingAsync(this, predicate, comparer)
    }

    public reverse(): ArrayEnumerable<TSource> {
        super.reverse()
        return this
    }

    public select<OUT>(selector: (x: TSource) => OUT): IEnumerable<OUT>
    public select<TKey extends keyof TSource>(
        this: IEnumerable<{ [key: string]: TSource[TKey]}>,
        selector: TKey): IEnumerable<TSource[TKey]>
    public select(keyOrSelector: any): IEnumerable<any> {
        return Enumerable.select(this, keyOrSelector)
    }

    public selectAsync<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>
    public selectAsync<TKey extends keyof TSource, TResult>(
        this: IEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IAsyncEnumerable<TResult>
    public selectAsync(keyOrSelector: any): IAsyncEnumerable<any> {
        return Enumerable.selectAsync(this, keyOrSelector)
    }

    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
        this: IEnumerable<TBindedSource>,
        selector: keyof TBindedSource): IEnumerable<TOut>
    public selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IEnumerable<OUT>
    public selectMany<TOut>(selector: any): IEnumerable<TOut> {
        return Enumerable.selectMany(this, selector)
    }

    public selectManyAsync<OUT>(selector: (x: TSource) => Promise<Iterable<OUT>>): IAsyncEnumerable<OUT> {
        return Enumerable.selectManyAsync(this, selector)
    }

    public sequenceEquals(second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): boolean {
        return Enumerable.sequenceEquals(this, second, comparer)
    }

    public sequenceEqualsAsync(second: IEnumerable<TSource>,
                               comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return Enumerable.sequenceEqualsAsync(this, second, comparer)
    }

    public single(predicate?: (x: TSource) => boolean): TSource {
        return Enumerable.single(this, predicate)
    }

    public singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return Enumerable.singleAsync(this, predicate)
    }

    public singleOrDefault(predicate?: (x: TSource) => boolean): TSource | null {
        return Enumerable.singleOrDefault(this, predicate)
    }

    public singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return Enumerable.singleOrDefaultAsync(this, predicate)
    }

    public skip(count: number): IEnumerable<TSource> {
        return Enumerable.skip(this, count)
    }

    public skipWhile(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {
        return Enumerable.skipWhile(this, predicate)
    }

    public skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return Enumerable.skipWhileAsync(this, predicate)
    }

    public sum(this: IEnumerable<number>): number
    public sum(selector: (x: TSource) => number): number
    public sum(selector?: (x: TSource) => number): number {
        return Enumerable.sum(this, selector as any)
    }

    public sumAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return Enumerable.sumAsync(this, selector)
    }

    public take(amount: number): IEnumerable<TSource> {
        return Enumerable.take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {
        return Enumerable.takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return Enumerable.takeWhileAsync(this, predicate)
    }

    public toArray(): TSource[] {
        return Enumerable.toArray(this)
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Map<TKey, TSource[]> {
        return Enumerable.toMap(this, selector)
    }

    public toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>> {
        return Enumerable.toMapAsync(this, selector)
    }

    public toSet(): Set<TSource> {
        return Enumerable.toSet(this)
    }

    public union(second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        return Enumerable.union(this, second, comparer)
    }

    public unionAsync(second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return Enumerable.unionAsync(this, second, comparer)
    }

    public where(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {
        return Enumerable.where(this, predicate)
    }

    public whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return Enumerable.whereAsync(this, predicate)
    }

    public zip<TSecond>(second: Iterable<TSecond>): IEnumerable<ITuple<TSource, TSecond>>
    public zip<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IEnumerable<TResult>
    public zip<TSecond>(second: Iterable<TSecond>, resultSelector?: (x: TSource, y: TSecond) => any): any {
        return Enumerable.zip(this, second, resultSelector as any)
    }

    public zipAsync<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> {
        return Enumerable.zipAsync(this, second, resultSelector)
    }
}
