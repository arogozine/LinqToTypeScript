import "core-js/modules/es7.symbol.async-iterator";
import { IAsyncEnumerable, IAsyncEqualityComparer, IAsyncFlatten, IComparer, IEqualityComparer, IGrouping, InferType, IOrderedAsyncEnumerable, OfType, SelectorKeyType } from "../types";
/**
 * Provides static methods that work with IAsyncEnumerable<T> and AsyncIterable<T>
 */
export { aggregate } from "./_private/aggregate";
export { all } from "./_private/all";
export { allAsync } from "./_private/allAsync";
export { any } from "./_private/any";
export { anyAsync } from "./_private/anyAsync";
export { average } from "./_private/average";
export { averageAsync } from "./_private/averageAsync";
export { contains } from "./_private/contains";
export { containsAsync } from "./_private/containsAsync";
export { count } from "./_private/count";
export { countAsync } from "./_private/countAsync";
export { elementAt } from "./_private/elementAt";
export { asParallel } from "./_private/asParallel";
export { concat } from "./_private/concat";
export { distinct } from "./_private/distinct";
export { distinctAsync } from "./_private/distinctAsync";
export { elementAtOrDefault } from "./_private/elementAtOrDefault";
/**
 * Returns an empty IAsyncEnumerable<T> that has the specified type argument.
 * @returns An empty IAsyncEnumerable<T> whose type argument is TResult.
 */
export declare function empty<TResult>(): IAsyncEnumerable<TResult>;
/**
 * Iterates through the object
 * @param source Source Object
 * @returns IAsyncEnumerabe<[TKey, TValue]> of Key Value pairs
 */
export declare function enumerateObject<TInput>(source: TInput): IAsyncEnumerable<[keyof TInput, TInput[keyof TInput]]>;
export { except } from "./_private/except";
export { exceptAsync } from "./_private/exceptAsync";
export { first } from "./_private/first";
export { firstAsync } from "./_private/firstAsync";
export { firstOrDefault } from "./_private/firstOrDefault";
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync";
/**
 * Flattens an async iterable
 * @param source AsyncIterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: IAsyncFlatten<TSource>, shallow?: false): IAsyncEnumerable<TSource>;
/**
 * Flattens an async iterable
 * @param source AsyncIterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export declare function flatten<TSource>(source: AsyncIterable<TSource | AsyncIterable<TSource>>, shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>;
/**
 * Converts the input array of promises to an async iterable
 * @param promises Array of Promises to Convert to an IAsyncEnumerable<T>
 * @throws {InvalidOperationException} No Elements in the Promises Array
 * @returns IAsyncEnumerable<T>
 */
export declare function from<TSource>(promises: Array<Promise<TSource>>): IAsyncEnumerable<TSource>;
/**
 * Converts the input method to an async iterable
 * @param asyncIterable Function which returns an AsyncIterableIterator<TSource>
 * @returns IAsyncEnumerable<T>
 */
export declare function from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>;
export { each } from "./_private/each";
export { eachAsync } from "./_private/eachAsync";
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupBy<TSource, TKey extends SelectorKeyType>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey): IAsyncEnumerable<IGrouping<TKey, TSource>>;
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> to compare keys.
 */
export declare function groupBy<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An AsyncIterable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupByAsync<TSource, TKey extends SelectorKeyType>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey): IAsyncEnumerable<IGrouping<TKey, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> or IAsyncEqualityComparer<T> to compare keys.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export declare function groupByAsync<TSource, TKey>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
/**
 * Groups the elements of a sequence according to a specified key selector function and
 * projects the elements for each group by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TElement>>
 * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
 */
export declare function groupByWithSel<TSource, TKey extends SelectorKeyType, TElement>(source: AsyncIterable<TSource>, keySelector: (x: TSource) => TKey, elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<TKey, TElement>>;
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @param comparer An IEqualityComparer<T> to compare keys.
 * @returns An IAsyncEnumerable<IGrouping<TKey,TElement>>
 * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
 */
export declare function groupByWithSel<TSource, TKey, TElement>(source: AsyncIterable<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>;
/**
 * Correlates the elements of two sequences based on matching keys.
 * A specified IEqualityComparer<T> is used to compare keys or the strict equality comparer.
 * @param outer The first sequence to join.
 * @param inner The sequence to join to the first sequence.
 * @param outerKeySelector A function to extract the join key from each element of the first sequence.
 * @param innerKeySelector A function to extract the join key from each element of the second sequence.
 * @param resultSelector A function to create a result element from two matching elements.
 * @param comparer An IEqualityComparer<T> to hash and compare keys. Optional.
 * @returns An IAsyncEnumerable<T> that has elements of type TResult that
 * are obtained by performing an inner join on two sequences.
 */
export declare function join<TOuter, TInner, TKey, TResult>(outer: AsyncIterable<TOuter>, inner: AsyncIterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>;
/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If not comparer is specified, uses the @see {StrictEqualityComparer}
 * @param first An IAsyncEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncEnumerable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export declare function intersect<TSource>(first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
/**
 * Produces the set intersection of two sequences by using the specified IAsyncEqualityComparer<T> to compare values.
 * @param first An IAsyncEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncEnumerable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export declare function intersectAsync<TSource>(first: IAsyncEnumerable<TSource>, second: IAsyncEnumerable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A transform function to apply to each element.
 * @returns
 * An IAsyncEnumerable<T> whose elements are the result of invoking the transform function on each element of source.
 */
export declare function select<TSource, TResult>(source: AsyncIterable<TSource>, selector: (x: TSource, index: number) => TResult): IAsyncEnumerable<TResult>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IAsyncEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export declare function select<TSource, TKey extends keyof TSource>(source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector An async transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking
 * the transform function on each element of source.
 */
export declare function selectAsync<TSource, TResult>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>;
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param key A key of the elements in the sequence
 * @returns An IAsyncEnumerable<T> whoe elements are the result of getting the value for key
 * on each element of source.
 */
export declare function selectAsync<TSource extends {
    [key: string]: Promise<any>;
}, TKey extends keyof TSource>(source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>;
/**
 * Projects each element of a sequence to an IAsyncEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export declare function selectMany<TSource, Y>(source: AsyncIterable<TSource>, selector: (x: TSource, index: number) => Iterable<Y>): IAsyncEnumerable<Y>;
/**
 * Projects each element of a sequence to an AsyncIterable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An AsyncIterable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export declare function selectMany<TSource extends {
    [key: string]: Iterable<Y>;
}, Y>(source: AsyncIterable<TSource>, selector: keyof TSource): IAsyncEnumerable<Y>;
/**
 * Projects each element of a sequence to an IAsyncEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export declare function selectManyAsync<TSource, Y>(source: AsyncIterable<TSource>, selector: (x: TSource, index: number) => Promise<Iterable<Y>>): IAsyncEnumerable<Y>;
export { single } from "./_private/single";
export { singleAsync } from "./_private/singleAsync";
export { singleOrDefault } from "./_private/singleOrDefault";
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync";
/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An AsyncIterable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IAsyncEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
export declare function skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource>;
/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting at the first element
 * in the linear series that does not pass the test specified by predicate.
 */
export declare function skipWhile<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting
 * at the first element in the linear series that does not pass the test specified by predicate.
 */
export declare function skipWhileAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
/**
 * Applies a type filter to a source iteration
 * @param source Async Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export declare function ofType<TSource, TType extends OfType>(source: AsyncIterable<TSource>, type: TType): IAsyncEnumerable<InferType<TType>>;
/**
 * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted according to a key.
 */
export declare function orderBy<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
/**
 * Sorts the elements of a sequence in ascending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted according to a key.
 */
export declare function orderByAsync<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
/**
 * Sorts the elements of a sequence in descending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @return An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export declare function orderByDescending<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => TKey, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @return An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export declare function orderByDescendingAsync<TSource, TKey>(source: IAsyncEnumerable<TSource>, keySelector: (x: TSource) => Promise<TKey>, comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource>;
export { last } from "./_private/last";
export { lastAsync } from "./_private/lastAsync";
export { lastOrDefault } from "./_private/lastOrDefault";
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync";
export { max } from "./_private/max";
export { maxAsync } from "./_private/maxAsync";
export { min } from "./_private/min";
export { minAsync } from "./_private/minAsync";
export { partition } from "./_private/partition";
export { partitionAsync } from "./_private/partitionAsync";
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IAsyncEnumerable<number> that contains a range of sequential integral numbers.
 */
export declare function range(start: number, count: number): IAsyncEnumerable<number>;
/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IAsyncEnumerable<T> that contains a repeated value.
 */
export declare function repeat<TResult>(element: TResult, count: number, delay?: number): IAsyncEnumerable<TResult>;
/**
 * Inverts the order of the elements in a sequence.
 * @param source A sequence of values to reverse.
 * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
 */
export declare function reverse<TSource>(source: AsyncIterable<TSource>): IAsyncEnumerable<TSource>;
export { sequenceEquals } from "./_private/sequenceEquals";
export { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync";
export { sum } from "./_private/sum";
export { sumAsync } from "./_private/sumAsync";
/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 * @returns An IAsyncEnumerable<T> that contains the specified number of elements from the start of the input sequence.
 */
export declare function take<TSource>(source: AsyncIterable<TSource>, amount: number): IAsyncEnumerable<TSource>;
/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence
 * that occur before the element at which the test no longer passes.
 */
export declare function takeWhile<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence
 * that occur before the element at which the test no longer passes.
 */
export declare function takeWhileAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
export { toArray } from "./_private/toArray";
export { toMap } from "./_private/toMap";
export { toMapAsync } from "./_private/toMapAsync";
export { toObject } from "./_private/toObject";
export { toObjectAsync } from "./_private/toObjectAsync";
export { toSet } from "./_private/toSet";
/**
 * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
 * @param first An AsyncIterable<T> whose distinct elements form the first set for the union.
 * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IEqualityComparer<T> to compare values. Optional.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export declare function union<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An AsyncIterable<T> whose distinct elements form the first set for the union.
 * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export declare function unionAsync<TSource>(first: AsyncIterable<TSource>, second: AsyncIterable<TSource>, comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export declare function where<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to filter.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export declare function whereAsync<TSource>(source: AsyncIterable<TSource>, predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>;
/**
 * Creates tuples from th corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zip<T, Y>(first: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<[T, Y]>;
/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector A function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zip<TFirst, TSecond, TResult>(first: AsyncIterable<TFirst>, second: AsyncIterable<TSecond>, resultSelector: (x: TFirst, y: TSecond) => TResult): IAsyncEnumerable<TResult>;
/**
 * Applies a specified async function to the corresponding elements of two sequences,
 * producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector An async function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export declare function zipAsync<TFirst, TSecond, TResult>(first: AsyncIterable<TFirst>, second: AsyncIterable<TSecond>, resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult>;
