import { IAsyncEqualityComparer,
        IAsyncParallel,
        IComparer,
        IEqualityComparer,
        IGrouping,
        InferType,
        IOrderedAsyncEnumerable,
        IParallelEnumerable,
        OfType,
        SelectorKeyType} from "./"

/**
 * Async Iterable type with methods from LINQ.
 */
export interface IAsyncEnumerable<TSource> extends IAsyncParallel<TSource> {
   /**
    * Appends a value to the end of the sequence.
    * @param element The value to append to the sequence.
    * @returns An IAsyncEnumerable<T> that ends with the specified element.
    */
    append(element: TSource): IAsyncEnumerable<TSource>
    /**
     * Converts an async iterable to a Parallel Enumerable.
     * @returns Parallel Enumerable of source
     */
    asParallel(): IParallelEnumerable<TSource>
    /**
     * Splits the elements of a sequence into chunks of size at most size.
     * @param size The maximum size of each chunk.
     * @returns An IAsyncEnumerable<T> that contains the elements the input sequence split into chunks of size size.
     */
    chunk(size: number): IAsyncEnumerable<TSource[]>
    /**
     * Concatenates two async sequences.
     * @param second The sequence to concatenate to the first sequence.
     * @returns An IAsyncEnumerable<T> that contains the concatenated elements of the two sequences.
     */
    concatenate(second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>
    /**
     * Returns the elements of an IAsyncEnumerable<T>, or a default valued singleton collection if the sequence is empty.
     * @param defaultValue The value, or Promise that gives back that value, to return if the sequence is empty.
     * @returns An IAsyncEnumerable<T> that contains defaultValue if source is empty; otherwise, source.
     */
    defaultIfEmpty(defaultValue: TSource | Promise<TSource>): IAsyncEnumerable<TSource>
    /**
     * Returns distinct elements from a sequence by using the default
     * or specified equality comparer to compare values.
     * @param comparer An IEqualityComparer<T> to compare values. Optional. Defaults to Strict Equality Comparison.
     * @returns An IAsyncEnumerable<T> that contains distinct elements from the source sequence.
     */
    distinct(comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>
    /**
     * Returns distinct elements from a sequence by using the specified equality comparer to compare values.
     * @param comparer An IAsyncEqualityComparer<T> to compare values.
     * @returns An IAsyncEnumerable<T> that contains distinct elements from the source sequence.
     */
    distinctAsync(comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>
    /**
     * Performs a specified action on each element of the Iterable<TSource>
     * @param action The action to take an each element
     * @returns A new IAsyncEnumerable<T> that executes the action lazily as you iterate.
     */
    each(action: (x: TSource) => void): IAsyncEnumerable<TSource>
    /**
     * Performs a specified action on each element of the Iterable<TSource>
     * @param action The async action to take an each element
     * @returns A new IAsyncEnumerable<T> that executes the action lazily as you iterate.
     */
    eachAsync(action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource>
    /**
     * Produces the set difference of two sequences by using the comparer provided
     * or EqualityComparer to compare values.
     * @param second An IAsyncEnumerable<T> whose elements that also occur in the first sequence
     * will cause those elements to be removed from the returned sequence.
     * @param comparer An IEqualityComparer<T> to compare values. Optional.
     * @returns A sequence that contains the set difference of the elements of two sequences.
     */
    except(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>
    /**
     * Produces the set difference of two sequences by using the comparer provided to compare values.
     * @param second An IAsyncEnumerable<T> whose elements that also occur in the first sequence
     * will cause those elements to be removed from the returned sequence.
     * @param comparer An IAsyncEqualityComparer<T> to compare values.
     * @returns A sequence that contains the set difference of the elements of two sequences.
     */
    exceptAsync(
            second: IAsyncEnumerable<TSource>,
            comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelector A function to extract the key for each element.
     * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    groupBy<TKey extends SelectorKeyType>(
            keySelector: (x: TSource) => TKey): IAsyncEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
     * @param keySelector A function to extract the key for each element.
     * @param comparer An IAsyncEqualityComparer<T> to compare keys.
     */
    groupBy<TKey>(
            keySelector: (x: TSource) => TKey,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelector A function to extract the key for each element.
     * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    groupByAsync<TKey extends SelectorKeyType>(
            keySelector: (x: TSource) => Promise<TKey> | TKey): IAsyncEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelector A function to extract the key for each element.
     * @param comparer An IEqualityComparer<T> or IAsyncEqualityComparer<T> to compare keys.
     * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
     * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
     */
    groupByAsync<TKey>(
        keySelector: (x: TSource) => Promise<TKey> | TKey,
        comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
    /**
     * Groups the elements of a sequence according to a specified key selector function and
     * projects the elements for each group by using a specified function.
     * @param keySelector A function to extract the key for each element.
     * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
     * @param comparer An IEqualityComparer<T> to compare keys.
     * @returns An IAsyncEnumerable<IGrouping<TKey, TElement>>
     * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
     */
    groupByWithSel<TKey extends SelectorKeyType, TElement>(
            keySelector: (x: TSource) => TKey,
            elementSelector: (x: TSource) => TElement,
            comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
    /**
     * Groups the elements of a sequence according to a key selector function.
     * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
     * @param keySelector A function to extract the key for each element.
     * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
     * @param comparer An IEqualityComparer<T> to compare keys.
     * @returns An IAsyncEnumerable<IGrouping<TKey,TElement>>
     * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
     */
    groupByWithSel<TKey, TElement>(
            keySelector: ((x: TSource) => TKey),
            elementSelector: (x: TSource) => TElement,
            comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * @param inner The sequence to join to the first sequence.
     * @param outerKeySelector The sequence to join to the first sequence.
     * @param innerKeySelector A function to extract the join key from each element of the second sequence.
     * @param resultSelector A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
     * @param comparer To compare keys. Optional.
     * @returns An IAsyncEnumerable<T> that contains elements of type TResult that are obtained by performing a grouped join on two sequences.
     */
    groupJoin<TInner, TKey, TResult>(
            inner: Iterable<TInner> | AsyncIterable<TInner>,
            outerKeySelector: (value: TSource) => TKey,
            innerKeySelector: (value: TInner) => TKey,
            resultSelector: (element: TSource, collection: TInner[]) => TResult,
            comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>
    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * @param inner The sequence to join to the first sequence. Can be async.
     * @param outerKeySelector The sequence to join to the first sequence. Can be async.
     * @param innerKeySelector A function to extract the join key from each element of the second sequence.
     * @param resultSelector A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence. Can be async.
     * @param comparer To compare keys. Optional.
     * @returns An IAsyncEnumerable<T> that contains elements of type TResult that are obtained by performing a grouped join on two sequences.
     */
    groupJoinAsync<TInner, TKey, TResult>(
            inner: Iterable<TInner> | AsyncIterable<TInner>,
            outerKeySelector: (value: TSource) => TKey | Promise<TKey>,
            innerKeySelector: (value: TInner) => TKey | Promise<TKey>,
            resultSelector: (element: TSource, collection: TInner[]) => TResult | Promise<TResult>,
            comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>
    /**
     * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
     * If no comparer is selected, uses the StrictEqualityComparer.
     * @param second An Iterable<T> whose distinct elements that also appear in the first sequence will be returned.
     * @param comparer An IEqualityComparer<T> to compare values. Optional.
     * @returns An async sequence that contains the elements that form the set intersection of two sequences.
     */
    intersect(second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>
    /**
     * Produces the set intersection of two sequences by using the specified
     * IAsyncEqualityComparer<T> to compare values.
     * @param second An Iterable<T> whose distinct elements that also appear in the first sequence will be returned.
     * @param comparer An IAsyncEqualityComparer<T> to compare values.
     * @returns A sequence that contains the elements that form the set intersection of two sequences.
     */
    intersectAsync(
            second: IAsyncEnumerable<TSource>,
            comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>
    /**
     * Correlates the elements of two sequences based on matching keys.
     * A specified IEqualityComparer<T> is used to compare keys or the strict equality comparer.
     * @param inner The sequence to join to the first sequence.
     * @param outerKeySelector A function to extract the join key from each element of the first sequence.
     * @param innerKeySelector A function to extract the join key from each element of the second sequence.
     * @param resultSelector A function to create a result element from two matching elements.
     * @param comparer An IEqualityComparer<T> to hash and compare keys. Optional.
     * @returns An IAsyncEnumerable<T> that has elements of type TResult that
     * are obtained by performing an inner join on two sequences.
     */
    joinByKey<TInner, TKey, TResult>(
            inner: IAsyncEnumerable<TInner>,
            outerKeySelector: (x: TSource) => TKey,
            innerKeySelector: (x: TInner) => TKey,
            resultSelector: (x: TSource, y: TInner) => TResult,
            comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>
    /**
     * Applies a type filter to a source iteration
     * @param type Either value for typeof or a consturctor function
     * @returns Values that match the type string or are instance of type
     */
    ofType<TType extends OfType>(type: TType): IAsyncEnumerable<InferType<TType>>
    /**
     * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
     * @param comparer An IComparer<T> to compare values. Optional.
     * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted.
     */
    order(
        comparer?: IComparer<TSource>): IOrderedAsyncEnumerable<TSource>
    /**
     * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
     * @param predicate A function to extract a key from an element.
     * @param comparer An IComparer<T> to compare keys. Optional.
     * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted according to a key.
     */
    orderBy<TKey>(
        predicate: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
    /**
     * Sorts the elements of a sequence in ascending order by using a specified comparer.
     * @param predicate An async function to extract a key from an element.
     * @param comparer An IComparer<T> to compare keys.
     * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted according to a key.
     */
    orderByAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
    /**
     * Sorts the elements of a sequence in descending order by using a specified or default comparer.
     * @param predicate A function to extract a key from an element.
     * @param comparer An IComparer<T> to compare keys. Optional.
     * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order according to a key.
     */
    orderByDescending<TKey>(
        predicate: (x: TSource) => TKey,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
    /**
     * Sorts the elements of a sequence in descending order by using a specified comparer.
     * @param predicate An async function to extract a key from an element.
     * @param comparer An IComparer<T> to compare keys.
     * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order according to a key.
     */
    orderByDescendingAsync<TKey>(
        predicate: (x: TSource) => Promise<TKey>,
        comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>
    /**
     * Sorts the elements of a sequence in descending order by using a specified or default comparer.
     * @param comparer An IComparer<T> to compare values. Optional.
     * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order.
     */
    orderDescending(
        comparer?: IComparer<TSource>): IOrderedAsyncEnumerable<TSource>
    /**
     * Adds a value to the beginning of the sequence.
     * @param element The value to prepend to the sequence.
     * @returns An IAsyncEnumerable<T> that begins with the specified element.
     */
    prepend(element: TSource): IAsyncEnumerable<TSource>
    /**
     * Inverts the order of the elements in a sequence.
     * @returns An async sequence whose elements correspond to those of the input sequence in reverse order.
     */
    reverse(): IAsyncEnumerable<TSource>
    /**
     * Projects each element of a sequence into a new form.
     * @param selector A transform function to apply to each element.
     * @returns An IAsyncEnumerable<T> whose elements are the result of
     * invoking the transform function on each element of source.
     */
    select<TResult>(selector: (x: TSource, index: number) => TResult): IAsyncEnumerable<TResult>
    /**
     * Projects each element of a sequence into a new form.
     * @param key A key of TSource.
     * @returns
     * An IAsyncEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
     */
    select<TKey extends keyof TSource>(key: TKey): IAsyncEnumerable<TSource[TKey]>
    /**
     * Projects each element of a sequence into a new form.
     * @param selector An async transform function to apply to each element.
     * @returns An IAsyncEnumerable<T> whose elements are the result of invoking
     * the transform function on each element of source.
     */
    selectAsync<TResult>(selector: (x: TSource, index: number) => Promise<TResult>): IAsyncEnumerable<TResult>
    /**
     * Projects each element of a sequence into a new form.
     * @param key A key of the elements in the sequence
     * @returns An IAsyncEnumerable<T> whoe elements are the result of getting the value for key
     * on each element of source.
     */
    selectAsync<TKey extends keyof TSource, TResult>(
                this: IAsyncEnumerable<{ [key: string]: Promise<TResult> }>,
                key: TKey): IAsyncEnumerable<TResult>
    /**
     * Projects each element of a sequence to an IAsyncEnumerable<T>
     * and flattens the resulting sequences into one sequence.
     * @param selector A transform function to apply to each element.
     * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
     * one-to-many transform function on each element of the input sequence.
     */
    selectMany<TResult>(selector: (x: TSource, index: number) => Iterable<TResult>): IAsyncEnumerable<TResult>
    /**
     * Projects each element of a sequence to an IAsyncEnumerable<T>
     * and flattens the resulting sequences into one sequence.
     * @param selector A string key of TSource.
     * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
     * parameter the key is tried to on each element of the input sequence.
     */
    selectMany<TBindedSource extends { [key: string]: Iterable<TOut>}, TOut>(
            this: IAsyncEnumerable<TBindedSource>,
            selector: keyof TBindedSource): IAsyncEnumerable<TOut>
    /**
     * Projects each element of a sequence to an IAsyncEnumerable<T>
     * and flattens the resulting sequences into one sequence.
     * @param selector A transform function to apply to each element.
     * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
     * one-to-many transform function on each element of the input sequence.
     */
    selectManyAsync<TResult>(
            selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult>
    /**
     * Determines whether or not two sequences are equal
     * @param second second iterable
     * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
     * @returns Whether or not the two iterations are equal
     */
    sequenceEquals(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>
    /**
     * Compares two sequences to see if they are equal using an async comparer function.
     * @param second Second Sequence
     * @param comparer Async Comparer
     * @returns Whether or not the two iterations are equal
     */
    sequenceEqualsAsync(second: AsyncIterable<TSource>,
                        comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>
    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     * @param count The number of elements to skip before returning the remaining elements.
     * @returns An IAsyncEnumerable<T> that contains the elements
     * that occur after the specified index in the input sequence.
     */
    skip(count: number): IAsyncEnumerable<TSource>
    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     * The element's index is used in the logic of the predicate function.
     * @param predicate A function to test each source element for a condition;
     * the second parameter of the function represents the index of the source element.
     * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting at the first element
     * in the linear series that does not pass the test specified by predicate.
     */
    skipWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     * The element's index is used in the logic of the predicate function.
     * @param predicate A function to test each source element for a condition;
     * the second parameter of the function represents the index of the source element.
     * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting
     * at the first element in the linear series that does not pass the test specified by predicate.
     */
    skipWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>
    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     * @param amount The number of elements to return.
     * @returns An IAsyncEnumerable<T> that contains the specified
     * number of elements from the start of the input sequence.
     */
    take(amount: number): IAsyncEnumerable<TSource>
    /**
     * Returns elements from a sequence as long as a specified condition is true.
     * The element's index is used in the logic of the predicate function.
     * @param predicate A function to test each source element for a condition;
     * the second parameter of the function represents the index of the source element.
     * @returns An IAsyncEnumerable<T> that contains elements from the input sequence
     * that occur before the element at which the test no longer passes.
     */
    takeWhile(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    /**
     * Returns elements from a sequence as long as a specified condition is true.
     * The element's index is used in the logic of the predicate function.
     * @param predicate A async function to test each source element for a condition;
     * the second parameter of the function represents the index of the source element.
     * @returns An IAsyncEnumerable<T> that contains elements from the input sequence
     * that occur before the element at which the test no longer passes.
     */
    takeWhileAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>
    /**
     * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
     * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
     * @param comparer The IEqualityComparer<T> to compare values. Optional.
     * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
     */
    union(second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>
    /**
     * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
     * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
     * @param comparer The IAsyncEqualityComparer<T> to compare values.
     * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
     */
    unionAsync(second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>
    /**
     * Filters a sequence of values based on a predicate.
     * Each element's index is used in the logic of the predicate function.
     * @param predicate A function to test each source element for a condition;
     * the second parameter of the function represents the index of the source element.
     * @returns An IAsyncEnumerable<T> that contains elements from the input sequence that satisfy the condition.
     */
    where(predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
    /**
     * Filters a sequence of values based on a predicate.
     * Each element's index is used in the logic of the predicate function.
     * @param predicate A async function to test each source element for a condition;
     * the second parameter of the function represents the index of the source element.
     * @returns An IAsyncEnumerable<T> that contains elements from the input sequence that satisfy the condition.
     */
    whereAsync(predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>
    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     * @param second The second sequence to merge.
     * @param resultSelector A function that specifies how to merge the elements from the two sequences.
     * @returns An IAsyncEnumerable<TResult> that contains merged elements of two input sequences.
     */
    zip<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>
    /**
     * Creates a tuple of corresponding elements of two sequences, producing a sequence of the results.
     * @param second The second sequence to merge.
     * @returns An IAsyncEnumerable<[T, Y]> that contains merged elements of two input sequences.
     */
    zip<TSecond>(second: AsyncIterable<TSecond>): IAsyncEnumerable<[TSource, TSecond]>
    /**
     * Applies a specified async function to the corresponding elements of two sequences,
     * producing a sequence of the results.
     * @param second The second sequence to merge.
     * @param resultSelector An async function that specifies how to merge the elements from the two sequences.
     * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
     */
    zipAsync<TSecond, TResult>(
        second: AsyncIterable<TSecond>,
        resultSelector: (x: TSource, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult>
}
