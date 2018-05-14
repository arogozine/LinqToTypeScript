import { IOrderedParallelEnumerable } from ".."
import { IAsyncEnumerable } from "../async/IAsyncEnumerable"
import {
    IAsyncParallel,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    ITuple,
    OfType,
    StrictEqualityComparer,
} from "../shared/shared"
import { IAsyncEqualityComparer } from "./../shared/IAsyncEqualityComparer"
import { IParallelEnumerable } from "./IParallelEnumerable"
import { ParallelEnumerable } from "./ParallelEnumerable"
import { TypedData } from "./TypedData"

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
        return ParallelEnumerable.aggregate(this, seed, func, resultSelector)
    }

    public all(predicate: (x: TSource) => boolean): Promise<boolean> {
        return ParallelEnumerable.all(this, predicate)
    }

    public allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return ParallelEnumerable.allAsync(this, predicate)
    }

    public async any(predicate?: (x: TSource) => boolean): Promise<boolean> {
        return ParallelEnumerable.any(this, predicate)
    }

    public async anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
        return ParallelEnumerable.anyAsync(this, predicate)
    }

    public asAsync(): IAsyncEnumerable<TSource> {
        return ParallelEnumerable.asAsync(this)
    }

    public average(this: IParallelEnumerable<number>): Promise<number>
    public average(selector: (x: TSource) => number): Promise<number>
    public average(selector?: any): Promise<number> {
        return ParallelEnumerable.average(this, selector)
    }

    public averageAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return ParallelEnumerable.averageAsync(this, selector)
    }

    public concat(second: IAsyncParallel<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.concat(this, second)
    }

    public async contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return ParallelEnumerable.contains(this, value, comparer)
    }

    public count(predicate?: (x: TSource) => boolean): Promise<number> {
        return ParallelEnumerable.count(this, predicate)
    }

    public async countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number> {
        return ParallelEnumerable.countAsync(this, predicate)
    }

    public distinct(comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {
        return ParallelEnumerable.distinct(this, comparer)
    }

    public distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.distinctAsync(this, comparer)
    }

    public each(action: (x: TSource) => void): IParallelEnumerable<TSource> {
        return ParallelEnumerable.each(this, action)
    }

    public eachAsync(action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.eachAsync(this, action)
    }

    public async elementAt(index: number): Promise<TSource> {
        return ParallelEnumerable.elementAt(this, index)
    }

    public async elementAtOrDefault(index: number): Promise<TSource | null> {
        return ParallelEnumerable.elementAtOrDefault(this, index)
    }

    public except(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.except(this, second, comparer)
    }

    public first(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return ParallelEnumerable.first(this, predicate)
    }

    public async firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return ParallelEnumerable.firstAsync(this, predicate)
    }

    public firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return ParallelEnumerable.firstOrDefault(this, predicate)
    }

    public async firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return ParallelEnumerable.firstOrDefaultAsync(this, predicate)
    }

    public groupBy(keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>
    public groupBy(keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>
    public groupBy<TKey>(
        keySelector: (x: TSource) => TKey,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
    public groupBy(keySelector: any, comparer?: any): IParallelEnumerable<any> {
        return ParallelEnumerable.groupBy(this, keySelector, comparer)
    }

    public groupByWithSel<TElement>(
        keySelector: (x: TSource) => number,
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>
    public groupByWithSel<TElement>(
        keySelector: (x: TSource) => string,
        elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>
    public groupByWithSel<TKey, TElement>(
        keySelector: (x: TSource) => TKey,
        elementSelector: (x: TSource) => TElement,
        comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>
    public groupByWithSel(keySelector: any, elementSelector: any, comparer?: any): IParallelEnumerable<any> {
        return ParallelEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer)
    }

    public intersect(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.intersect(this, second, comparer)
    }

    public joinByKey<TInner, TKey, TResult>(
        inner: IAsyncParallel<TInner>,
        outerKeySelector: (x: TSource) => TKey,
        innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult> {
        return ParallelEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer as any)
    }

    public last(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return ParallelEnumerable.last(this, predicate)
    }

    public async lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return ParallelEnumerable.lastAsync(this, predicate)
    }

    public async lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return ParallelEnumerable.lastOrDefault(this, predicate)
    }

    public async lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return ParallelEnumerable.lastOrDefaultAsync(this, predicate)
    }

    public async max(this: IParallelEnumerable<number>): Promise<number>
    public async max(selector: (x: TSource) => number): Promise<number>
    public async max(selector?: any): Promise<number> {
        return ParallelEnumerable.max(this, selector)
    }

    public async maxAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return ParallelEnumerable.maxAsync(this, selector)
    }

    public async min(this: IParallelEnumerable<number>): Promise<number>
    public async min(selector: (x: TSource) => number): Promise<number>
    public async min(selector?: any): Promise<number> {
        return ParallelEnumerable.min(this, selector)
    }

    public async minAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return ParallelEnumerable.minAsync(this, selector)
    }

    public ofType<TType extends OfType>(type: TType): IParallelEnumerable<InferType<TType>> {
        return ParallelEnumerable.ofType(this, type)
    }

    public orderBy<TKey>(predicate: (x: TSource) => TKey,
                         comparer: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
        return ParallelEnumerable.orderBy(this, predicate, comparer)
    }

    public orderByAsync<TKey>(predicate: (x: TSource) => Promise<TKey>,
                              comparer: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
        return ParallelEnumerable.orderByAsync(this, predicate, comparer)
    }

    public orderByDescending<TKey>(predicate: (x: TSource) => TKey,
                                   comparer: IComparer<TKey>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.orderByDescending(this, predicate, comparer)
    }

    public orderByDescendingAsync<TKey>(predicate: (x: TSource) => Promise<TKey>,
                                        comparer: IComparer<TKey>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.orderByDescendingAsync(this, predicate, comparer)
    }

    public reverse(): IParallelEnumerable<TSource> {
        return ParallelEnumerable.reverse(this)
    }

    public select<OUT>(selector: (x: TSource) => OUT): IParallelEnumerable<OUT>
    public select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>
    public select<OUT>(key: string | ((x: TSource) => OUT)): IParallelEnumerable<any> {
        return ParallelEnumerable.select(this, key as any)
    }

    public selectAsync<OUT>(selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>
    public selectAsync<TKey extends keyof TSource, TResult>(
        this: IParallelEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IParallelEnumerable<TResult>
    public selectAsync<OUT>(keyOrSelector: string | ((x: TSource) => Promise<OUT>)): IParallelEnumerable<OUT> {
        return ParallelEnumerable.selectAsync<any, OUT>(this, keyOrSelector as any)
    }

    public selectMany<OUT>(
        selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>
    public selectMany<TBindedSource extends { [key: string]: Iterable<TOut> }, TOut>(
        this: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>
    public selectMany<OUT>(selector: ((x: TSource) => Iterable<OUT>) | string): IParallelEnumerable<OUT> {
        return ParallelEnumerable.selectMany(this as any, selector as any)
    }

    public selectManyAsync<OUT>(
        selector: (x: TSource) => Promise<Iterable<OUT>>): IParallelEnumerable<OUT> {
        return ParallelEnumerable.selectManyAsync(this, selector)
    }

    public sequenceEquals(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): Promise<boolean> {
        return ParallelEnumerable.sequenceEquals(this, second, comparer)
    }

    public sequenceEqualsAsync(
        second: IAsyncParallel<TSource>,
        comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
        return ParallelEnumerable.sequenceEqualsAsync(this, second, comparer)
    }

    public async single(predicate?: (x: TSource) => boolean): Promise<TSource> {
        return ParallelEnumerable.single(this, predicate)
    }

    public async singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
        return ParallelEnumerable.singleAsync(this, predicate)
    }

    public singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null> {
        return ParallelEnumerable.singleOrDefault(this, predicate)
    }

    public async singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {
        return ParallelEnumerable.singleOrDefaultAsync(this, predicate)
    }

    public skip(count: number): IParallelEnumerable<TSource> {
        return ParallelEnumerable.skip(this, count)
    }

    public skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return ParallelEnumerable.skipWhile(this, predicate)
    }

    public skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.skipWhileAsync(this, predicate)
    }

    public sum(this: IParallelEnumerable<number>): Promise<number>
    public sum(selector: (x: TSource) => number): Promise<number>
    public sum(selector?: any): Promise<number> {
        return ParallelEnumerable.sum(this, selector)
    }

    public sumAsync(selector: (x: TSource) => Promise<number>): Promise<number> {
        return ParallelEnumerable.sumAsync(this, selector)
    }

    public take(amount: number): IParallelEnumerable<TSource> {
        return ParallelEnumerable.take(this, amount)
    }

    public takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return ParallelEnumerable.takeWhile(this, predicate)
    }

    public takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.takeWhileAsync(this, predicate)
    }

    public toArray(): Promise<TSource[]> {
        return ParallelEnumerable.toArray(this)
    }

    public toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>> {
        return ParallelEnumerable.toMap(this, selector)
    }

    public toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>> {
        return ParallelEnumerable.toMapAsync(this, selector)
    }

    public toSet(): Promise<Set<TSource>> {
        return ParallelEnumerable.toSet(this)
    }

    public union(
        second: IAsyncParallel<TSource>,
        comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.union(this, second, comparer)
    }

    public unionAsync(
        second: IAsyncParallel<TSource>,
        comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.unionAsync(this, second, comparer)
    }

    public where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
        return ParallelEnumerable.where(this, predicate)
    }

    public whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
        return ParallelEnumerable.whereAsync(this, predicate)
    }

    public zip<TSecond, TResult>(
        second: IParallelEnumerable<TSource> | IAsyncEnumerable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>
    public zip<TSecond>(
        second: IAsyncEnumerable<TSecond> | IParallelEnumerable<TSecond>): IParallelEnumerable<ITuple<TSource, TSecond>>
    public zip(second: any, resultSelector?: any): IParallelEnumerable<any> {
        return ParallelEnumerable.zip(this, second, resultSelector)
    }

    public zipAsync<TSecond, TResult>(
        second: IAsyncParallel<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult> {
        return ParallelEnumerable.ZipAsync(this, second, resultSelector)
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TSource> {
        const thisOuter = this
        async function *iterator() {
            const values = await thisOuter.toArray()
            for (const value of values) {
                yield value
            }
        }

        return iterator()
    }
}
