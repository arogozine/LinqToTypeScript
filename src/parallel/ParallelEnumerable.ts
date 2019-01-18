import {
    ArgumentOutOfRangeException,
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
    IParallelEnumerable,
    OfType, ParallelGeneratorType, SelectorKeyType, TypedData } from "../types"
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

/**
 * Produces the set intersection of two sequences by using the specified IEqualityComparer<T> to compare values.
 * If not comparer is specified, uses the @see {StrictEqualityComparer}
 * @param first An IParallelEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncParallel<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
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

/**
 * Produces the set intersection of two sequences by using the specified IAsyncEqualityComparer<T> to compare values.
 * @param first An IParallelEnumerable<T> whose distinct elements that also appear in second will be returned.
 * @param second An IAsyncParallel<T> whose distinct elements that also appear in the first sequence will be returned.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the elements that form the set intersection of two sequences.
 */
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

/**
 * Returns the minimum value in a sequence of values.
 * @param source A sequence of values to determine the minimum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export async function min(
    source: IParallelEnumerable<number>): Promise<number>
/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
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

/**
 * Invokes an async transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
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

/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
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

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IParallelEnumerable<number> that contains a range of sequential integral numbers.
 */
export function range(start: number, count: number): IParallelEnumerable<number> {
    if (start < 0 || (start + count - 1) > Number.MAX_SAFE_INTEGER) {
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

/**
 * Inverts the order of the elements in a sequence.
 * @param source A sequence of values to reverse.
 * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
 */
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
        case ParallelGeneratorType.PromiseToArray: {
            const generator = async () => (await dataFunc.generator()).slice(count)
            return new BasicParallelEnumerable({
                generator,
                type: ParallelGeneratorType.PromiseToArray,
            })
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const generator = () => dataFunc.generator().slice(count)
            return new BasicParallelEnumerable({
                generator,
                type: ParallelGeneratorType.ArrayOfPromises,
            })
        }
        case ParallelGeneratorType.PromiseOfPromises: {
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

/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 * @returns An IParallelEnumerable<T> that contains the specified number of elements
 * from the start of the input sequence.
 */
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

/**
 * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
 * @param first An IAsyncParallel<T> whose distinct elements form the first set for the union.
 * @param second An IAsyncParallel<T> whose distinct elements form the second set for the union.
 * @param comparer The IEqualityComparer<T> to compare values. Optional.
 * @returns An IParallelEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
export function union<TSource>(
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> {
    if (comparer) {
        return ParallelEnumerablePrivate.union_2(first, second, comparer)
    } else {
        return ParallelEnumerablePrivate.union_1(first, second)
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

export { where } from "./_private/where"
export { whereAsync } from "./_private/whereAsync"
export { zip } from "./_private/zip"
export { zipAsync } from "./_private/zipAsync"
