import {
    IAsyncEnumerable,
    IAsyncEqualityComparer,
    IAsyncParallel,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    IOrderedParallelEnumerable,
    OfType,
    SelectorKeyType,
    TypedData,
} from "./"

/**
 * Parallel Async Iterable type with methods from LINQ.
 */
export interface IParallelEnumerable<TSource> extends IAsyncParallel<TSource> {
    /**
     * Used for processing.
     */
    readonly dataFunc: TypedData<TSource>

    asAsync(): IAsyncEnumerable<TSource>,
    concat(second: IAsyncParallel<TSource>): IParallelEnumerable<TSource>,
    distinct(comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    each(action: (x: TSource) => void): IParallelEnumerable<TSource>,
    eachAsync(action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource>,
    except(second: IAsyncParallel<TSource>,
           comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    exceptAsync(second: IAsyncParallel<TSource>,
                comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>,

    groupBy<TKey extends SelectorKeyType>(
        keySelector: (x: TSource) => TKey): IParallelEnumerable<IGrouping<TKey, TSource>>
    groupBy<TKey>(
            keySelector: (x: TSource) => TKey,
            comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>,

    groupByAsync<TKey extends SelectorKeyType>(
        keySelector: (x: TSource) => Promise<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
    groupByAsync<TKey>(
            keySelector: (x: TSource) => Promise<TKey> | TKey,
            comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>)
            : IParallelEnumerable<IGrouping<TKey, TSource>>,

    groupByWithSel<TElement, TKey extends SelectorKeyType>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<TKey, TElement>>
    groupByWithSel<TKey, TElement>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement,
            comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>,

    intersect(second: IAsyncParallel<TSource>,
              comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    intersectAsync(second: IAsyncParallel<TSource>,
                   comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    // join in LINQ - but renamed to avoid clash with Array.prototype.join
    joinByKey<TInner, TKey, TResult>(
            inner: IAsyncParallel<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult>,
    ofType<TType extends OfType>(type: TType): IParallelEnumerable<InferType<TType>>

    orderBy<TKey>(
        predicate: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>
    orderByAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>
    orderByDescending<TKey>(
        predicate: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IParallelEnumerable<TSource>
    orderByDescendingAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IParallelEnumerable<TSource>

    reverse(): IParallelEnumerable<TSource>,
    select<TResult>(selector: (x: TSource, index: number) => TResult): IParallelEnumerable<TResult>
    select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>,
    selectAsync<TResult>(
        selector: (x: TSource, index: number) => Promise<TResult>): IParallelEnumerable<TResult>
    selectAsync<TKey extends keyof TSource, TResult>(
        this: IParallelEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IParallelEnumerable<TResult>
    selectMany<TResult>(selector: (x: TSource, index: number) => Iterable<TResult>): IParallelEnumerable<TResult>,
    selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
            this: IParallelEnumerable<TBindedSource>,
            selector: keyof TBindedSource): IParallelEnumerable<TOut>,
    selectManyAsync<TResult>(
        selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IParallelEnumerable<TResult>,
    sequenceEquals(second: IAsyncParallel<TSource>,
                   comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    sequenceEqualsAsync(second: IAsyncParallel<TSource>,
                        comparer?: IAsyncEqualityComparer<TSource>): Promise<boolean>,
    skip(count: number): IParallelEnumerable<TSource>,
    skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>,
    skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>,
    take(amount: number): IParallelEnumerable<TSource>,
    takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>
    takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>
    union(second: IAsyncParallel<TSource>,
          comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    unionAsync(second: IAsyncParallel<TSource>,
               comparer?: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>,
    where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>,
    whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>
    zip<TSecond, TResult>(
        second: IAsyncParallel<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>,
    zip<TSecond>(second: IAsyncParallel<TSecond>):
        IParallelEnumerable<[TSource, TSecond]>
    zipAsync<TSecond, TResult>(
        second: IAsyncParallel<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult>,
}
