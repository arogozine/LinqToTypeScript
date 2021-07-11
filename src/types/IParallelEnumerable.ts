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
    /**
     * Converts the parallel iterable to an @see {IAsyncEnumerable}
     * @returns An IAsyncEnumerable<T>
     */
    asAsync(): IAsyncEnumerable<TSource>
    /**
     * Concatenates two async sequences.
     * @param second The async sequence to concatenate to the first sequence.
     * @returns An IParallelEnumerable<T> that contains the concatenated elements of the two sequences.
     */
    concatenate(second: IAsyncParallel<TSource>): IParallelEnumerable<TSource>
    /**
     * Returns distinct elements from a sequence by using the default or specified equality comparer to compare values.
     * @param comparer An IEqualityComparer<T> to compare values. Optional. Defaults to Strict Equality Comparison.
     * @returns An IParallelEnumerable<T> that contains distinct elements from the source sequence.
     */
    distinct(comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>
    /**
     * Returns distinct elements from a sequence by using the specified equality comparer to compare values.
     * @param comparer An IAsyncEqualityComparer<T> to compare values.
     * @returns An IParallelEnumerable<T> that contains distinct elements from the source sequence.
     */
    distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>
    /**
     * Performs a specified action on each element of the IParallelEnumerable<TSource>.
     * The order of execution is not guaranteed.
     * @param action The action to take an each element
     * @returns A new IParallelEnumerable<T> that executes the action provided.
     */
    each(action: (x: TSource) => void): IParallelEnumerable<TSource>
    /**
     * Performs a specified action on each element of the IParallelEnumerable<TSource>.
     * The order of execution is not guaranteed.
     * @param action The async action to take an each element
     * @returns A new IParallelEnumerable<T> that executes the action provided.
     */
    eachAsync(action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource>
    /**
     * Produces the set difference of two sequences by using the comparer provided
     * or EqualityComparer to compare values.
     * @param second An IAsyncParallel<T> whose elements that also occur in the first sequence
     * will cause those elements to be removed from the returned sequence.
     * @param comparer An IEqualityComparer<T> to compare values. Optional.
     * @returns A sequence that contains the set difference of the elements of two sequences.
     */
    except(second: IAsyncParallel<TSource>,
           comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>
    /**
     * Produces the set difference of two sequences by using the comparer provided to compare values.
     * @param second An IAsyncParallel<T> whose elements that also occur in the first sequence
     * will cause those elements to be removed from the returned sequence.
     * @param comparer An IAsyncEqualityComparer<T> to compare values.
     * @returns A sequence that contains the set difference of the elements of two sequences.
     */
    exceptAsync(second: IAsyncParallel<TSource>,
                comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelector A function to extract the key for each element.
     * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    groupBy<TKey extends SelectorKeyType>(
        keySelector: (x: TSource) => TKey): IParallelEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
     * @param keySelector A function to extract the key for each element.
     * @param comparer An IEqualityComparer<T> to compare keys.
     * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    groupBy<TKey>(
            keySelector: (x: TSource) => TKey,
            comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelector An async function to extract the key for each element.
     * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    groupByAsync<TKey extends SelectorKeyType>(
        keySelector: (x: TSource) => Promise<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelector An async function to extract the key for each element.
     * @param comparer An IEqualityComparer<T> or IAsyncEqualityComparer<T> to compare keys.
     * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    groupByAsync<TKey>(
            keySelector: (x: TSource) => Promise<TKey> | TKey,
            comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>)
            : IParallelEnumerable<IGrouping<TKey, TSource>>
    
    groupByWithSel<TElement, TKey extends SelectorKeyType>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<TKey, TElement>>
    groupByWithSel<TKey, TElement>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement,
            comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>

    intersect(second: IAsyncParallel<TSource>,
              comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>
    intersectAsync(second: IAsyncParallel<TSource>,
                   comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>
    // join in LINQ - but renamed to avoid clash with Array.prototype.join
    joinByKey<TInner, TKey, TResult>(
            inner: IAsyncParallel<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult>
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
    /**
     * Inverts the order of the elements in a sequence.
     * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
     */
    reverse(): IParallelEnumerable<TSource>
    select<TResult>(selector: (x: TSource, index: number) => TResult): IParallelEnumerable<TResult>
    select<TKey extends keyof TSource>(key: TKey): IParallelEnumerable<TSource[TKey]>
    selectAsync<TResult>(
        selector: (x: TSource, index: number) => Promise<TResult>): IParallelEnumerable<TResult>
    selectAsync<TKey extends keyof TSource, TResult>(
        this: IParallelEnumerable<{ [key: string]: Promise<TResult> }>,
        selector: TKey): IParallelEnumerable<TResult>
    selectMany<TResult>(selector: (x: TSource, index: number) => Iterable<TResult>): IParallelEnumerable<TResult>
    selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
            this: IParallelEnumerable<TBindedSource>,
            selector: keyof TBindedSource): IParallelEnumerable<TOut>
    selectManyAsync<TResult>(
        selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IParallelEnumerable<TResult>
    sequenceEquals(second: IAsyncParallel<TSource>,
                   comparer?: IEqualityComparer<TSource>): Promise<boolean>
    sequenceEqualsAsync(second: IAsyncParallel<TSource>,
                        comparer?: IAsyncEqualityComparer<TSource>): Promise<boolean>
    skip(count: number): IParallelEnumerable<TSource>
    skipWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>
    skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>
    take(amount: number): IParallelEnumerable<TSource>
    takeWhile(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>
    takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>
    union(second: IAsyncParallel<TSource>,
          comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>
    unionAsync(second: IAsyncParallel<TSource>,
               comparer?: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>
    /**
     * Filters a sequence of values based on a predicate.
     * Each element's index is used in the logic of the predicate function.
     * @param predicate A function to test each source element for a condition;
     * the second parameter of the function represents the index of the source element.
     * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
     */
    where(predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>
    /**
     * Filters a sequence of values based on a predicate.
     * Each element's index is used in the logic of the predicate function.
     * @param predicate A async function to test each source element for a condition;
     * the second parameter of the function represents the index of the source element.
     * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
     */
    whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>
    zip<TSecond, TResult>(
        second: IAsyncParallel<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IParallelEnumerable<TResult>
    zip<TSecond>(second: IAsyncParallel<TSecond>):
        IParallelEnumerable<[TSource, TSecond]>
    zipAsync<TSecond, TResult>(
        second: IAsyncParallel<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult>
}
