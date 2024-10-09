import type { IAsyncEqualityComparer, IEqualityComparer } from "./"

/**
 * Common Methods between IAsyncEnumerable and IParallelEnumerable
 */
export interface IAsyncParallel<TSource> extends AsyncIterable<TSource> {
    /**
     * Applies an accumulator function over a sequence.
     * @param func An accumulator function to be invoked on each element.
     * @returns The final accumulator value.
     */
    aggregate(func: (x: TSource, y: TSource) => TSource): Promise<TSource>
    /**
     * Applies an accumulator function over a sequence.
     * The specified seed value is used as the initial accumulator value.
     * @param seed The initial accumulator value.
     * @param func An accumulator function to be invoked on each element.
     * @returns The final accumulator value.
     */
    aggregate<TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
    /**
     * Applies an accumulator function over a sequence.
     * The specified seed value is used as the initial accumulator value,
     * and the specified function is used to select the result value.
     * @param seed The initial accumulator value.
     * @param func An accumulator function to be invoked on each element.
     * @param resultSelector A function to transform the final accumulator value into the result value.
     * @returns The transformed final accumulator value.
     */
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
     * @throws {import('../types/InvalidOperationException')} source contains no elements.
     * @returns The average of the sequence of values.
     */
    average(this: IAsyncParallel<number>): Promise<number>
    /**
     * Computes the average of a sequence of values
     * that are obtained by invoking a transform function on each element of the input sequence.
     * @param selector A transform function to apply to each element.
     * @throws {import('../types/InvalidOperationException')} source contains no elements.
     * @returns The average of the sequence of values.
     */
    average(selector: (x: TSource) => number): Promise<number>
    /**
     * Computes the average of a sequence of values
     * that are obtained by invoking a transform function on each element of the input sequence.
     * @param selector An async transform function to apply to each element.
     * @throws {import('../types/InvalidOperationException')} source contains no elements.
     * @returns The average of the sequence of values.
     */
    averageAsync(selector: (x: TSource) => Promise<number>): Promise<number>
    /**
     * Determines whether a sequence contains a specified element by
     * using the specified or default IEqualityComparer<T>.
     * @param value The value to locate in the sequence.
     * @param comparer An equality comparer to compare values. Optional.
     * @returns true if the source sequence contains an element that has the specified value; otherwise, false.
     */
    contains(value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>
    /**
     * Determines whether a sequence contains a specified element
     * by using the specified or default IEqualityComparer<T>.
     * @param value The value to locate in the sequence.
     * @param comparer An async equality comparer to compare values.
     * @returns true if the source sequence contains an element that has the specified value; otherwise, false.
     */
    containsAsync(value: TSource, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>
    /**
     * Returns the number of elements in a sequence
     * or represents how many elements in the specified sequence satisfy a condition
     * if the predicate is specified.
     * @param predicate A function to test each element for a condition. Optional.
     * @returns The number of elements in the input sequence.
     */
    count(predicate?: (x: TSource) => boolean): Promise<number>
    /**
     * Returns the number of elements in a sequence
     * or represents how many elements in the specified sequence satisfy a condition
     * if the predicate is specified.
     * @param predicate A function to test each element for a condition.
     * @returns The number of elements in the input sequence.
     */
    countAsync(predicate: (x: TSource) => Promise<boolean>): Promise<number>
    /**
     * Returns the element at a specified index in a sequence.
     * @param index The zero-based index of the element to retrieve.
     * @throws {import('../types/ArgumentOutOfRangeException')}
     * index is less than 0 or greater than or equal to the number of elements in source.
     * @returns The element at the specified position in the source sequence.
     */
    elementAt(index: number): Promise<TSource>
    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     * @param index The zero-based index of the element to retrieve.
     * @returns
     * null if the index is outside the bounds of the source sequence;
     * otherwise, the element at the specified position in the source sequence.
     */
    elementAtOrDefault(index: number): Promise<TSource | null>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     * @throws {import('../types/InvalidOperationException')} Sequence contains no matching elements
     */
    first(predicate?: (x: TSource) => boolean): Promise<TSource>
    /**
     * Returns the first element in a sequence that satisfies a specified condition.
     * @param predicate A function to test each element for a condition.
     * @throws {import('../types/InvalidOperationException')} No elements in Iteration matching predicate
     * @returns The first element in the sequence that passes the test in the specified predicate function.
     */
    firstAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>
    /**
     * Returns first element in sequence that satisfies predicate otherwise
     * returns the first element in the sequence. Returns null if no value found.
     * @param predicate A function to test each element for a condition. Optional.
     * @returns The first element in the sequence
     * or the first element that passes the test in the specified predicate function.
     * Returns null if no value found.
     */
    firstOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>
    /**
     * Returns the first element of the sequence that satisfies a condition or a default value
     * if no such element is found.
     * @param predicate An async function to test each element for a condition.
     * @returns null if source is empty or if no element passes the test specified by predicate;
     * otherwise, the first element in source that passes the test specified by predicate.
     */
    firstOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     * @throws {import('../types/InvalidOperationException')} Sequence contains no matching element
     */
    last(predicate?: (x: TSource) => boolean): Promise<TSource>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no matching element
     */
    lastAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>
    lastOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>
    lastOrDefaultAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     * @param this Async Iteration of Numbers
     */
    max(this: IAsyncParallel<number>): Promise<number>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     */
    max(selector: (x: TSource) => number): Promise<number>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     */
    maxAsync(selector: (x: TSource) => Promise<number>): Promise<number>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     */
    min(this: IAsyncParallel<number>): Promise<number>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     */
    min(selector: (x: TSource) => number): Promise<number>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     */
    minAsync(selector: (x: TSource) => Promise<number>): Promise<number>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains more than one element
     * @throws {import('../types/InvalidOperationException')} Sequence contains more than one matching element
     * @throws {import('../types/InvalidOperationException')} Sequence contains no matching element
     * @throws {import('../types/InvalidOperationException')} Sequence contains no elements
     */
    /**
     * Partitions the values into a tuple of failing and passing arrays
     * @param predicate Predicate to determine whether a value passes or fails
     * @returns [values that pass, values that fail]
     */
    partition(predicate: (x: TSource) => boolean): Promise<[pass: TSource[], fail: TSource[]]>
    /**
     * Partitions the values into a tuple of failing and passing arrays
     * @param predicate Async predicate to determine whether a value passes or fails
     * @returns [values that pass, values that fail]
     */
    partitionAsync(predicate: (x: TSource) => Promise<boolean>): Promise<[pass: TSource[], fail: TSource[]]>

    single(predicate?: (x: TSource) => boolean): Promise<TSource>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains more than one matching element
     * @throws {import('../types/InvalidOperationException')} Sequence contains no matching element
     */
    singleAsync(predicate: (x: TSource) => Promise<boolean>): Promise<TSource>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains more than one matching element
     */
    singleOrDefault(predicate?: (x: TSource) => boolean): Promise<TSource | null>
    /**
     * @throws {import('../types/InvalidOperationException')} Sequence contains more than one matching element
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
     * @returns A promise for Map<TKey, TSource[]>
     */
    toMap<TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>
    /**
     * Converts the async or parallel iteration to a Map<TKey, TSource[]>.
     * @param selector An async function to serve as a key selector.
     * @returns A promise for Map<TKey, TSource[]>
     */
    toMapAsync<TKey>(selector: (x: TSource) => Promise<TKey>): Promise<Map<TKey, TSource[]>>
    /**
     * Converts the Iteration to an Object. Duplicate values will be overriden.
     * @param selector A function to determine the Key based on the value.
     * @returns Promise of KVP Object
     */
    toObject<TKey extends keyof any>(selector: (x: TSource) => TKey): Promise<Record<TKey, TSource>>
    /**
     * Converts the Iteration to an Object. Duplicate values will be overriden.
     * @param selector An async function to determine the Key based on the value.
     * @returns Promise of KVP Object
     */
    toObjectAsync<TKey extends keyof any>(selector: (x: TSource) => Promise<TKey>): Promise<Record<TKey, TSource>>
    /**
     * Converts the async iteration to a Set
     * @returns A promise for a set containing the iteration values
     */
    toSet(): Promise<Set<TSource>>
    [Symbol.asyncIterator](): AsyncIterableIterator<TSource>
}
