import "core-js/modules/es7.symbol.async-iterator"

import { from as parallelFrom } from "../parallel/parallel"
import {
    IAsyncEnumerable, IAsyncEqualityComparer,
    IAsyncFlatten,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    IOrderedAsyncEnumerable,
    IParallelEnumerable, OfType, ParallelGeneratorType, SelectorKeyType } from "../types"
import {
    ArgumentOutOfRangeException,
    EqualityComparer,
    ErrorString,
    InvalidOperationException,
    StrictEqualityComparer,
} from "./../shared/shared"
import * as AsyncEnumerablePrivate from "./AsyncEnumerablePrivate"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"
import { OrderedAsyncEnumerable } from "./OrderedAsyncEnumerable"

// tslint:disable:no-shadowed-variable

/**
 * Provides static methods that work with IAsyncEnumerable<T> and AsyncIterable<T>
 */

export { aggregate } from "./_private/aggregate"
export { all } from "./_private/all"
export { allAsync } from "./_private/allAsync"
export { any } from "./_private/any"
export { anyAsync } from "./_private/anyAsync"
export { average } from "./_private/average"
export { averageAsync } from "./_private/averageAsync"
export { contains } from "./_private/contains"
export { containsAsync } from "./_private/containsAsync"
export { count } from "./_private/count"
export { countAsync } from "./_private/countAsync"
export { elementAt } from "./_private/elementAt"

/**
 * Convers an async iterable to a Parallel Enumerable.
 * @param source AsyncIterable<T> to conver to IParallelEnumerable<T>
 * @returns Parallel Enumerable of source
 */
export function asParallel<TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource> {
    async function generator() {
        const data = []
        for await(const value of source) {
            data.push(value)
        }
        return data
    }

    return parallelFrom(ParallelGeneratorType.PromiseToArray, generator)
}

/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IAsyncEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
export function concat<TSource>(
    first: AsyncIterable<TSource>, second: AsyncIterable<TSource>): IAsyncEnumerable<TSource> {
    async function* iterator() {
        yield* first
        yield* second
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Returns distinct elements from a sequence by using the default or specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IEqualityComparer<T> to compare values. Optional. Defaults to Strict Equality Comparison.
 * @returns An IAsyncEnumerable<T> that contains distinct elements from the source sequence.
 */
export function distinct<TSource>(
    source: AsyncIterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IAsyncEnumerable<TSource> {

    async function* iterator() {
        const distinctElements: TSource[] = []
        for await (const item of source) {

            const foundItem = distinctElements.find((x) => comparer(x, item))

            if (!foundItem) {
                distinctElements.push(item)
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Returns distinct elements from a sequence by using the specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains distinct elements from the source sequence.
 */
export function distinctAsync<TSource>(
    source: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        const distinctElements: TSource[] = []
        outerLoop:
        for await (const item of source) {
            for (const distinctElement of distinctElements) {
                const found = await comparer(distinctElement, item)
                if (found) {
                    continue outerLoop
                }
            }

            distinctElements.push(item)
            yield item
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export { elementAtOrDefault } from "./_private/elementAtOrDefault"

/**
 * Returns an empty IAsyncEnumerable<T> that has the specified type argument.
 * @returns An empty IAsyncEnumerable<T> whose type argument is TResult.
 */
export function empty<TResult>(): IAsyncEnumerable<TResult> {
    async function *iterable() {
        for await (const _ of []) {
            yield _
        }
    }

    return new BasicAsyncEnumerable<TResult>(iterable)
}

/**
 * Iterates through the object
 * @param source Source Object
 * @returns IAsyncEnumerabe<[TKey, TValue]> of Key Value pairs
 */
export function enumerateObject<TInput>(
    source: TInput): IAsyncEnumerable<[keyof TInput, TInput[keyof TInput]]> {
    async function *iterable(): AsyncIterableIterator<[keyof TInput, TInput[keyof TInput]]> {
        /* tslint:disable */
        for (const key in source) {
            yield [ key, source[key] ]
        }
        /* tslint:enable */
    }

    return new BasicAsyncEnumerable(iterable)
}

// tslint:disable:no-shadowed-variable

/**
 * Produces the set difference of two sequences by using the comparer provided
 * or EqualityComparer to compare values.
 * @param first An AsyncIterable<T> whose elements that are not also in second will be returned.
 * @param second An AsyncIterable<T> whose elements that also occur in the first sequence
 * will cause those elements to be removed from the returned sequence.
 * @param comparer An IEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the set difference of the elements of two sequences.
 */
export function except<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IEqualityComparer<TSource> = EqualityComparer): IAsyncEnumerable<TSource> {

    async function *iterator() {
        // TODO: async eq of [...second] ?
        const secondArray = []
        for await (const x of second) {
            secondArray.push(x)
        }

        for await (const firstItem of first) {

            let exists = false
            for (let j = 0; j < secondArray.length; j++) {
                const secondItem = secondArray[j]

                if (comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                yield firstItem
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Produces the set difference of two sequences by using the comparer provided to compare values.
 * @param first An AsyncIterable<T> whose elements that are not also in second will be returned.
 * @param second An AsyncIterable<T> whose elements that also occur in the first sequence
 * will cause those elements to be removed from the returned sequence.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the set difference of the elements of two sequences.
 */
export function exceptAsync<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator() {
        // TODO: async eq of [...second] ?
        const secondArray = []
        for await (const x of second) {
            secondArray.push(x)
        }

        for await (const firstItem of first) {

            let exists = false
            for (let j = 0; j < secondArray.length; j++) {
                const secondItem = secondArray[j]

                if (await comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                yield firstItem
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export { first } from "./_private/first"
export { firstAsync } from "./_private/firstAsync"
export { firstOrDefault } from "./_private/firstOrDefault"
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync"

/**
 * Flattens an async iterable
 * @param source AsyncIterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export function flatten<TSource>(
    source: IAsyncFlatten<TSource>,
    shallow?: false): IAsyncEnumerable<TSource>
/**
 * Flattens an async iterable
 * @param source AsyncIterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>,
    shallow: true): IAsyncEnumerable<TSource | AsyncIterable<TSource>>
export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>,
    shallow?: boolean): IAsyncEnumerable<TSource | AsyncIterable<TSource>> {

    async function* iterator(sourceInner: AsyncIterable<any>)
        : AsyncIterableIterator<TSource | AsyncIterable<TSource>> {
        for await (const item of sourceInner) {
            if (item[Symbol.asyncIterator] !== undefined) {
                const items = shallow ? item : iterator(item as AsyncIterable<any>)
                for await (const inner of items) {
                    yield inner
                }
            } else {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(() => iterator(source))
}

/**
 * Converts the input array of promises to an async iterable
 * @param promises Array of Promises to Convert to an IAsyncEnumerable<T>
 * @throws {InvalidOperationException} No Elements in the Promises Array
 * @returns IAsyncEnumerable<T>
 */
export function from<TSource>(promises: Array<Promise<TSource>>): IAsyncEnumerable<TSource>
/**
 * Converts the input method to an async iterable
 * @param asyncIterable Function which returns an AsyncIterableIterator<TSource>
 * @returns IAsyncEnumerable<T>
 */
export function from<TSource>(asyncIterable: () => AsyncIterableIterator<TSource>): IAsyncEnumerable<TSource>
export function from<TSource>(promisesOrIterable: Array<Promise<TSource>> | (() => AsyncIterableIterator<TSource>)) {
    if (Array.isArray(promisesOrIterable)) {
        if (promisesOrIterable.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        return new BasicAsyncEnumerable(async function*() {
            for await (const value of promisesOrIterable) {
                yield value
            }
        })
    } else {
        return new BasicAsyncEnumerable(promisesOrIterable)
    }
}

/**
 * Performs a specified action on each element of the Iterable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IAsyncEnumerable<T> that executes the action lazily as you iterate.
 */
export function each<TSource>(
    source: AsyncIterable<TSource>, action: (x: TSource) => void): IAsyncEnumerable<TSource> {
    async function *iterator() {
        for await (const value of source) {
            action(value)
            yield value
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Performs a specified action on each element of the AsyncIterable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IAsyncEnumerable<T> that executes the action lazily as you iterate.
 */
export function eachAsync<TSource>(
    source: AsyncIterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
    async function *iterator() {
        for await (const value of source) {
            await action(value)
            yield value
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupBy<TSource, TKey extends SelectorKeyType>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey): IAsyncEnumerable<IGrouping<TKey, TSource>>
/**
 * Groups the elements of a sequence according to a key selector function.
 * The keys are compared by using a comparer and each group's elements are projected by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> to compare keys.
 */
export function groupBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return AsyncEnumerablePrivate.groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        return AsyncEnumerablePrivate.groupBy_0_Simple(source,
            keySelector as (x: TSource) => any)
    }
}

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An AsyncIterable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupByAsync<TSource, TKey extends SelectorKeyType>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey): IAsyncEnumerable<IGrouping<TKey, TSource>>
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param comparer An IEqualityComparer<T> or IAsyncEqualityComparer<T> to compare keys.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupByAsync<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupByAsync<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return AsyncEnumerablePrivate.groupByAsync_0<TSource, TKey>(source, keySelector, comparer)
    } else {
        return AsyncEnumerablePrivate.groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => Promise<any>)
    }
}

/**
 * Groups the elements of a sequence according to a specified key selector function and
 * projects the elements for each group by using a specified function.
 * @param source An AsyncIterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @returns An IAsyncEnumerable<IGrouping<TKey, TElement>>
 * where each IGrouping<TKey,TElement> object contains a collection of objects of type TElement and a key.
 */
export function groupByWithSel<TSource, TKey extends SelectorKeyType, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<TKey, TElement>>
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
export function groupByWithSel<TSource, TKey, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => TKey),
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TElement>> {

    if (comparer) {
        return AsyncEnumerablePrivate.groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return AsyncEnumerablePrivate.groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}

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
export function join<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IAsyncEnumerable<TResult> {
    async function *iterator(): AsyncIterableIterator<TResult> {
        const innerArray = []
        for await (const i of inner) {
            innerArray.push(i)
        }

        for await (const o of outer) {
            const outerKey = outerKeySelector(o)

            for (const i of innerArray) {
                const innerKey = innerKeySelector(i)
                if (comparer(outerKey, innerKey) === true) {
                    yield resultSelector(o, i)
                }
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

// tslint:disable:no-shadowed-variable

/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If not comparer is specified, uses the @see {StrictEqualityComparer}
 * @param first An IAsyncEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncEnumerable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export function intersect<TSource>(
    first: IAsyncEnumerable<TSource>,
    second: IAsyncEnumerable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IAsyncEnumerable<TSource> {

    async function *iterator(): AsyncIterableIterator<TSource> {

        const firstResults = await first.distinct(comparer).toArray()

        if (firstResults.length === 0) {
            return
        }

        const secondResults = await second.toArray()

        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (comparer(firstValue, secondValue) === true) {
                    yield firstValue
                    break
                }
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Produces the set intersection of two sequences by using the specified IAsyncEqualityComparer<T> to compare values.
 * @param first An IAsyncEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncEnumerable<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
export function intersectAsync<TSource>(
    first: IAsyncEnumerable<TSource>,
    second: IAsyncEnumerable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator(): AsyncIterableIterator<TSource> {

        const firstResults = await first.distinctAsync(comparer).toArray()

        if (firstResults.length === 0) {
            return
        }

        const secondResults = await second.toArray()

        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (await comparer(firstValue, secondValue) === true) {
                    yield firstValue
                    break
                }
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A transform function to apply to each element.
 * @returns
 * An IAsyncEnumerable<T> whose elements are the result of invoking the transform function on each element of source.
 */
export function select<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IAsyncEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
export function select<TSource, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function select<T, Y>(
    source: IAsyncEnumerable<T> | AsyncIterable<T>, selector: (x: T) => Y | string): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.select_2(source, selector)
    } else {
        return AsyncEnumerablePrivate.select_1(source, selector)
    }
}

/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector An async transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking
 * the transform function on each element of source.
 */
export function selectAsync<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param key A key of the elements in the sequence
 * @returns An IAsyncEnumerable<T> whoe elements are the result of getting the value for key
 * on each element of source.
 */
export function selectAsync<TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.selectAsync_2(source, selector)
    } else {
        return AsyncEnumerablePrivate.selectAsync_1(source, selector as (x: TSource) => Promise<TResult>)
    }
}

/**
 * Projects each element of a sequence to an IAsyncEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectMany<TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>
/**
 * Projects each element of a sequence to an AsyncIterable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An AsyncIterable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export function selectMany
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
    source: AsyncIterable<TSource>,
    selector: keyof TSource): IAsyncEnumerable<Y>
export function selectMany(
    source: AsyncIterable<any>,
    selector: any): IAsyncEnumerable<any> {
    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.selectMany_2(source, selector)
    } else {
        return AsyncEnumerablePrivate.selectMany_1(source, selector)
    }
}

/**
 * Projects each element of a sequence to an IAsyncEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectManyAsync<TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<Iterable<Y>>): IAsyncEnumerable<Y> {
    async function* iterator() {
        for await (const value of source) {
            const many = await selector(value)
            for (const innerValue of many) {
                yield innerValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export { single } from "./_private/single"
export { singleAsync } from "./_private/singleAsync"
export { singleOrDefault } from "./_private/singleOrDefault"
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync"

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An AsyncIterable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IAsyncEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
export function skip<TSource>(source: AsyncIterable<TSource>, count: number): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let i = 0
        for await (const item of source) {
            if (i++ >= count) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting at the first element
 * in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.skipWhile_1(source, predicate as (x: TSource) => boolean)
    } else {
        return AsyncEnumerablePrivate.skipWhile_2(source, predicate)
    }
}

/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting
 * at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhileAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.skipWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return AsyncEnumerablePrivate.skipWhileAsync_2(source, predicate)
    }
}

/**
 * Applies a type filter to a source iteration
 * @param source Async Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export function ofType<TSource, TType extends OfType>(
    source: AsyncIterable<TSource>,
    type: TType): IAsyncEnumerable<InferType<TType>> {

    const typeCheck = typeof type === "string" ?
        ((x: TSource) => typeof x === type) as (x: TSource) => x is InferType<TType> :
        ((x: TSource) => x instanceof (type as any)) as (x: TSource) => x is InferType<TType>

    async function *iterator(): AsyncIterableIterator<InferType<TType>> {
        for await (const item of source) {
            if (typeCheck(item)) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted according to a key.
 */
export function orderBy<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generate(source, keySelector, true, comparer)
}

/**
 * Sorts the elements of a sequence in ascending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @returns An IOrderedAsyncEnumerable<TElement> whose elements are sorted according to a key.
 */
export function orderByAsync<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generateAsync(source, keySelector, true, comparer)
}

/**
 * Sorts the elements of a sequence in descending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @return An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export function orderByDescending<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generate(source, keySelector, false, comparer)
}

/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @return An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
export function orderByDescendingAsync<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generateAsync(source, keySelector, false, comparer)
}

export { last } from "./_private/last"
export { lastAsync } from "./_private/lastAsync"
export { lastOrDefault } from "./_private/lastOrDefault"
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync"
export { max } from "./_private/max"
export { maxAsync } from "./_private/maxAsync"
export { min } from "./_private/min"
export { minAsync } from "./_private/minAsync"

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IAsyncEnumerable<number> that contains a range of sequential integral numbers.
 */
export function range(start: number, count: number): IAsyncEnumerable<number> {
    if (start < 0 || (start + count - 1) > Number.MAX_SAFE_INTEGER) {
        throw new ArgumentOutOfRangeException(`start`)
    }

    async function* iterator() {
        const max = start + count
        for (let i = start; i < max; i++) {
            yield i
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IAsyncEnumerable<T> that contains a repeated value.
 */
export function repeat<TResult>(
    element: TResult, count: number, delay?: number): IAsyncEnumerable<TResult> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }
    if (delay) {
        return AsyncEnumerablePrivate.repeat_2(element, count, delay)
    } else {
        return AsyncEnumerablePrivate.repeat_1(element, count)
    }
}

/**
 * Inverts the order of the elements in a sequence.
 * @param source A sequence of values to reverse.
 * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
 */
export function reverse<TSource>(source: AsyncIterable<TSource>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        const values = []
        for await (const value of source) {
            values.push(value)
        }

        for (let i = values.length - 1; i >= 0; i--) {
            yield values[i]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export { sequenceEquals } from "./_private/sequenceEquals"
export { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync"
export { sum } from "./_private/sum"
export { sumAsync } from "./_private/sumAsync"

/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 * @returns An IAsyncEnumerable<T> that contains the specified number of elements from the start of the input sequence.
 */
export function take<TSource>(source: AsyncIterable<TSource>, amount: number): IAsyncEnumerable<TSource> {
    async function* iterator() {
        // negative amounts should yield empty
        let amountLeft = amount > 0 ? amount : 0
        for await (const item of source) {
            if (amountLeft-- === 0) {
                break
            } else {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<TSource>(iterator)
}

/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence
 * that occur before the element at which the test no longer passes.
 */
export function takeWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.takeWhile_1(source, predicate as (x: TSource) => boolean)
    } else {
        return AsyncEnumerablePrivate.takeWhile_2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence
 * that occur before the element at which the test no longer passes.
 */
export function takeWhileAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.takeWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return AsyncEnumerablePrivate.takeWhileAsync_2(source, predicate)
    }
}

export { toArray } from "./_private/toArray"
export { toMap } from "./_private/toMap"
export { toMapAsync } from "./_private/toMapAsync"

export { toObject } from "./_private/toObject"
export { toObjectAsync } from "./_private/toObjectAsync"
export { toSet } from "./_private/toSet"

/**
 * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
 * @param first An AsyncIterable<T> whose distinct elements form the first set for the union.
 * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IEqualityComparer<T> to compare values. Optional.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export function union<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
    if (comparer) {
        return AsyncEnumerablePrivate.union_2(first, second, comparer)
    } else {
        return AsyncEnumerablePrivate.union_1(first, second)
    }
}

/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An AsyncIterable<T> whose distinct elements form the first set for the union.
 * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export function unionAsync<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const result: TSource[] = []

        for (const source of [first, second]) {
            for await (const value of source) {
                let exists = false

                for (const resultValue of result) {
                    if (await comparer(value, resultValue) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    yield value
                    result.push(value)
                }
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export function where<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.where_1(source, predicate as (x: TSource) => boolean)
    } else {
        return AsyncEnumerablePrivate.where_2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to filter.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export function whereAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.whereAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return AsyncEnumerablePrivate.whereAsync_2(source, predicate)
    }
}

/**
 * Creates tuples from th corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export function zip<T, Y>(
    first: AsyncIterable<T>,
    second: AsyncIterable<Y>): IAsyncEnumerable<[T, Y]>
/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector A function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export function zip<TFirst, TSecond, TResult>(
    first: AsyncIterable<TFirst>,
    second: AsyncIterable<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => TResult): IAsyncEnumerable<TResult>
export function zip<TFirst, TSecond, TResult>(
    first: AsyncIterable<TFirst>,
    second: AsyncIterable<TSecond>,
    resultSelector?: (x: TFirst, y: TSecond) => TResult)
    : IAsyncEnumerable<TResult> | IAsyncEnumerable<[TFirst, TSecond]> {
    if (resultSelector) {
        return AsyncEnumerablePrivate.zip_2(first, second, resultSelector)
    } else {
        return AsyncEnumerablePrivate.zip_1(first, second)
    }
}

/**
 * Applies a specified async function to the corresponding elements of two sequences,
 * producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector An async function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
export function zipAsync<TFirst, TSecond, TResult>(
    first: AsyncIterable<TFirst>,
    second: AsyncIterable<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IAsyncEnumerable<TResult> {
    async function *generator() {
        const firstIterator = first[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const results = await Promise.all([firstIterator.next(), secondIterator.next()])
            const firstNext = results[0]
            const secondNext = results[1]

            if (firstNext.done || secondNext.done) {
                break
            } else {
                yield resultSelector(firstNext.value, secondNext.value)
            }
        }
    }

    return new BasicAsyncEnumerable(generator)
}
