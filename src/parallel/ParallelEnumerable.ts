import {
    IAsyncEqualityComparer,
    IAsyncParallel,
    IComparer,
    IEqualityComparer,
    IGrouping,
    IOrderedParallelEnumerable,
    IParallelEnumerable,
    ParallelGeneratorType, SelectorKeyType, TypedData } from "../types"
import { nextIteration } from "./_private/_nextIteration"
import { nextIterationAsync } from "./_private/_nextIterationAsync"
import { nextIterationWithIndex } from "./_private/_nextIterationWithIndex"
import { nextIterationWithIndexAsync } from "./_private/_nextIterationWithIndexAsync"
import { toArray } from "./_private/toArray"
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"
import { OrderedParallelEnumerable } from "./OrderedParallelEnumerable"
import * as ParallelEnumerablePrivate from "./ParallelEnumerablePrivate"

/**
 * Contains static methods to work with Parallel Async
 */

export { aggregate } from "./_private/aggregate"
export { all } from "./_private/all"
export { allAsync } from "./_private//allAsync"
export { empty } from "./_private/empty"
export { any } from "./_private/any"
export { anyAsync } from "./_private/anyAsync"
export { asAsync } from "./_private/asAsync"
export { average } from "./_private/average"
export { averageAsync } from "./_private/averageAsync"
export { concat } from "./_private/concat"
export { contains } from "./_private/contains"
export { containsAsync } from "./_private/containsAsync"
export { count } from "./_private/count"
export { countAsync } from "./_private/countAsync"
export { distinct } from "./_private/distinct"
export { distinctAsync } from "./_private/distinctAsync"
export { each } from "./_private/each"
export { eachAsync } from "./_private/eachAsync"
export { elementAt } from "./_private/elementAt"
export { elementAtOrDefault } from "./_private/elementAtOrDefault"
export { except } from "./_private/except"
export { exceptAsync } from "./_private/exceptAsync"
export { first } from "./_private/first"
export { firstAsync } from "./_private/firstAsync"
export { firstOrDefault } from "./_private/firstOrDefault"
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync"
export { flatten } from "./_private/flatten"
export { from } from "./_private/from"

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupBy<TSource, TKey extends SelectorKeyType>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey): IParallelEnumerable<IGrouping<TKey, TSource>>
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> to compare keys.
 */
export function groupBy<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
export function groupBy<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>> {

    if (comparer) {
        return ParallelEnumerablePrivate.groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        return ParallelEnumerablePrivate.groupBy_0_Simple(source,
            keySelector as (x: TSource) => any)
    }
}

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupByAsync<TSource, TKey extends SelectorKeyType>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey): IParallelEnumerable<IGrouping<TKey, TSource>>
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> or IAsyncEqualityComparer<T> to compare keys.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupByAsync<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>
export function groupByAsync<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>)
        : IParallelEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return ParallelEnumerablePrivate.groupByAsync_0<TSource, TKey>(source,
            keySelector, comparer)
    } else {
        return ParallelEnumerablePrivate.groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => any)
    }
}

/**
 * Groups the elements of a sequence according to a specified key selector function and
 * projects the elements for each group by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @returns An IParallelEnumerable<IGrouping<TKey, TElement>>
 * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
 */
export function groupByWithSel<TSource, TKey extends SelectorKeyType, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: ((x: TSource) => TKey),
    elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<TKey, TElement>>
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
export function groupByWithSel<TSource, TKey, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: ((x: TSource) => TKey),
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<any, TElement>> {

    if (comparer) {
        return ParallelEnumerablePrivate.groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return ParallelEnumerablePrivate.groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}

export { join } from "./_private/join"
export { intersect } from "./_private/intersect"
export { intersectAsync } from "./_private/intersectAsync"
export { last } from "./_private/last"
export { lastAsync } from "./_private/lastAsync"
export { lastOrDefault } from  "./_private/lastOrDefault"
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync"
export { max } from "./_private/max"
export { maxAsync } from "./_private/maxAsync"
export { min } from "./_private/min"
export { minAsync } from "./_private/minAsync"

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A transform function to apply to each element.
 * @returns
 * An IParallelEnumerable<T> whose elements are the result of invoking the transform function on each element of source.
 */
export function select<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => OUT): IParallelEnumerable<OUT>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IParallelEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export function select<TSource, TKey extends keyof TSource>(
    source: IParallelEnumerable<TSource>,
    key: TKey): IParallelEnumerable<TSource[TKey]>
export function select<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    key: string | ((x: TSource, index: number) => OUT)): IParallelEnumerable<any> {
    if (typeof key === "function") {
        if (key.length === 1) {
            return new BasicParallelEnumerable(nextIteration(source, key as (x: TSource) => OUT))
        } else {
            return new BasicParallelEnumerable(nextIterationWithIndex(source, key))
        }
    } else {
        return new BasicParallelEnumerable(nextIteration(source, (x: any) => x[key] as OUT))
    }
}

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector An async transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking
 * the transform function on each element of source.
 */
export function selectAsync<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource, index: number) => Promise<OUT>): IParallelEnumerable<OUT>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param key A key of the elements in the sequence
 * @returns An IParallelEnumerable<T> whoe elements are the result of getting the value for key
 * on each element of source.
 */
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: IParallelEnumerable<TResult>,
    selector: TKey): IParallelEnumerable<TResult>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TResult>(
    source: IParallelEnumerable<TSource>,
    keyOrSelector: string | ((x: TSource, index: number) => Promise<TResult>)): IParallelEnumerable<TResult> {
    let generator: TypedData<TResult>
    if (typeof keyOrSelector === "function") {
        if (keyOrSelector.length === 1) {
            generator = nextIterationAsync(source, keyOrSelector as (x: TSource) => Promise<TResult>)
        } else {
            generator = nextIterationWithIndexAsync(source, keyOrSelector)
        }
    } else {
        generator = nextIterationAsync(source, (x: TSource) => (x[keyOrSelector]))
    }

    return new BasicParallelEnumerable(generator)
}

/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectMany<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource, index: number) => Iterable<OUT>): IParallelEnumerable<OUT>
/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export function selectMany<TBindedSource extends { [key: string]: Iterable<TOut> }, TOut>(
    source: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>
export function selectMany<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: ((x: TSource, index: number) => Iterable<OUT>) | keyof TSource): IParallelEnumerable<any> {
    const generator = async () => {
        let values: TypedData<Iterable<OUT>>
        if (typeof selector === "function") {
            if (selector.length === 1) {
                values = await nextIteration(source, selector as (x: TSource) => Iterable<OUT>)
            } else {
                values = await nextIterationWithIndex(source, selector)
            }
        } else {
            values = await nextIteration(source, (x: any) => x[selector])
        }

        const valuesArray = []
        switch (values.type) {
            case ParallelGeneratorType.PromiseToArray: {
                for (const outer of await values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.ArrayOfPromises: {
                for (const outer of values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.PromiseOfPromises: {
                for (const outer of await values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
        }
        return valuesArray
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectManyAsync<TSource, TResult>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IParallelEnumerable<TResult> {
    const generator = async () => {
        let values: TypedData<Iterable<TResult>>
        if (selector.length === 1) {
            values = await nextIterationAsync(source, selector as (x: TSource) => Promise<Iterable<TResult>>)
        } else {
            values = await nextIterationWithIndexAsync(source, selector)
        }

        const valuesArray = []
        switch (values.type) {
            case ParallelGeneratorType.PromiseToArray: {
                for (const outer of await values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.ArrayOfPromises: {
                for (const outer of values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.PromiseOfPromises: {
                for (const outer of await values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
        }
        return valuesArray
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export { ofType } from "./_private/ofType"

/**
 * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @returns An IOrderedParallelEnumerable<TElement> whose elements are sorted according to a key.
 */
export function orderBy<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
    return OrderedParallelEnumerable.generate(source, keySelector, true, comparer)
}

/**
 * Sorts the elements of a sequence in ascending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @returns An IOrderedParallelEnumerable<TElement> whose elements are sorted according to a key.
 */
export function orderByAsync<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
    return OrderedParallelEnumerable.generateAsync(source, keySelector, true, comparer)
}

/**
 * Sorts the elements of a sequence in descending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @return An IOrderedParallelEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export function orderByDescending<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
    return OrderedParallelEnumerable.generate(source, keySelector, false, comparer)
}

/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @return An IOrderedParallelEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export function orderByDescendingAsync<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
    return OrderedParallelEnumerable.generateAsync(source, keySelector, false, comparer)
}

export { partition } from "./_private/partition"
export { partitionAsync } from "./_private/partitionAsync"
export { range } from "./_private/range"
export { repeat } from "./_private/repeat"
export { reverse } from "./_private/reverse"
export { sequenceEquals } from "./_private/sequenceEquals"
export { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync"
export { single } from "./_private/single"
export { singleAsync } from "./_private/singleAsync"
export { singleOrDefault } from "./_private/singleOrDefault"
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync"
export { skip } from "./_private/skip"
export { skipWhile } from "./_private/skipWhile"
export { skipWhileAsync } from "./_private/skipWhileAsync"
export { sum } from "./_private/sum"
export { sumAsync } from "./_private/sumAsync"
export { take } from "./_private/take"
export { takeWhile } from "./_private/takeWhile"
export { takeWhileAsync } from "./_private/takeWhileAsync"
export { toArray }
export { toMap } from "./_private/toMap"
export { toMapAsync } from "./_private/toMapAsync"
export { toObject } from "./_private/toObject"
export { toSet } from "./_private/toSet"
export { union } from "./_private/union"
export { unionAsync } from "./_private/unionAsync"
export { where } from "./_private/where"
export { whereAsync } from "./_private/whereAsync"
export { zip } from "./_private/zip"
export { zipAsync } from "./_private/zipAsync"
