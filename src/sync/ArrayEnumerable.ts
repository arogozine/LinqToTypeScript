import { from as parallelFrom } from "../parallel/parallel"
import { ArgumentOutOfRangeException } from "../shared/ArgumentOutOfRangeException"
import { ErrorString } from "../shared/ErrorString"
import { InvalidOperationException } from "../shared/InvalidOperationException"
import {
    IAsyncEnumerable,
    IAsyncEqualityComparer,
    IComparer,
    IEnumerable,
    IEqualityComparer,
    IGrouping,
    InferType,
    IOrderedAsyncEnumerable, IOrderedEnumerable, IParallelEnumerable, OfType, ParallelGeneratorType } from "../types"
import { aggregate } from "./_private/aggregate"
import { allAsync } from "./_private/allAsync"
import { anyAsync } from "./_private/anyAsync"
import { asAsync } from "./_private/asAsync"
import { average } from "./_private/average"
import { averageAsync } from "./_private/averageAsync"
import { contains } from "./_private/contains"
import { containsAsync } from "./_private/containsAsync"
import { countAsync } from "./_private/countAsync"
import { distinct } from "./_private/distinct"
import { distinctAsync } from "./_private/distinctAsync"
import { each } from "./_private/each"
import { eachAsync } from "./_private/eachAsync"
import { except } from "./_private/except"
import { exceptAsync } from "./_private/exceptAsync"
import { firstAsync } from "./_private/firstAsync"
import { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync"
import { groupBy } from "./_private/groupBy"
import { groupByAsync } from "./_private/groupByAsync"
import { groupByWithSel } from "./_private/groupByWithSel"
import { intersect } from "./_private/intersect"
import { intersectAsync } from "./_private/intersectAsync"
import { join } from "./_private/join"
import { lastAsync } from "./_private/lastAsync"
import { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync"
import { maxAsync } from "./_private/maxAsync"
import { minAsync } from "./_private/minAsync"
import { ofType } from "./_private/ofType"
import { orderBy } from "./_private/orderBy"
import { orderByAsync } from "./_private/orderByAsync"
import { orderByDescending } from "./_private/orderByDescending"
import { orderByDescendingAsync } from "./_private/orderByDescendingAsync"
import { select } from "./_private/select"
import { selectAsync } from "./_private/selectAsync"
import { selectMany } from "./_private/selectMany"
import { selectManyAsync } from "./_private/selectManyAsync"
import { sequenceEquals } from "./_private/sequenceEquals"
import { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync"
import { single } from "./_private/single"
import { singleAsync } from "./_private/singleAsync"
import { singleOrDefault } from "./_private/singleOrDefault"
import { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync"
import { skip } from "./_private/skip"
import { skipWhile } from "./_private/skipWhile"
import { skipWhileAsync } from "./_private/skipWhileAsync"
import { sum } from "./_private/sum"
import { sumAsync } from "./_private/sumAsync"
import { take } from "./_private/take"
import { takeWhile } from "./_private/takeWhile"
import { takeWhileAsync } from "./_private/takeWhileAsync"
import { toArray } from "./_private/toArray"
import { toMap } from "./_private/toMap"
import { toMapAsync } from "./_private/toMapAsync"
import { toSet } from "./_private/toSet"
import { union } from "./_private/union"
import { unionAsync } from "./_private/unionAsync"
import { where } from "./_private/where"
import { whereAsync } from "./_private/whereAsync"
import { zip } from "./_private/zip"
import { zipAsync } from "./_private/zipAsync"
import { BasicEnumerable } from "./BasicEnumerable"

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
        return aggregate(this, seedOrFunc, func as any, resultSelector as any)
    }

    public all(predicate: (x: TSource) => boolean): boolean {
        return super.every(predicate)
    }

    public allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return allAsync(this, predicate)
    }

    public any(predicate?: (x: TSource) => boolean): boolean {
        if (predicate) {
            return this.some(predicate)
        } else {
            return this.length !== 0
        }
    }

    public anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return anyAsync(this, predicate)
    }

    public asAsync(): IAsyncEnumerable<TSource> {
        return asAsync(this)
    }

    public asParallel(): IParallelEnumerable<TSource> {
        return parallelFrom(ParallelGeneratorType.PromiseToArray, async () => this)
    }

    public average(this: IEnumerable<number>): number
    public average(selector: (x: TSource) => number): number
    public average(selector?: (x: TSource) => number): number {
        return average(this, selector as any)
    }

    public averageAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return averageAsync(this, selector)
    }

    public concat(items: IEnumerable<TSource>): IEnumerable<TSource>
    public concat(...items: Array<ReadonlyArray<TSource>>): ArrayEnumerable<TSource>
    public concat(...items: Array<TSource | ReadonlyArray<TSource>>): ArrayEnumerable<TSource>
    public concat(): IEnumerable<TSource> | TSource[] {
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
        return contains(this, value, comparer)
    }

    public containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return containsAsync(this, value, comparer)
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
        return countAsync(this, predicate)
    }

    public distinct(comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        return distinct(this, comparer)
    }

    public distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return distinctAsync(this, comparer)
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
        return except(this, second, comparer)
    }

    public exceptAsync(second: Iterable<TSource>,
                       comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return exceptAsync(this, second, comparer)
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
        return firstAsync(this, predicate)
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
        return firstOrDefaultAsync(this, predicate)
    }

    public each(action: (x: TSource) => void): IEnumerable<TSource> {
        return each(this, action)
    }

    public eachAsync(action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
        return eachAsync(this, action)
    }

    public groupBy(keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>
    public groupBy(keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>> {
        return groupBy(this, keySelector, comparer as any)
    }

    public groupByAsync<TKey>(
        keySelector: (x: TSource) => TKey | Promise<TKey>,
        comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {
        return groupByAsync(this, keySelector, comparer as any)
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
        return groupByWithSel(this, keySelector, elementSelector, comparer as any)
    }

    public intersect(second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        return intersect(this, second, comparer)
    }

    public intersectAsync(second: IEnumerable<TSource>,
                          comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return intersectAsync(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
            inner: IEnumerable<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
        return join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
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
        return lastAsync(this, predicate)
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
        return lastOrDefaultAsync(this, predicate)
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
        return maxAsync(this, selector)
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
        return minAsync(this, selector)
    }

    public ofType<TType extends OfType>(type: TType): IEnumerable<InferType<TType>> {
        return ofType(this, type)
    }

    public orderBy<TKey>(predicate: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
        return orderBy(this, predicate, comparer)
    }

    public orderByAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
        return orderByAsync(this, predicate, comparer)
    }

    public orderByDescending<TKey>(
        predicate: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
        return orderByDescending(this, predicate, comparer)
    }

    public orderByDescendingAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
        return orderByDescendingAsync(this, predicate, comparer)
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
        return select(this, keyOrSelector)
    }

    public selectAsync<OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>
    public selectAsync<TKey extends keyof TSource, TResult>(
        this: IEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IAsyncEnumerable<TResult>
    public selectAsync(keyOrSelector: any): IAsyncEnumerable<any> {
        return selectAsync(this, keyOrSelector)
    }

    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
        this: IEnumerable<TBindedSource>,
        selector: keyof TBindedSource): IEnumerable<TOut>
    public selectMany<OUT>(selector: (x: TSource) => Iterable<OUT>): IEnumerable<OUT>
    public selectMany<TOut>(selector: any): IEnumerable<TOut> {
        return selectMany(this, selector)
    }

    public selectManyAsync<OUT>(selector: (x: TSource) => Promise<Iterable<OUT>>): IAsyncEnumerable<OUT> {
        return selectManyAsync(this, selector)
    }

    public sequenceEquals(second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): boolean {
        return sequenceEquals(this, second, comparer)
    }

    public sequenceEqualsAsync(second: IEnumerable<TSource>,
                               comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return sequenceEqualsAsync(this, second, comparer)
    }

    public single(predicate?: (x: TSource) => boolean): TSource {
        return single(this, predicate)
    }

    public singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return singleAsync(this, predicate)
    }

    public singleOrDefault(predicate?: (x: TSource) => boolean): TSource | null {
        return singleOrDefault(this, predicate)
    }

    public singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return singleOrDefaultAsync(this, predicate)
    }

    public skip(count: number): IEnumerable<TSource> {
        return skip(this, count)
    }

    public skipWhile(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {
        return skipWhile(this, predicate)
    }

    public skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return skipWhileAsync(this, predicate)
    }

    public sum(this: IEnumerable<number>): number
    public sum(selector: (x: TSource) => number): number
    public sum(selector?: (x: TSource) => number): number {
        return sum(this, selector as any)
    }

    public sumAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return sumAsync(this, selector)
    }

    public take(amount: number): IEnumerable<TSource> {
        return take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {
        return takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return takeWhileAsync(this, predicate)
    }

    public toArray(): TSource[] {
        return toArray(this)
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Map<TKey, TSource[]> {
        return toMap(this, selector)
    }

    public toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>> {
        return toMapAsync(this, selector)
    }

    public toSet(): Set<TSource> {
        return toSet(this)
    }

    public union(second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        return union(this, second, comparer)
    }

    public unionAsync(second: Iterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
        return unionAsync(this, second, comparer)
    }

    public where(predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {
        return where(this, predicate)
    }

    public whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
        return whereAsync(this, predicate)
    }

    public zip<TSecond>(second: Iterable<TSecond>): IEnumerable<[TSource, TSecond]>
    public zip<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IEnumerable<TResult>
    public zip<TSecond>(second: Iterable<TSecond>, resultSelector?: (x: TSource, y: TSecond) => any): any {
        return zip(this, second, resultSelector as any)
    }

    public zipAsync<TSecond, TResult>(
        second: Iterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> {
        return zipAsync(this, second, resultSelector)
    }
}
