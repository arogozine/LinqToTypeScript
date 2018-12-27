import {
    StrictEqualityComparer,
} from "../shared/shared"
import {
    IAsyncEnumerable,
    IAsyncEqualityComparer,
    IAsyncParallel,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    IOrderedParallelEnumerable,
    IParallelEnumerable,
    OfType, ParallelGeneratorType, SelectorKeyType, TypedData } from "../types"
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
/*
import { max } from "./_private/max"
import { maxAsync } from "./_private/maxAsync"
import { min } from "./_private/min"
import { minAsync } from "./_private/minAsync"
*/
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
    asAsync,
    concat,
    distinct, distinctAsync,
    each, eachAsync, except, exceptAsync,
    groupBy, groupByAsync, groupByWithSel,
    intersect, intersectAsync,
    join,
    max, maxAsync, min, minAsync,
    ofType, orderBy, orderByAsync, orderByDescending, orderByDescendingAsync,
    reverse,
    select, selectAsync, selectMany, selectManyAsync, sequenceEquals, sequenceEqualsAsync,
    skip, skipWhile, skipWhileAsync,
    take, takeWhile, takeWhileAsync,
    union, unionAsync,
    where, whereAsync,
    zip, zipAsync,
} from "./ParallelEnumerable"

/**
 * Base implementation of IParallelEnumerable<T>
 * @private
 */
export class BasicParallelEnumerable<TSource> implements IParallelEnumerable<TSource> {
    public readonly dataFunc: TypedData<TSource>

    public constructor(dataFunc: TypedData<TSource>) {
        this.dataFunc = dataFunc
    }

    public aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>
    public aggregate<TAccumulate>(
        seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
    public aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): Promise<TResult>
    public async aggregate(seed: any, func?: any, resultSelector?: any): Promise<any> {
        return aggregate(this, seed, func, resultSelector)
    }

    public all(predicate: (x: TSource) => boolean): Promise<boolean> {
        return all(this, predicate)
    }

    public allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return allAsync(this, predicate)
    }

    public async any(predicate?: (x: TSource) => boolean): Promise<boolean> {
        return any(this, predicate)
    }

    public async anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return anyAsync(this, predicate)
    }

    public asAsync(): IAsyncEnumerable<TSource> {
        return asAsync(this)
    }

    public average(this: IParallelEnumerable<number>): Promise<number>
    public average(selector: (x: TSource) => number): Promise<number>
    public average(selector?: any): Promise<number> {
        return average(this, selector)
    }

    public averageAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return averageAsync(this, selector)
    }

    public concat(second: IAsyncParallel<TSource>): IParallelEnumerable<TSource> {
        return concat(this, second)
    }

    public async contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return contains(this, value, comparer)
    }

    public async containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return containsAsync(this, value, comparer)
    }

    public count(predicate?: (x: TSource) => boolean): Promise<number> {
        return count(this, predicate)
    }

    public async countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number> {
        return countAsync(this, predicate)
    }

    public distinct(comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {
        return distinct(this, comparer)
    }

    public distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return distinctAsync(this, comparer)
    }

    public each(action: (x: TSource) => void): IParallelEnumerable<TSource> {
        return each(this, action)
    }

    public eachAsync(action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource> {
        return eachAsync(this, action)
    }

    public async elementAt(index: number): Promise<TSource> {
        return elementAt(this, index)
    }

    public async elementAtOrDefault(index: number): Promise<TSource | null> {
        return elementAtOrDefault(this, index)
    }

    public except(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return except(this, second, comparer)
    }

    public exceptAsync(
        second: IAsyncParallel<TSource>,
        comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return exceptAsync(this, second, comparer)
    }

    public first(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return first(this, predicate)
    }

    public async firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return firstAsync(this, predicate)
    }

    public firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return firstOrDefault(this, predicate)
    }

    public async firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return firstOrDefaultAsync(this, predicate)
    }

    public groupBy<TKey extends SelectorKeyType>(
        keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
    public groupBy(keySelector: any, comparer?: any): IParallelEnumerable<any> {
        return groupBy(this, keySelector, comparer)
    }

    public groupByAsync<TKey>(
        keySelector: (x: TSource) => Promise<TKey> | TKey,
        comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>)
        : IParallelEnumerable<IGrouping<TKey, TSource>> {
        return groupByAsync(this, keySelector, comparer as any)
    }

    public groupByWithSel<TElement, TKey extends SelectorKeyType>(
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel(keySelector: any, elementSelector: any, comparer?: any): IParallelEnumerable<any> {
        return groupByWithSel(this, keySelector, elementSelector, comparer)
    }

    public intersect(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return intersect(this, second, comparer)
    }

    public intersectAsync(
        second: IAsyncParallel<TSource>,
        comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return intersectAsync(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
        inner: IAsyncParallel<TInner>,
        outerKeySelector: (x: TSource) => TKey,
        innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult> {
        return join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return last(this, predicate)
    }

    public async lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return lastAsync(this, predicate)
    }

    public async lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return lastOrDefault(this, predicate)
    }

    public async lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return lastOrDefaultAsync(this, predicate)
    }

    public async max(this: IParallelEnumerable<number>): Promise<number>
    public async max(selector: (x: TSource) => number): Promise<number>
    public async max(selector?: any): Promise<number> {
        return max(this, selector)
    }

    public async maxAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return maxAsync(this, selector)
    }

    public async min(this: IParallelEnumerable<number>): Promise<number>
    public async min(selector: (x: TSource) => number): Promise<number>
    public async min(selector?: any): Promise<number> {
        return min(this, selector)
    }

    public async minAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return minAsync(this, selector)
    }

    public ofType<TType extends OfType>(type: TType): IParallelEnumerable<InferType<TType>> {
        return ofType(this, type)
    }

    public orderBy<TKey>(predicate: (x: TSource) => TKey,
                         comparer: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
        return orderBy(this, predicate, comparer)
    }

    public orderByAsync<TKey>(predicate: (x: TSource) => Promise<TKey>,
                              comparer: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
        return orderByAsync(this, predicate, comparer)
    }

    public orderByDescending<TKey>(predicate: (x: TSource) => TKey,
                                   comparer: IComparer<TKey>): IParallelEnumerable<TSource> {
        return orderByDescending(this, predicate, comparer)
    }

    public orderByDescendingAsync<TKey>(predicate: (x: TSource) => Promise<TKey>,
                                        comparer: IComparer<TKey>): IParallelEnumerable<TSource> {
        return orderByDescendingAsync(this, predicate, comparer)
    }

    public reverse(): IParallelEnumerable<TSource> {
        return reverse(this)
    }

    public select<OUT>(selector: (x: TSource) => OUT): IParallelEnumerable<OUT>
    public select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>
    public select<OUT>(key: string | ((x: TSource) => OUT)): IParallelEnumerable<any> {
        return select(this, key as any)
    }

    public selectAsync<OUT>(selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>
    public selectAsync<TKey extends keyof TSource, TResult>(
        this: IParallelEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IParallelEnumerable<TResult>
    public selectAsync<OUT>(keyOrSelector: string | ((x: TSource) => Promise<OUT>)): IParallelEnumerable<OUT> {
        return selectAsync<any, OUT>(this, keyOrSelector as any)
    }

    public selectMany<TResult>(
        selector: (x: TSource, index: number) => Iterable<TResult>): IParallelEnumerable<TResult>
    public selectMany<TBindedSource extends { [key: string]: Iterable<TResult> }, TResult>(
        this: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TResult>
    public selectMany<OUT>(selector: any): IParallelEnumerable<OUT> {
        return selectMany(this, selector)
    }

    public selectManyAsync<OUT>(
        selector: (x: TSource) => Promise<Iterable<OUT>>): IParallelEnumerable<OUT> {
        return selectManyAsync(this, selector)
    }

    public sequenceEquals(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return sequenceEquals(this, second, comparer)
    }

    public sequenceEqualsAsync(
        second: IAsyncParallel<TSource>,
        comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return sequenceEqualsAsync(this, second, comparer)
    }

    public async single(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return single(this, predicate)
    }

    public async singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return singleAsync(this, predicate)
    }

    public singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return singleOrDefault(this, predicate)
    }

    public async singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return singleOrDefaultAsync(this, predicate)
    }

    // tslint:disable-next-line:no-shadowed-variable
    public skip(count: number): IParallelEnumerable<TSource> {
        return skip(this, count)
    }

    public skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return skipWhile(this, predicate)
    }

    public skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        return skipWhileAsync(this, predicate)
    }

    public sum(this: IParallelEnumerable<number>): Promise<number>
    public sum(selector: (x: TSource) => number): Promise<number>
    public sum(selector?: any): Promise<number> {
        return sum(this, selector)
    }

    public sumAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return sumAsync(this, selector)
    }

    public take(amount: number): IParallelEnumerable<TSource> {
        return take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
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

    public union(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return union(this, second, comparer)
    }

    public unionAsync(
        second: IAsyncParallel<TSource>,
        comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return unionAsync(this, second, comparer)
    }

    public where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return where(this, predicate)
    }

    public whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        return whereAsync(this, predicate)
    }

    public zip<TSecond, TResult>(
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>
    public zip<TSecond>(
        second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSecond>): IParallelEnumerable<[TSource, TSecond]>
    public zip(second: any, resultSelector?: any): IParallelEnumerable<any> {
        return zip(this, second, resultSelector)
    }

    public zipAsync<TSecond, TResult>(
        second: IAsyncParallel<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult> {
        return zipAsync(this, second, resultSelector)
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TSource> {
        const thisOuter = this
        async function *iterator() {
            const dataFunc = thisOuter.dataFunc
            switch (dataFunc.type) {
                case ParallelGeneratorType.ArrayOfPromises:
                    for (const value of dataFunc.generator()) {
                        yield value
                    }
                    break
                case ParallelGeneratorType.PromiseOfPromises:
                    for (const value of await dataFunc.generator()) {
                        yield value
                    }
                    break
                case ParallelGeneratorType.PromiseToArray:
                default:
                    for (const value of await dataFunc.generator()) {
                        yield value
                    }
                    break
            }
        }

        return iterator()
    }
}
