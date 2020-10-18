import { IAsyncEqualityComparer, IEqualityComparer } from "./"

/**
 * Common Methods between IAsyncEnumerable and IParallelEnumerable
 */
export interface IAsyncParallel<TSource> extends AsyncIterable<TSource> {
    aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>,
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>,
    aggregate<TAccumulate, TResult>(
            seed: TAccumulate,
            func: (x: TAccumulate, y: TSource) => TAccumulate,
            resultSelector: (x: TAccumulate) => TResult): Promise<TResult>
    /**
     * Determines whether all elements of a sequence satisfy a condition.
     * @param predicate A function to test each element for a condition.
     * @returns ``true`` if every element of the source sequence passes the test in the specified predicate,
     * or if the sequence is empty; otherwise, ``false``.
     */
    all(predicate: (x: TSource) => boolean): Promise<boolean>
    /**
     * Determines whether all elements of a sequence satisfy a condition.
     * @param predicate An async function to test each element for a condition.
     * @returns ``true`` if every element of the source sequence passes the test in the specified predicate,
     * or if the sequence is empty; otherwise, ``false``.
     */
    allAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean>
    /**
     * Determines whether a sequence contains any elements.
     * If predicate is specified, determines whether any element of a sequence satisfies a condition.
     * @param predicate A function to test each element for a condition.
     * @returns true if the source sequence contains any elements or passes the test specified; otherwise, false.
     */
    any(predicate?: (x: TSource) => boolean): Promise<boolean>
    /**
     * Determines whether any element of a sequence satisfies a condition.
     * @param predicate An async function to test each element for a condition.
     * @returns true if the source sequence contains any elements or passes the test specified; otherwise, false.
     */
    anyAsync(predicate: (x: TSource) => Promise<boolean>): Promise<boolean>
    /**
     * Computes the average of a sequence of number values.
     * @throws {InvalidOperationException} source contains no elements.
     * @returns The average of the sequence of values.
     */
    average(this: IAsyncParallel<number>): Promise<number>
    /**
     * Computes the average of a sequence of values
     * that are obtained by invoking a transform function on each element of the input sequence.
     * @param selector A transform function to apply to each element.
     * @throws {InvalidOperationException} source contains no elements.
     * @returns The average of the sequence of values.
     */
    average(selector: (x: TSource) => number): Promise<number>
    /**
     * Computes the average of a sequence of values
     * that are obtained by invoking a transform function on each element of the input sequence.
     * @param selector An async transform function to apply to each element.
     * @throws {InvalidOperationException} source contains no elements.
     * @returns The average of the sequence of values.
     */
    averageAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>,
    containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>,
    count(predicate?: (x: TSource) => boolean): Promise<number>,
    countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number>,
    /**
     * @throws {ArgumentOutOfRangeException}
     */
    elementAt(index: number): Promise<TSource>,
    elementAtOrDefault(index: number): Promise<TSource | null>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    first(predicate?: (x: TSource) => boolean): Promise<TSource>,
    /**
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    last(predicate?: (x: TSource) => boolean): Promise<TSource>,
    /**
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @param this Async Iteration of Numbers
     */
    max(this: IAsyncParallel<number>): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    max(selector: (x: TSource) => number): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    maxAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    min(this: IAsyncParallel<number>): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    min(selector: (x: TSource) => number): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    minAsync(selector: (x: TSource) => Promise<number>): Promise<number>,
    /**
     * @throws {InvalidOperationException} Sequence contains more than one element
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching element
     * @throws {InvalidOperationException} Sequence contains no elements
     */
    single(predicate?: (x: TSource) => boolean): Promise<TSource>,
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>,
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     */
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>,
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     */
    singleOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>
    /**
     * Computes the sum of the sequence of numeric values.
     * @returns A promise of the sum of the values in the sequence.
     */
    sum(this: IAsyncParallel<number>): Promise<number>
    /**
     * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function
     * on each element of the input sequence.
     * @param selector A transform function to apply to each element.
     * @returns A promise of the sum of the projected values.
     */
    sum(selector: (x: TSource) => number): Promise<number>
    /**
     * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function
     * on each element of the input sequence.
     * @param selector An async transform function to apply to each element.
     * @returns A promise of the sum of the projected values.
     */
    sumAsync(selector: (x: TSource) => Promise<number>): Promise<number>
    /**
     * Creates an array from a IAsyncEnumerable<T> or IParallelEnumerable<T>
     * @returns An array of elements
     */
    toArray(): Promise<TSource[]>
    /**
     * Converts the async or parallel iteration to a Map<TKey, TSource[]>.
     * @param selector A function to serve as a key selector.
     * @return A promise for Map<TKey, TSource[]>
     */
    toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>
    /**
     * Converts the async or parallel iteration to a Map<TKey, TSource[]>.
     * @param selector An async function to serve as a key selector.
     * @returns A promise for Map<TKey, TSource[]>
     */
    toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>>
    /**
     * Converts the async iteration to a Set
     * @returns A promise for a set containing the iteration values
     */
    toSet(): Promise<Set<TSource>>
    [Symbol.asyncIterator](): AsyncIterableIterator<TSource>
}
