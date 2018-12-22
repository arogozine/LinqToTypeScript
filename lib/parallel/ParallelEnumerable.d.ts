import { IAsyncEqualityComparer, IAsyncParallel, IComparer, IEqualityComparer, IGrouping, InferType, IOrderedParallelEnumerable, IParallelEnumerable, IParallelFlatten, OfType, ParallelGeneratorType, SelectorKeyType } from "../types";
import { toArray } from "./_private/toArray";
import { BasicParallelEnumerable } from "./BasicParallelEnumerable";
/**
 * Contains static methods to work with Parallel Async
 */
export { aggregate } from "./_private/aggregate";
export { all } from "./_private/all";
export { allAsync } from "./_private//allAsync";
/**
 * Returns an empty IParallelEnumerable<T> that has the specified type argument.
 * @returns An empty IParallelEnumerable<T> whose type argument is TResult.
 */
export declare function empty<TResult>(): IParallelEnumerable<TResult>;
export { any } from "./_private/any";
export { anyAsync } from "./_private/anyAsync";
export { asAsync } from "./_private/asAsync";
export { average } from "./_private/average";
export { averageAsync } from "./_private/averageAsync";
/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IParallelEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
export declare function concat<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>): IParallelEnumerable<TSource>;
export { contains } from "./_private/contains";
export { containsAsync } from "./_private/containsAsync";
export { count } from "./_private/count";
export { countAsync } from "./_private/countAsync";
/**
 * Returns distinct elements from a sequence by using the default or specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IEqualityComparer<T> to compare values. Optional. Defaults to Strict Equality Comparison.
 * @returns An IParallelEnumerable<T> that contains distinct elements from the source sequence.
 */
export declare function distinct<TSource>(source: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
/**
 * Returns distinct elements from a sequence by using the specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns An IParallelEnumerable<T> that contains distinct elements from the source sequence.
 */
export declare function distinctAsync<TSource>(source: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
/**
 * Performs a specified action on each element of the IParallelEnumerable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IParallelEnumerable<T> that executes the action lazily as you iterate.
 */
export declare function each<TSource>(source: IParallelEnumerable<TSource>, action: (x: TSource) => void): IParallelEnumerable<TSource>;
/**
 * Performs a specified action on each element of the IParallelEnumerable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IParallelEnumerable<T> that executes the action lazily as you iterate.
 */
export declare function eachAsync<TSource>(source: IParallelEnumerable<TSource>, action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource>;
export { elementAt } from "./_private/elementAt";
export { elementAtOrDefault } from "./_private/elementAtOrDefault";
/**
 * Produces the set difference of two sequences by using the comparer provided
 * or EqualityComparer to compare values.
 * @param first An IAsyncParallel<T> whose elements that are not also in second will be returned.
 * @param second An IAsyncParallel<T> whose elements that also occur in the first sequence
 * will cause those elements to be removed from the returned sequence.
 * @param comparer An IEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the set difference of the elements of two sequences.
 */
export declare function except<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
/**
 * Produces the set difference of two sequences by using the comparer provided to compare values.
 * @param first An IAsyncParallel<T> whose elements that are not also in second will be returned.
 * @param second An IAsyncParallel<T> whose elements that also occur in the first sequence
 * will cause those elements to be removed from the returned sequence.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the set difference of the elements of two sequences.
 */
export declare function exceptAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
export { first } from "./_private/first";
export { firstAsync } from "./_private/firstAsync";
export { firstOrDefault } from "./_private/firstOrDefault";
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync";
/**
 * Flattens a parallel iterable
 * @param source IAsyncParallel to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: IParallelFlatten<TSource>, shallow?: false): IParallelEnumerable<TSource>;
/**
 * Flattens a parallel iterable
 * @param source IAsyncParallel to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: IAsyncParallel<TSource | IAsyncParallel<TSource>>, shallow: true): IParallelEnumerable<TSource | AsyncIterable<TSource>>;
/**
 * Creates an IParallelEnumerable from a function that returns an Array of Promises
 * @param type Array of Promises
 * @param generator Function that gives back an array of promises
 * @returns IParallelEnumerable<T>
 */
export declare function from<TSource>(type: ParallelGeneratorType.ArrayOfPromises, generator: () => Array<Promise<TSource>>): IParallelEnumerable<TSource>;
/**
 * Creates an IParallelEnumerable from a function that returns a Array Promise
 * @param type Promise to Array
 * @param generator Async function which returns an array of values
 * @returns IParallelEnumerable<T>
 */
export declare function from<TSource>(type: ParallelGeneratorType.PromiseToArray, generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>;
/**
 * Creates an IParallelEnumerable from a function that returns an promise of an promise array of valus
 * @param type Promise of Promises
 * @param generator Async function that returns an array of value promises
 * @returns IParallelEnumerable<T>
 */
export declare function from<TSource>(type: ParallelGeneratorType.PromiseOfPromises, generator: () => Promise<Array<Promise<TSource>>>): IParallelEnumerable<TSource>;
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupBy<TSource, TKey extends SelectorKeyType>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey): IParallelEnumerable<IGrouping<TKey, TSource>>;
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> to compare keys.
 */
export declare function groupBy<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupByAsync<TSource, TKey extends SelectorKeyType>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey): IParallelEnumerable<IGrouping<TKey, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> or IAsyncEqualityComparer<T> to compare keys.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupByAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function and
 * projects the elements for each group by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @returns An IParallelEnumerable<IGrouping<TKey, TElement>>
 * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
 */
export declare function groupByWithSel<TSource, TKey extends SelectorKeyType, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<TKey, TElement>>;
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @param comparer An IEqualityComparer<T> to compare keys.
 * @returns An IParallelEnumerable<IGrouping<TKey,TElement>>
 * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
 */
export declare function groupByWithSel<TSource, TKey, TElement>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>;
/**
 * Correlates the elements of two sequences based on matching keys.
 * A specified IEqualityComparer<T> is used to compare keys or the strict equality comparer.
 * @param outer The first sequence to join.
 * @param inner The sequence to join to the first sequence.
 * @param outerKeySelector A function to extract the join key from each element of the first sequence.
 * @param innerKeySelector A function to extract the join key from each element of the second sequence.
 * @param resultSelector A function to create a result element from two matching elements.
 * @param comparer An IEqualityComparer<T> to hash and compare keys. Optional.
 * @returns An IParallelEnumerable<T> that has elements of type TResult that
 * are obtained by performing an inner join on two sequences.
 */
export declare function join<TOuter, TInner, TKey, TResult>(outer: IAsyncParallel<TOuter>, inner: IAsyncParallel<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IParallelEnumerable<TResult>;
/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If not comparer is specified, uses the @see {StrictEqualityComparer}
 * @param first An IParallelEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncParallel<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export declare function intersect<TSource>(first: IParallelEnumerable<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
/**
 * Produces the set intersection of two sequences by using the specified IAsyncEqualityComparer<T> to compare values.
 * @param first An IParallelEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncParallel<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export declare function intersectAsync<TSource>(first: IParallelEnumerable<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
/**
 * Returns the minimum value in a sequence of values.
 * @param source A sequence of values to determine the minimum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export declare function min(source: IParallelEnumerable<number>): Promise<number>;
/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export declare function min<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
export { last } from "./_private/last";
export { lastAsync } from "./_private/lastAsync";
export { lastOrDefault } from "./_private/lastOrDefault";
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync";
/**
 * Returns the maximum value in a sequence of values.
 * @param source A sequence of values to determine the maximum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export declare function max(source: IParallelEnumerable<number>): Promise<number>;
/**
 * Invokes a transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export declare function max<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
/**
 * Invokes an async transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export declare function maxAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export declare function minAsync<TSource>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A transform function to apply to each element.
 * @returns
 * An IParallelEnumerable<T> whose elements are the result of invoking the transform function on each element of source.
 */
export declare function select<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => OUT): IParallelEnumerable<OUT>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IParallelEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export declare function select<TSource, TKey extends keyof TSource>(source: IParallelEnumerable<TSource>, key: TKey): IParallelEnumerable<TSource[TKey]>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector An async transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking
 * the transform function on each element of source.
 */
export declare function selectAsync<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param key A key of the elements in the sequence
 * @returns An IParallelEnumerable<T> whoe elements are the result of getting the value for key
 * on each element of source.
 */
export declare function selectAsync<TSource extends {
    [key: string]: Promise<TResult>;
}, TKey extends keyof TSource, TResult>(source: IParallelEnumerable<TResult>, selector: TKey): IParallelEnumerable<TResult>;
/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export declare function selectMany<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>;
/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export declare function selectMany<TBindedSource extends {
    [key: string]: Iterable<TOut>;
}, TOut>(source: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>;
/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export declare function selectManyAsync<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<Iterable<OUT>>): IParallelEnumerable<OUT>;
/**
 * Applies a type filter to a source iteration
 * @param source Async Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export declare function ofType<TSource, TType extends OfType>(source: IAsyncParallel<TSource>, type: TType): IParallelEnumerable<InferType<TType>>;
/**
 * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @returns An IOrderedParallelEnumerable<TElement> whose elements are sorted according to a key.
 */
export declare function orderBy<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
/**
 * Sorts the elements of a sequence in ascending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @returns An IOrderedParallelEnumerable<TElement> whose elements are sorted according to a key.
 */
export declare function orderByAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
/**
 * Sorts the elements of a sequence in descending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @return An IOrderedParallelEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export declare function orderByDescending<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @return An IOrderedParallelEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export declare function orderByDescendingAsync<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource>;
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IParallelEnumerable<number> that contains a range of sequential integral numbers.
 */
export declare function range(start: number, count: number): IParallelEnumerable<number>;
/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IParallelEnumerable<T> that contains a repeated value.
 */
export declare function repeat<TResult>(element: TResult, count: number, delay?: number): IParallelEnumerable<TResult>;
/**
 * Inverts the order of the elements in a sequence.
 * @param source A sequence of values to reverse.
 * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
 */
export declare function reverse<TSource>(source: IParallelEnumerable<TSource>): IParallelEnumerable<TSource>;
export { sequenceEquals } from "./_private/sequenceEquals";
export { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync";
export { single } from "./_private/single";
export { singleAsync } from "./_private/singleAsync";
export { singleOrDefault } from "./_private/singleOrDefault";
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync";
/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An IParallelEnumerable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IParallelEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
export declare function skip<TSource>(source: IParallelEnumerable<TSource>, count: number): IParallelEnumerable<TSource>;
/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains the elements from the input sequence starting at the first element
 * in the linear series that does not pass the test specified by predicate.
 */
export declare function skipWhile<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains the elements from the input sequence starting
 * at the first element in the linear series that does not pass the test specified by predicate.
 */
export declare function skipWhileAsync<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
export { sum } from "./_private/sum";
export { sumAsync } from "./_private/sumAsync";
/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 * @returns An IParallelEnumerable<T> that contains the specified number of elements
 * from the start of the input sequence.
 */
export declare function take<TSource>(source: IParallelEnumerable<TSource>, amount: number): IParallelEnumerable<TSource>;
/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence
 * that occur before the element at which the test no longer passes.
 */
export declare function takeWhile<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate An async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @return An IParallelEnumerable<T> that contains elements
 * from the input sequence that occur before the element at which the test no longer passes.
 */
export declare function takeWhileAsync<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource>;
export { toArray };
export { toMap } from "./_private/toMap";
export { toMapAsync } from "./_private/toMapAsync";
export { toObject } from "./_private/toObject";
export { toSet } from "./_private/toSet";
/**
 * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
 * @param first An IAsyncParallel<T> whose distinct elements form the first set for the union.
 * @param second An IAsyncParallel<T> whose distinct elements form the second set for the union.
 * @param comparer The IEqualityComparer<T> to compare values. Optional.
 * @returns An IParallelEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export declare function union<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource>;
/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An AsyncIterable<T> whose distinct elements form the first set for the union.
 * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export declare function unionAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource>;
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export declare function where<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>;
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to filter.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export declare function whereAsync<TSource>(source: IAsyncParallel<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): BasicParallelEnumerable<TSource>;
/**
 * Creates tuples from th corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @returns An IParallelEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zip<TFirst, TSecond>(first: IAsyncParallel<TFirst>, second: IAsyncParallel<TSecond>): IParallelEnumerable<[TFirst, TSecond]>;
/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector A function that specifies how to merge the elements from the two sequences.
 * @returns An IParallelEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zip<TFirst, TSecond, TResult>(first: IAsyncParallel<TFirst>, second: IAsyncParallel<TSecond>, resultSelector: (x: TFirst, y: TSecond) => TResult): IParallelEnumerable<TResult>;
/**
 * Applies a specified async function to the corresponding elements of two sequences,
 * producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector An async function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zipAsync<TFirst, TSecond, TResult>(first: IAsyncParallel<TFirst>, second: IAsyncParallel<TSecond>, resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult>;
