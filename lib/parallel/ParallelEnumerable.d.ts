import { IAsyncEqualityComparer, IAsyncParallel, IComparer, IEqualityComparer, IGrouping, IOrderedParallelEnumerable, IParallelEnumerable, SelectorKeyType } from "../types";
import { toArray } from "./_private/toArray";
/**
 * Contains static methods to work with Parallel Async
 */
export { aggregate } from "./_private/aggregate";
export { all } from "./_private/all";
export { allAsync } from "./_private//allAsync";
export { empty } from "./_private/empty";
export { any } from "./_private/any";
export { anyAsync } from "./_private/anyAsync";
export { asAsync } from "./_private/asAsync";
export { average } from "./_private/average";
export { averageAsync } from "./_private/averageAsync";
export { concat } from "./_private/concat";
export { contains } from "./_private/contains";
export { containsAsync } from "./_private/containsAsync";
export { count } from "./_private/count";
export { countAsync } from "./_private/countAsync";
export { distinct } from "./_private/distinct";
export { distinctAsync } from "./_private/distinctAsync";
export { each } from "./_private/each";
export { eachAsync } from "./_private/eachAsync";
export { elementAt } from "./_private/elementAt";
export { elementAtOrDefault } from "./_private/elementAtOrDefault";
export { except } from "./_private/except";
export { exceptAsync } from "./_private/exceptAsync";
export { first } from "./_private/first";
export { firstAsync } from "./_private/firstAsync";
export { firstOrDefault } from "./_private/firstOrDefault";
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync";
export { flatten } from "./_private/flatten";
export { from } from "./_private/from";
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
export { join } from "./_private/join";
export { intersect } from "./_private/intersect";
export { intersectAsync } from "./_private/intersectAsync";
export { last } from "./_private/last";
export { lastAsync } from "./_private/lastAsync";
export { lastOrDefault } from "./_private/lastOrDefault";
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync";
export { max } from "./_private/max";
export { maxAsync } from "./_private/maxAsync";
export { min } from "./_private/min";
export { minAsync } from "./_private/minAsync";
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
export declare function selectAsync<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource, index: number) => Promise<OUT>): IParallelEnumerable<OUT>;
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
export declare function selectMany<TSource, OUT>(source: IParallelEnumerable<TSource>, selector: (x: TSource, index: number) => Iterable<OUT>): IParallelEnumerable<OUT>;
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
export declare function selectManyAsync<TSource, TResult>(source: IParallelEnumerable<TSource>, selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IParallelEnumerable<TResult>;
export { ofType } from "./_private/ofType";
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
export { partition } from "./_private/partition";
export { partitionAsync } from "./_private/partitionAsync";
export { range } from "./_private/range";
export { repeat } from "./_private/repeat";
export { reverse } from "./_private/reverse";
export { sequenceEquals } from "./_private/sequenceEquals";
export { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync";
export { single } from "./_private/single";
export { singleAsync } from "./_private/singleAsync";
export { singleOrDefault } from "./_private/singleOrDefault";
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync";
export { skip } from "./_private/skip";
export { skipWhile } from "./_private/skipWhile";
export { skipWhileAsync } from "./_private/skipWhileAsync";
export { sum } from "./_private/sum";
export { sumAsync } from "./_private/sumAsync";
export { take } from "./_private/take";
export { takeWhile } from "./_private/takeWhile";
export { takeWhileAsync } from "./_private/takeWhileAsync";
export { toArray };
export { toMap } from "./_private/toMap";
export { toMapAsync } from "./_private/toMapAsync";
export { toObject } from "./_private/toObject";
export { toSet } from "./_private/toSet";
export { union } from "./_private/union";
export { unionAsync } from "./_private/unionAsync";
export { where } from "./_private/where";
export { whereAsync } from "./_private/whereAsync";
export { zip } from "./_private/zip";
export { zipAsync } from "./_private/zipAsync";
