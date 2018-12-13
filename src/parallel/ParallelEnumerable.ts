import {
    ArgumentOutOfRangeException,
    EqualityComparer,
    ErrorString,
    InvalidOperationException,
    StrictEqualityComparer } from "../shared/shared"
import {
    IAsyncEqualityComparer,
    IAsyncParallel,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    IOrderedParallelEnumerable,
    IParallelEnumerable, OfType, ParallelGeneratorType, TypedData } from "../types"
import { nextIteration } from "./_private/_nextIteration"
import { nextIterationAsync } from "./_private/_nextIterationAsync"
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

export function empty<TSource>(): IParallelEnumerable<TSource> {
    const dataFunc: TypedData<TSource> = {
        generator: async () => [],
        type: ParallelGeneratorType.PromiseToArray,
    }

    return new BasicParallelEnumerable(dataFunc)
}

export { any } from "./_private/any"
export { anyAsync } from "./_private/anyAsync"
export { asAsync } from "./_private/asAsync"
export { average } from "./_private/average"
export { averageAsync } from "./_private/averageAsync"

/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IParallelEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
export function concat<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>): IParallelEnumerable<TSource> {
    const generator = async () => {
        // Wait for both enumerables
        const promiseResults = await Promise.all([ first.toArray(), second.toArray() ])
        // Concat
        const firstData = promiseResults[0]
        const secondData = promiseResults[1]
        const data = new Array(firstData.length + secondData.length)
        let i = 0
        for (; i < firstData.length; i++) {
            data[i] = firstData[i]
        }

        for (let j = 0; j < secondData.length; j++, i++) {
            data[i] = secondData[j]
        }

        return data
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export { contains } from "./_private/contains"
export { containsAsync } from "./_private/containsAsync"
export { count } from "./_private/count"
export { countAsync } from "./_private/countAsync"

export function distinct<TSource>(
    source: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {
    const generator = async () => {
        const distinctElements: TSource[] = []
        for (const item of await source.toArray()) {
            const foundItem = distinctElements.find((x) => comparer(x, item))
            if (!foundItem) {
                distinctElements.push(item)
            }
        }
        return distinctElements
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function distinctAsync<TSource>(
    source: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {
    const generator = async () => {
        const distinctElements: TSource[] = []
        outerLoop:
        for (const item of await source.toArray()) {
            for (const distinctElement of distinctElements) {
                const found = await comparer(distinctElement, item)
                if (found) {
                    continue outerLoop
                }
            }

            distinctElements.push(item)
        }

        return distinctElements
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

/**
 * Performs a specified action on each element of the IParallelEnumerable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IParallelEnumerable<T> that executes the action lazily as you iterate.
 */
export function each<TSource>(
    source: IParallelEnumerable<TSource>,
    action: (x: TSource) => void): IParallelEnumerable<TSource> {
    return new BasicParallelEnumerable(nextIteration(source, (x) => {
            action(x)
            return x
        }))
}

/**
 * Performs a specified action on each element of the IParallelEnumerable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IParallelEnumerable<T> that executes the action lazily as you iterate.
 */
export function eachAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    action: (x: TSource) => Promise<void>): IParallelEnumerable<TSource> {
    return new BasicParallelEnumerable(nextIterationAsync(source, async (x) => {
            await action(x)
            return x
        }))
}

export { elementAt } from "./_private/elementAt"
export { elementAtOrDefault } from "./_private/elementAtOrDefault"

export function except<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource> = EqualityComparer): IParallelEnumerable<TSource> {

    const generator = async () => {
        const values = await Promise.all([ first.toArray(), second.toArray() ])
        const firstValues = values[0]
        const secondValues = values[1]
        const resultValues = []

        for (const firstItem of firstValues) {

            let exists = false
            for (let j = 0; j < secondValues.length; j++) {
                const secondItem = secondValues[j]

                if (comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                resultValues.push(firstItem)
            }
        }

        return resultValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function exceptAsync<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {

    const generator = async () => {
        const values = await Promise.all([ first.toArray(), second.toArray() ])
        const firstValues = values[0]
        const secondValues = values[1]
        const resultValues = []

        for (const firstItem of firstValues) {

            let exists = false
            for (let j = 0; j < secondValues.length; j++) {
                const secondItem = secondValues[j]

                if (await comparer(firstItem, secondItem) === true) {
                    exists = true
                    break
                }
            }

            if (exists === false) {
                resultValues.push(firstItem)
            }
        }

        return resultValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export { first } from "./_private/first"
export { firstAsync } from "./_private/firstAsync"
export { firstOrDefault } from "./_private/firstOrDefault"
export { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync"

export function flatten<TSource>(
    source: IAsyncParallel<TSource | IAsyncParallel<TSource>>): IParallelEnumerable<TSource>
export function flatten<TSource>(
    source: IAsyncParallel<TSource | IAsyncParallel<TSource>>,
    shallow: false): IParallelEnumerable<TSource>
export function flatten<TSource>(
    source: IAsyncParallel<TSource | IAsyncParallel<TSource>>,
    shallow: true): IParallelEnumerable<TSource | AsyncIterable<TSource>>
export function flatten<TSource>(
    source: IAsyncParallel<TSource | IAsyncParallel<TSource>>,
    shallow?: boolean): IParallelEnumerable<TSource | AsyncIterable<TSource>> {

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

    const generator = async () => {
        const results = new Array()
        for await (const x of iterator(source)) {
            results.push(x)
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

/**
 * Creates an IParallelEnumerable from a function that returns an Array of Promises
 */
export function from<TSource>(
    type: ParallelGeneratorType.ArrayOfPromises,
    generator: () => Array<Promise<TSource>>): IParallelEnumerable<TSource>
/**
 * Creates an IParallelEnumerable from a function that returns a Promise of data values
 */
export function from<TSource>(
    type: ParallelGeneratorType.PromiseToArray,
    generator: () => Promise<TSource[]>): IParallelEnumerable<TSource>
/**
 * Creates an IParallelEnumerable from a function that returns an promise of an array of promises
 */
export function from<TSource>(
    type: ParallelGeneratorType.PromiseOfPromises,
    generator: () => Promise<Array<Promise<TSource>>>): IParallelEnumerable<TSource>
export function from<TSource>(
    type: any,
    generator: () => any) {
    return new BasicParallelEnumerable<TSource>({
        generator,
        type,
    })
}

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupBy<TSource>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => number): IParallelEnumerable<IGrouping<number, TSource>>
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupBy<TSource>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => string): IParallelEnumerable<IGrouping<string, TSource>>
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
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    comparer?: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return ParallelEnumerablePrivate.groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        return ParallelEnumerablePrivate.groupBy_0_Simple(source,
            keySelector as ((x: TSource) => number) | ((x: TSource) => string))
    }
}

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupByAsync<TSource>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<number> | number): IParallelEnumerable<IGrouping<number, TSource>>
/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source An IAsyncParallel<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An IParallelEnumerable<IGrouping<TKey, TSource>>
 * where each IGrouping<TKey,TElement> object contains a sequence of objects and a key.
 */
export function groupByAsync<TSource>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<string> | string): IParallelEnumerable<IGrouping<string, TSource>>
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

export function groupByWithSel<TSource, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<number, TElement>>
export function groupByWithSel<TSource, TElement>(
    source: IAsyncParallel<TSource>,
    keySelector: ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string, TElement>>
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

export function join<TOuter, TInner, TKey, TResult>(
    outer: IAsyncParallel<TOuter>,
    inner: IAsyncParallel<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult): IParallelEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
    outer: IAsyncParallel<TOuter>,
    inner: IAsyncParallel<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey>): IParallelEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
    outer: IAsyncParallel<TOuter>,
    inner: IAsyncParallel<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IParallelEnumerable<TResult> {
    const generator = async () => {
        const innerOuter = await Promise.all([inner.toArray(), outer.toArray()])
        const innerArray = innerOuter[0]
        const outerArray = innerOuter[1]

        const results = new Array<TResult>()
        for (const o of outerArray) {
            const outerKey = outerKeySelector(o)

            for (const i of innerArray) {
                const innerKey = innerKeySelector(i)
                if (comparer(outerKey, innerKey) === true) {
                    results.push(resultSelector(o, i))
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function intersect<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IParallelEnumerable<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IParallelEnumerable<TSource> {

    const generator = async () => {

        const firstResults = await first.distinct(comparer).toArray()

        if (firstResults.length === 0) {
            return []
        }

        const secondResults = await second.toArray()

        const results = new Array<TSource>()
        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (comparer(firstValue, secondValue) === true) {
                    results.push(firstValue)
                    break
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function intersectAsync<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IParallelEnumerable<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {

    const generator = async () => {

        const firstResults = await first.distinctAsync(comparer).toArray()

        if (firstResults.length === 0) {
            return []
        }

        const secondResults = await second.toArray()

        const results = new Array<TSource>()
        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i]

            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j]

                if (await comparer(firstValue, secondValue) === true) {
                    results.push(firstValue)
                    break
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export async function min(
    source: IParallelEnumerable<number>): Promise<number>
export async function min<TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => number): Promise<number>
export async function min<TSource>(
    source: IParallelEnumerable<TSource>,
    selector?: (x: TSource) => number): Promise<number> {
    let minInfo: any[]
    if (selector) {
        const dataFunc = nextIteration(source, selector)
        minInfo = await new BasicParallelEnumerable(dataFunc)
            .toArray()
    } else {
        minInfo = await source.toArray()
    }

    if (minInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.min.apply(null, minInfo)
}

export { last } from "./_private/last"
export { lastAsync } from "./_private/lastAsync"
export { lastOrDefault } from  "./_private/lastOrDefault"
export { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync"

/**
 * Returns the maximum value in a sequence of values.
 * @param source A sequence of values to determine the maximum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export async function max(source: IParallelEnumerable<number>): Promise<number>
/**
 * Invokes a transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export async function max<TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => number): Promise<number>
export async function max<TSource>(
    source: IParallelEnumerable<TSource>,
    selector?: (x: TSource) => number): Promise<number> {
    let maxInfo: any[]
    if (selector) {
        const dataFunc = nextIteration(source, selector)
        maxInfo = await new BasicParallelEnumerable(dataFunc).toArray()
    } else {
        maxInfo = await source.toArray()
    }

    if (maxInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.max.apply(null, maxInfo)
}

export async function maxAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    const dataFunc = nextIterationAsync(source, selector)
    const maxInfo = await new BasicParallelEnumerable(dataFunc).toArray()

    if (maxInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.max.apply(null, maxInfo)
}

export async function minAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    const dataFunc = nextIterationAsync(source, selector)
    const maxInfo = await new BasicParallelEnumerable(dataFunc).toArray()

    if (maxInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.min.apply(null, maxInfo)
}

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
    key: string | ((x: TSource) => OUT)): IParallelEnumerable<any> {
    if (typeof key === "string") {
        return new BasicParallelEnumerable(nextIteration(source, (x: any) => x[key] as OUT))
    } else {
        return new BasicParallelEnumerable(nextIteration(source, key))
    }
}

export function selectAsync<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<OUT>): IParallelEnumerable<OUT>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: IParallelEnumerable<TResult>,
    selector: TKey): IParallelEnumerable<TResult>
export function selectAsync<TSource extends { [key: string]: Promise<OUT> }, OUT>(
    source: IParallelEnumerable<TSource>,
    keyOrSelector: string | ((x: TSource) => Promise<OUT>)): IParallelEnumerable<OUT> {
    let selector: (x: TSource) => Promise<OUT>
    if (typeof keyOrSelector === "string") {
        selector = (x: TSource) => (x[keyOrSelector])
    } else {
        selector = keyOrSelector
    }

    const generator = nextIterationAsync(source, selector)
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
    selector: (x: TSource) => Iterable<OUT>): IParallelEnumerable<OUT>
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
    selector: ((x: TSource) => Iterable<OUT>) | keyof TSource): IParallelEnumerable<any> {
    const generator = async () => {
        let values: TypedData<Iterable<OUT>>
        if (typeof selector === "string") {
            values = await nextIteration(source, (x: any) => x[selector])
        } else {
            values = await nextIteration(source, selector as (x: TSource) => Iterable<OUT>)
        }

        const valuesArray = []
        switch (values.type) {
            case ParallelGeneratorType.PromiseToArray:
            {
                for (const outer of await values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.ArrayOfPromises:
            {
                for (const outer of values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.PromiseOfPromises:
            {
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
export function selectManyAsync<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<Iterable<OUT>>): IParallelEnumerable<OUT> {
    const generator = async () => {
        const values = await nextIterationAsync(source, selector)

        const valuesArray = []
        switch (values.type) {
            case ParallelGeneratorType.PromiseToArray:
            {
                for (const outer of await values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.ArrayOfPromises:
            {
                for (const outer of values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.PromiseOfPromises:
            {
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
 * Applies a type filter to a source iteration
 * @param source Async Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
export function ofType<TSource, TType extends OfType>(
    source: IAsyncParallel<TSource>,
    type: TType): IParallelEnumerable<InferType<TType>> {

    const typeCheck = typeof type === "string" ?
        ((x: TSource) => typeof x === type) as (x: TSource) => x is InferType<TType> :
        ((x: TSource) => x instanceof (type as any)) as (x: TSource) => x is InferType<TType>

    const data = async () =>
        (await source.toArray()).filter(typeCheck)

    return new BasicParallelEnumerable({
        generator: data,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function orderBy<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
    return OrderedParallelEnumerable.generate(source, keySelector, true, comparer)
}

export function orderByAsync<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
    return OrderedParallelEnumerable.generateAsync(source, keySelector, true, comparer)
}

export function orderByDescending<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
    return OrderedParallelEnumerable.generate(source, keySelector, false, comparer)
}

export function orderByDescendingAsync<TSource, TKey>(
    source: IAsyncParallel<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedParallelEnumerable<TSource> {
    return OrderedParallelEnumerable.generateAsync(source, keySelector, false, comparer)
}

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
// tslint:disable-next-line:no-shadowed-variable
export function range(start: number, count: number): IParallelEnumerable<number> {
    if (start < 0) {
        throw new ArgumentOutOfRangeException(`start`)
    }

    function generator() {
        const items = []
        const maxI = start + count
        for (let i = start; i < maxI; i++) {
            items.push(Promise.resolve(i))
        }
        return items
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.ArrayOfPromises,
    })
}

/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IParallelEnumerable<T> that contains a repeated value.
 */
export function repeat<TResult>(
    // tslint:disable-next-line:no-shadowed-variable
    element: TResult, count: number, delay?: number): IParallelEnumerable<TResult> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }
    if (delay) {
        return ParallelEnumerablePrivate.repeat_2(element, count, delay)
    } else {
        return ParallelEnumerablePrivate.repeat_1(element, count)
    }
}

export function reverse<TSource>(
    source: IParallelEnumerable<TSource>): IParallelEnumerable<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.ArrayOfPromises: {
            const generator = () => {
                return dataFunc.generator().reverse()
            }
            return new BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            })
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const generator: () => Promise<Array<Promise<TSource>>> = async () => {
                const array = await dataFunc.generator()
                return array.reverse()
            }

            return new BasicParallelEnumerable<TSource>({
                generator,
                type: dataFunc.type,
            })
        }
        case ParallelGeneratorType.PromiseToArray: {
            const generator = async () => {
                const array = await dataFunc.generator()
                return array.reverse()
            }
            return new BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            })
        }
    }
}

export { sequenceEquals } from "./_private/sequenceEquals"
export { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync"
export { single } from "./_private/single"
export { singleAsync } from "./_private/singleAsync"
export { singleOrDefault } from "./_private/singleOrDefault"
export { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync"

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An IParallelEnumerable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IParallelEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
export function skip<TSource>(
    source: IParallelEnumerable<TSource>,
    count: number): IParallelEnumerable<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const generator = async () => (await dataFunc.generator()).slice(count)
            return new BasicParallelEnumerable({
                generator,
                type: ParallelGeneratorType.PromiseToArray,
            })
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const generator = () => dataFunc.generator().slice(count)
            return new BasicParallelEnumerable({
                generator,
                type: ParallelGeneratorType.ArrayOfPromises,
            })
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const generator = async () => {
                const dataInner = await dataFunc.generator()
                return dataInner.slice(count)
            }
            const dataFuncNew: TypedData<TSource> = {
                generator,
                type: ParallelGeneratorType.PromiseOfPromises,
            }

            return new BasicParallelEnumerable<TSource>(dataFuncNew)
        }
    }
}

/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains the elements from the input sequence starting at the first element
 * in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
    const generator = async () => {
        const values = await source.toArray()
        let i = 0
        for (; i < values.length; i++) {
            const value = values[i]
            if (predicate(value, i) === false) {
                break
            }
        }

        const returnedValues = []
        for (; i < values.length; i++) {
            returnedValues.push(values[i])
        }
        return returnedValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains the elements from the input sequence starting
 * at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhileAsync<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
    const generator = async () => {
        const values = await source.toArray()
        let i = 0
        for (; i < values.length; i++) {
            const value = values[i]
            if (await predicate(value, i) === false) {
                break
            }
        }

        const returnedValues = []
        for (; i < values.length; i++) {
            returnedValues.push(values[i])
        }
        return returnedValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export { sum } from "./_private/sum"
export { sumAsync } from "./_private/sumAsync"

export function take<TSource>(
    source: IParallelEnumerable<TSource>,
    amount: number): IParallelEnumerable<TSource> {
    const amountLeft = amount > 0 ? amount : 0
    const dataFunc = source.dataFunc

    switch (dataFunc.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            const generator1 = () => dataFunc.generator().splice(0, amountLeft)
            return new BasicParallelEnumerable<TSource>({
                generator: generator1,
                type: ParallelGeneratorType.ArrayOfPromises,
            })
        case ParallelGeneratorType.PromiseOfPromises:
            const generator2 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft))
            return new BasicParallelEnumerable<TSource>({
                generator: generator2,
                type: ParallelGeneratorType.PromiseOfPromises,
            })
        case ParallelGeneratorType.PromiseToArray:
        default:
            const generator3 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft))
            return new BasicParallelEnumerable<TSource>({
                generator: generator3,
                type: ParallelGeneratorType.PromiseToArray,
            })
    }
}

export function takeWhile<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> {
    const generator = async () => {
        const values = await source.toArray()
        const results = new Array<TSource>()
        if (predicate.length === 1) {
            for (const value of values) {
                if ((predicate as (x: TSource) => boolean)(value) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        } else {
            for (let i = 0; i < values.length; i++) {
                const value = values[i]
                if (predicate(value, i) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable<TSource>({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

/**
 * Returns elements from a sequence as long as a specified condition is true.
 * The element's index is used in the logic of the predicate function.
 * @param source The sequence to return elements from.
 * @param predicate An async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @return An IParallelEnumerable<T> that contains elements
 * from the input sequence that occur before the element at which the test no longer passes.
 */
export function takeWhileAsync<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> {
    const generator = async () => {
        const values = await source.toArray()
        const results = new Array<TSource>()
        if (predicate.length === 1) {
            const sPredicate = predicate as (x: TSource) => Promise<boolean>
            for (const value of values) {
                if (await sPredicate(value) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        } else {
            for (let i = 0; i < values.length; i++) {
                const value = values[i]
                if (await predicate(value, i) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable<TSource>({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export { toArray }
export { toMap } from "./_private/toMap"
export { toMapAsync } from "./_private/toMapAsync"
export { toObject } from "./_private/toObject"
export { toSet } from "./_private/toSet"

export function union<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
    if (comparer) {
        return ParallelEnumerablePrivate.union_2(first, second, comparer)
    } else {
        return ParallelEnumerablePrivate.union_1(first, second)
    }
}

export function unionAsync<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IParallelEnumerable<TSource> {

    const generator = async () => {
        const result: TSource[] = []
        const values = await Promise.all([ first.toArray(), second.toArray() ])

        for (const source of values) {
            for (const value of source) {
                let exists = false

                for (const resultValue of result) {
                    if (await comparer(value, resultValue) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    result.push(value)
                }
            }
        }

        return result
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function where<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource) => boolean): IParallelEnumerable<TSource>
export function where<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource>
export function where<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IParallelEnumerable<TSource> {
    const generator = async () => {
        const values = await source.toArray()
        return values.filter(predicate)
    }
    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function whereAsync<T>(
    source: IAsyncParallel<T>,
    predicate: (x: T, index: number) => Promise<boolean>) {
    const generator = async () => {
        const values = await source.toArray()
        const valuesAsync = values.map(async (x, i) => {
            const keep = await predicate(x, i)
            return {
                keep,
                x,
            }
        })
        const filteredValues = []
        for (const value of await Promise.all(valuesAsync)) {
            if (value.keep) {
                filteredValues.push(value.x)
            }
        }
        return filteredValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

export function zip<T, Y>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>): IParallelEnumerable<[T, Y]>
export function zip<T, Y, OUT>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>,
    resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT>
export function zip<T, Y, OUT>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>,
    resultSelector?: (x: T, y: Y) => OUT): IParallelEnumerable<OUT> | IParallelEnumerable<[T, Y]> {
    if (resultSelector) {
        return ParallelEnumerablePrivate.zip_2(source, second, resultSelector)
    } else {
        return ParallelEnumerablePrivate.zip_1(source, second)
    }
}

export function zipAsync<T, Y, OUT>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>,
    resultSelector: (x: T, y: Y) => Promise<OUT>): IParallelEnumerable<OUT> {
    async function generator() {
        const [left, right] = await Promise.all([source.toArray(), second.toArray()])
        const maxLength = left.length > right.length ? left.length : right.length
        const resultPromises = new Array<Promise<OUT>>(maxLength)
        for (let i = 0; i < maxLength; i++) {
            const a = left[i]
            const b = right[i]
            resultPromises[i] = resultSelector(a, b)
        }
        return Promise.all(resultPromises)
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
