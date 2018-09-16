import "core-js/modules/es7.symbol.async-iterator"

import { IParallelEnumerable, ParallelEnumerable } from "../parallel/parallel"
import { ParallelGeneratorType } from "../parallel/ParallelGeneratorType"
import {
    ArgumentOutOfRangeException,
    AsTuple,
    EqualityComparer,
    ErrorString,
    IAsyncEqualityComparer,
    IComparer,
    IEqualityComparer,
    IGrouping,
    InferType,
    InvalidOperationException,
    ITuple,
    OfType,
    StrictEqualityComparer,
} from "./../shared/shared"
import { Grouping } from "./../sync/Grouping"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"
import { IAsyncEnumerable } from "./IAsyncEnumerable"
import { IOrderedAsyncEnumerable } from "./IOrderedAsyncEnumerable"
import { OrderedAsyncEnumerable } from "./OrderedAsyncEnumerable"

// tslint:disable:no-shadowed-variable

/**
 * Provides static methods that work with IAsyncEnumerable<T> and AsyncIterable<T>
 */

export function aggregate<TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): Promise<TSource>
export function aggregate<TSource, TAccumulate>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
export function aggregate<TSource, TAccumulate, TResult>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): Promise<TResult>
export function aggregate<TSource, TAccumulate, TResult>(
    source: AsyncIterable<TSource>,
    seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
    func?: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector?: (x: TAccumulate) => TResult): Promise<TSource | TAccumulate | TResult | null> {
    if (resultSelector) {
        if (!func) {
            throw new ReferenceError(`TAccumulate function is undefined`)
        }

        return aggregate_3(source, seedOrFunc as TAccumulate, func, resultSelector)
    } else if (func) {
        return aggregate_2(source, seedOrFunc as TAccumulate, func)
    } else {
        return aggregate_1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
    }
}

async function aggregate_1<TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): Promise<TSource> {
    let aggregateValue: TSource | undefined

    for await (const value of source) {
        if (aggregateValue) {
            aggregateValue = func(aggregateValue, value)
        } else {
            aggregateValue = value
        }
    }

    if (aggregateValue === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return aggregateValue
}

async function aggregate_2<TSource, TAccumulate>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate> {
    let aggregateValue = seed

    for await (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return aggregateValue
}

async function aggregate_3<TSource, TAccumulate, TResult>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): Promise<TResult> {
    let aggregateValue = seed

    for await (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return resultSelector(aggregateValue)
}

export async function all<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): Promise<boolean> {
    for await (const item of source) {
        if (predicate(item) === false) {
            return false
        }
    }

    return true
}

export async function allAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for await (const item of source) {
        if (await predicate(item) === false) {
            return false
        }
    }

    return true
}

export function any<TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<boolean> {
    if (predicate) {
        return any_2(source, predicate)
    } else {
        return any_1(source)
    }
}

async function any_1<TSource>(source: AsyncIterable<TSource>): Promise<boolean> {
    for await (const _ of source) {
        return true
    }

    return false
}

async function any_2<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): Promise<boolean> {
    for await (const item of source) {
        if (predicate(item) === true) {
            return true
        }
    }

    return false
}

export async function anyAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for await (const item of source) {
        if (await predicate(item) === true) {
            return true
        }
    }

    return false
}

export function average(
    source: AsyncIterable<number>): Promise<number>
export function average<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function average<TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return average_2(source as AsyncIterable<TSource>, selector)
    } else {
        return average_1(source as AsyncIterable<number>)
    }
}

async function average_1(source: AsyncIterable<number>): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for await (const item of source) {
        value = (value || 0) + item
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}

async function average_2<TSource>(
    source: AsyncIterable<TSource>, func: (x: TSource) => number): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for await (const item of source) {
        value = (value || 0) + func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}

export function asParallel<TSource>(source: AsyncIterable<TSource>): IParallelEnumerable<TSource> {
    async function generator() {
        const data = []
        for await(const value of source) {
            data.push(value)
        }
        return data
    }

    return ParallelEnumerable.from(ParallelGeneratorType.PromiseToArray, generator)
}

export async function averageAsync<TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource) => Promise<number>): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for await (const item of source) {
        value = (value || 0) + await func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}

export function concat<TSource>(
    first: AsyncIterable<TSource>, second: AsyncIterable<TSource>): IAsyncEnumerable<TSource> {
    async function* iterator() {
        yield* first
        yield* second
    }

    return new BasicAsyncEnumerable(iterator)
}

export async function contains<TSource>(
    source: AsyncIterable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {

    for await (const item of source) {
        if (comparer(value, item)) {
            return true
        }
    }

    return false
}

export async function containsAsync<TSource>(
    source: AsyncIterable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

    for await (const item of source) {
        if (await comparer(value, item)) {
            return true
        }
    }

    return false
}

export function count<TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<number> {
    if (predicate) {
        return count_2(source, predicate)
    } else {
        return count_1(source)
    }
}

async function count_1<T>(source: AsyncIterable<T>): Promise<number> {
    let count = 0

    for await (const _ of source) {
        count++
    }

    return count
}

async function count_2<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<number> {
    let count = 0
    for await (const value of source) {
        if (predicate(value) === true) {
            count++
        }
    }
    return count
}

export async function countAsync<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): Promise<number> {
    let count = 0
    for await (const value of source) {
        if (await predicate(value) === true) {
            count++
        }
    }
    return count
}

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

/**
 * @throws {ArgumentOutOfRangeException}
 */
export async function elementAt<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource> {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    let i = 0
    for await (const item of source) {
        if (index === i++) {
            return item
        }
    }

    throw new ArgumentOutOfRangeException("index")
}

export async function elementAtOrDefault<TSource>(
    source: AsyncIterable<TSource>, index: number): Promise<TSource | null> {
    let i = 0
    for await (const item of source) {
        if (index === i++) {
            return item
        }
    }

    return null
}

export function empty<TSource>(): IAsyncEnumerable<TSource> {
    async function *iterable() {
        for await (const _ of []) {
            yield _
        }
    }

    return new BasicAsyncEnumerable<TSource>(iterable)
}

export function enumerateObject<TInput>(
    source: TInput): IAsyncEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>> {
    async function *iterable() {
        /* tslint:disable */
        for (const key in source) {
            yield {
                first: key,
                second: source[key]
            }
        }
        /* tslint:enable */
    }

    return new BasicAsyncEnumerable(iterable)
}

// tslint:disable:no-shadowed-variable

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

/**
 * @throws {InvalidOperationException} There are no elements
 */
export function first<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return first_2(source, predicate)
    } else {
        return first_1(source)
    }
}

async function first_1<T>(source: AsyncIterable<T>): Promise<T> {
    const first = await source[Symbol.asyncIterator]().next()

    if (first.done === true) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return first.value
}

async function first_2<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T> {
    for await (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}

/**
 * @throws {InvalidOperationException} There are no elements matching predicate
 */
export async function firstAsync<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): Promise<T> {
    for await (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}

export function firstOrDefault<T>(source: AsyncIterable<T>, predicate?: (x: T) => boolean): Promise<T | null> {
    if (predicate) {
        return firstOrDefault_2(source, predicate)
    } else {
        return firstOrDefault_1(source)
    }
}

async function firstOrDefault_1<T>(source: AsyncIterable<T>): Promise<T | null> {
    const first = await source[Symbol.asyncIterator]().next()
    return first.value || null
}

async function firstOrDefault_2<T>(
    source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T | null> {
    for await (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}

export async function firstOrDefaultAsync<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): Promise<T | null> {
    for await (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}

export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>): IAsyncEnumerable<TSource>
export function flatten<TSource>(
    source: AsyncIterable<TSource | AsyncIterable<TSource>>,
    shallow: false): IAsyncEnumerable<TSource>
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
 * @throws {InvalidOperationException} No Elements in the Promises Array
 */
export function from<TSource>(promises: Array<Promise<TSource>>): IAsyncEnumerable<TSource>
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

export function fromEvent<K extends keyof HTMLElementEventMap>(
    element: Element, type: K): IAsyncEnumerable<HTMLElementEventMap[K]>
export function fromEvent(element: Element, type: string): IAsyncEnumerable<Event>
export function fromEvent(element: Element, type: string) {
    async function *eventGenerator() {
        let resolve: (e: Event) => void
        const nextPromise = () => new Promise<Event>((r) => resolve = r)
        let promise: Promise<Event> = nextPromise()

        element.addEventListener(type, (e) => {
            resolve(e)
            promise = nextPromise()
        })

        yield await promise
    }

    return new BasicAsyncEnumerable(eventGenerator)
}

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

export function groupBy<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>
export function groupBy<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>
export function groupBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        return groupBy_0_Simple(source,
            keySelector as ((x: TSource) => number) | ((x: TSource) => string))
    }
}

function groupBy_0_Simple<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
        IAsyncEnumerable<IGrouping<string | number, TSource>> {

    async function *iterator(): AsyncIterableIterator<IGrouping<string | number, TSource>> {
        const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
        for await (const value of source) {

            const key = keySelector(value)
            const grouping: Grouping<string | number, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<string | number, TSource>(key, value)
            }
        }

        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function groupBy_0<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for await (const value of source) {
            const key = keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (comparer(group.key, key)) {
                    group.push(value)
                    found = true
                    break
                }
            }

            if (found === false) {
                keyMap.push(new Grouping<TKey, TSource>(key, value))
            }

        }

        for (const g of keyMap) {
            yield g
        }
    }

    return new BasicAsyncEnumerable(generate)
}

//#region GroupByAsync

export function groupByAsync<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>
export function groupByAsync<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>
export function groupByAsync<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupByAsync<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer?: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return groupByAsync_0<TSource, TKey>(source, keySelector, comparer)
    } else {
        return groupByAsync_0_Simple(source,
            keySelector as (x: TSource) => Promise<any>)
    }
}

function groupByAsync_0_Simple<TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<any>): IAsyncEnumerable<IGrouping<any, TSource>> {

    async function *iterator(): AsyncIterableIterator<IGrouping<string, TSource>> {
        const keyMap: {[key: string]: Grouping<any, TSource>} = {}
        for await (const value of source) {

            const key = await keySelector(value)
            const grouping: Grouping<any, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<any, TSource>(key, value)
            }
        }

        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function groupByAsync_0<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for await (const value of source) {
            const key = await keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (await comparer(group.key, key) === true) {
                    group.push(value)
                    found = true
                    break
                }
            }

            if (found === false) {
                keyMap.push(new Grouping<TKey, TSource>(key, value))
            }

        }

        for (const keyValue of keyMap) {
            yield keyValue
        }
    }

    return new BasicAsyncEnumerable(generate)
}

//#endregion

export function groupByWithSel<TSource, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>
export function groupByWithSel<TSource, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>
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
        return groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}

function groupBy_1_Simple<TSource, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => string | number,
    elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string | number, TElement>> {

    async function *generate(): AsyncIterableIterator<IGrouping<string | number, TElement>> {
        const keyMap: { [key: string]: Grouping<string | number, TElement> } = {}
        for await (const value of source) {

            const key = keySelector(value)
            const grouping: Grouping<string | number, TElement> = keyMap[key]
            const element = elementSelector(value)

            if (grouping) {
                grouping.push(element)
            } else {
                keyMap[key] = new Grouping<string | number, TElement>(key, element)
            }
        }

        /* tslint:disable:forin */
        for (const value in keyMap) {
            yield keyMap[value]
        }
        /* tslint:enable */
    }

    return new BasicAsyncEnumerable(generate)
}

function groupBy_1<TSource, TKey, TElement>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>> {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TElement>> {
        const keyMap = new Array<Grouping<TKey, TElement>>()
        for await (const value of source) {
            const key = keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (comparer(group.key, key)) {
                    group.push(elementSelector(value))
                    found = true
                    break
                }
            }

            if (found === false) {
                const element = elementSelector(value)
                keyMap.push(new Grouping<TKey, TElement>(key, element))
            }

        }

        for (const value of keyMap) {
            yield value
        }
    }

    return new BasicAsyncEnumerable(generate)
}

export function join<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult): IAsyncEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>
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

export function select<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult>
export function select<TSource, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function select<T, Y>(
    source: IAsyncEnumerable<T> | AsyncIterable<T>, selector: (x: T) => Y | string): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return select_2(source, selector)
    } else {
        return select_1(source, selector)
    }
}

function select_1<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => TResult): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for await (const value of source) {
            yield selector(value)
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function select_2<TSource, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]> {
    async function* iterator() {
        for await (const value of source) {
            yield value[key]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function selectAsync<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
export function selectAsync<TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return selectAsync_2(source, selector)
    } else {
        return selectAsync_1(source, selector as (x: TSource) => Promise<TResult>)
    }
}

function selectAsync_1<TSource, TResult>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for await (const value of source) {
            yield selector(value)
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function selectAsync_2<
    TSource extends { [ key: string]: Promise<TResult> },
    TKey extends keyof TSource, TResult>(
    source: AsyncIterable<TSource>, key: TKey): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for await (const value of source) {
            yield value[key]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function selectMany
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
    source: AsyncIterable<TSource>,
    selector: keyof TSource): IAsyncEnumerable<Y>
export function selectMany<TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y>
export function selectMany(
    source: AsyncIterable<any>,
    selector: any): IAsyncEnumerable<any> {
    if (typeof selector === "string") {
        return selectMany_2(source, selector)
    } else {
        return selectMany_1(source, selector)
    }
}

function selectMany_1<TSource, Y>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Iterable<Y>): IAsyncEnumerable<Y> {
    async function* iterator() {
        for await (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function selectMany_2
    <TSource extends { [key: string]: Iterable<Y> }, Y>(
    source: AsyncIterable<TSource>,
    selector: keyof TSource): IAsyncEnumerable<Y> {
    async function* iterator() {
        for await (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

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

/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
export function single<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return single_2(source, predicate)
    } else {
        return single_1(source)
    }
}

async function single_1<TSource>(source: AsyncIterable<TSource>): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (hasValue === true) {
            throw new InvalidOperationException(ErrorString.MoreThanOneElement)
        } else {
            hasValue = true
            singleValue = value
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return singleValue as TSource
}

async function single_2<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return singleValue as TSource
}

/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
export async function singleAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (await predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return singleValue as TSource
}

export function singleOrDefault<TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource | null> {

    if (predicate) {
        return singleOrDefault_2(source, predicate)
    } else {
        return singleOrDefault_1(source)
    }
}

async function singleOrDefault_1<TSource>(source: AsyncIterable<TSource>): Promise<TSource | null> {
    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (hasValue === true) {
            throw new InvalidOperationException(ErrorString.MoreThanOneElement)
        } else {
            hasValue = true
            singleValue = value
        }
    }

    return singleValue
}

async function singleOrDefault_2<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource | null> {

    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    return singleValue
}

export async function singleOrDefaultAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {

    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (await predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    return singleValue
}

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

export function skipWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return skipWhile_1(source, predicate as (x: TSource) => boolean)
    } else {
        return skipWhile_2(source, predicate)
    }
}

function skipWhile_1<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let skip = true
        for await (const item of source) {

            if (skip === false) {
                yield item
            } else if (predicate(item) === false) {
                skip = false
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function skipWhile_2<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let index = 0
        let skip = true
        for await (const item of source) {

            if (skip === false) {
                yield item
            } else if (predicate(item, index) === false) {
                skip = false
                yield item
            }

            index++
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function skipWhileAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return skipWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return skipWhileAsync_2(source, predicate)
    }
}

function skipWhileAsync_1<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let skip = true
        for await (const item of source) {

            if (skip === false) {
                yield item
            } else if (await predicate(item) === false) {
                skip = false
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function skipWhileAsync_2<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let index = 0
        let skip = true
        for await (const item of source) {

            if (skip === false) {
                yield item
            } else if (await predicate(item, index) === false) {
                skip = false
                yield item
            }

            index++
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

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

export function orderBy<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generate(source, keySelector, true, comparer)
}

export function orderByAsync<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generateAsync(source, keySelector, true, comparer)
}

export function orderByDescending<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generate(source, keySelector, false, comparer)
}

export function orderByDescendingAsync<TSource, TKey>(
    source: IAsyncEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedAsyncEnumerable.generateAsync(source, keySelector, false, comparer)
}

/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export async function last<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return last_2(source, predicate)
    } else {
        return last_1(source)
    }
}

async function last_1<T>(source: AsyncIterable<T>): Promise<T> {
    let last: T | null = null

    for await (const value of source) {
        last = value
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return last
}

async function last_2<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource> {
    let last: TSource | null = null

    for await (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return last
}

/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export async function lastAsync<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let last: TSource | null = null

    for await (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return last
}

export async function lastOrDefault<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null> {

    if (predicate) {
        return lastOrDefault_2(source, predicate)
    } else {
        return lastOrDefault_1(source)
    }
}

async function lastOrDefault_1<T>(source: AsyncIterable<T>): Promise<T | null> {
    let last: T | null = null

    for await (const value of source) {
        last = value
    }

    return last
}

async function lastOrDefault_2<T>(
    source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T | null> {

    let last: T | null = null

    for await (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    return last
}

export async function lastOrDefaultAsync<T>(
    source: AsyncIterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null> {

    let last: T | null = null

    for await (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    return last
}

/**
 * @throws {InvalidOperationException} No Elements
 * @param source Async Iteration of Numbers
 */
export function max(source: AsyncIterable<number>): Promise<number>
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function max<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function max<TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return max_2<TSource>(source as AsyncIterable<TSource>, selector)
    } else {
        return max_1(source as AsyncIterable<number>)
    }
}

async function max_1(source: AsyncIterable<number>): Promise<number> {
    let max: number | null = null
    for await (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, item)
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

async function max_2<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number> {
    let max: number | null = null
    for await (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export async function maxAsync<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let max: number | null = null
    for await (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, await selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

export function min(source: AsyncIterable<number>): Promise<number>
export function min<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function min(source: AsyncIterable<number>, selector?: (x: number) => number): Promise<number> {
    if (selector) {
        return min_2(source, selector)
    } else {
        return min_1(source)
    }
}

async function min_1(source: AsyncIterable<number>): Promise<number> {
    let min: number | null = null
    for await (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, item)
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

async function min_2(source: AsyncIterable<number>, selector: (x: number) => number): Promise<number> {
    let min: number | null = null
    for await (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, selector(item))
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export async function minAsync<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    let min: number | null = null
    for await (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, await selector(item))
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export function range(start: number, count: number): IAsyncEnumerable<number> {
    if (start < 0) {
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

export function repeat<T>(
    element: T, count: number, delay?: number): IAsyncEnumerable<T> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }
    if (delay) {
        return repeat_2(element, count, delay)
    } else {
        return repeat_1(element, count)
    }
}

function repeat_1<T>(element: T, count: number): IAsyncEnumerable<T> {
    async function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function repeat_2<T>(element: T, count: number, delay: number): IAsyncEnumerable<T> {
    async function* iterator() {
        for (let i = 0; i < count; i++) {
            yield await new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

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

export async function sequenceEquals<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {

    const firstIterator = first[Symbol.asyncIterator]()
    const secondIterator = second[Symbol.asyncIterator]()

    let results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
    let firstResult = results[0]
    let secondResult = results[1]

    while (!firstResult.done && !secondResult.done) {
        if (!comparer(firstResult.value, secondResult.value)) {
            return false
        }

        results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
        firstResult = results[0]
        secondResult = results[1]
    }

    return firstResult.done && secondResult.done
}

export async function sequenceEqualsAsync<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

    const firstIterator = first[Symbol.asyncIterator]()
    const secondIterator = second[Symbol.asyncIterator]()

    let results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
    let firstResult = results[0]
    let secondResult = results[1]

    while (!firstResult.done && !secondResult.done) {
        if (await comparer(firstResult.value, secondResult.value) === false) {
            return false
        }

        results = await Promise.all([ firstIterator.next(), secondIterator.next() ])
        firstResult = results[0]
        secondResult = results[1]
    }

    return firstResult.done && secondResult.done
}

export function sum(
    source: AsyncIterable<number>): Promise<number>
export function sum<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function sum<TSource>(
    source: AsyncIterable<number> | AsyncIterable<TSource>,
    selector?: (x: TSource) => number): Promise<number> {

    if (selector) {
        return sum_2(source as AsyncIterable<TSource>, selector)
    } else {
        return sum_1(source as AsyncIterable<number>)
    }
}

async function sum_1(
    source: AsyncIterable<number>): Promise<number> {
    let sum = 0
    for await (const value of source) {
        sum += value
    }

    return sum
}

async function sum_2<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number> {
    let sum = 0
    for await (const value of source) {
        sum += selector(value)
    }

    return sum
}

export async function sumAsync<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    let sum = 0
    for await (const value of source) {
        sum += await selector(value)
    }

    return sum
}

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

export function takeWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return takeWhile_1(source, predicate as (x: TSource) => boolean)
    } else {
        return takeWhile_2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

function takeWhile_1<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): IAsyncEnumerable<T> {
    async function* iterator() {
        for await (const item of source) {
            if (predicate(item)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

function takeWhile_2<T>(
    source: AsyncIterable<T>, predicate: (x: T, index: number) => boolean): IAsyncEnumerable<T> {
    async function* iterator() {
        let index = 0
        for await (const item of source) {
            if (predicate(item, index++)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

export function takeWhileAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return takeWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return takeWhileAsync_2(source, predicate)
    }
}

function takeWhileAsync_1<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        for await (const item of source) {
            if (await predicate(item)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

function takeWhileAsync_2<T>(
    source: AsyncIterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        let index = 0
        for await (const item of source) {
            if (await predicate(item, index++)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

export async function toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]> {
    const array = []
    for await (const item of source) {
        array.push(item)
    }
    return array
}

export async function toMap<K, V>(source: AsyncIterable<V>, selector: (x: V) => K): Promise<Map<K, V[]>> {
    const map = new Map<K, V[]>()

    for await (const value of source) {
        const key = selector(value)
        const array = map.get(key)

        if (array === undefined) {
            map.set(key, [value])
        } else {
            array.push(value)
        }
    }

    return map
}

export async function toMapAsync<K, V>(
    source: AsyncIterable<V>,
    selector: (x: V) => Promise<K>): Promise<Map<K, V[]>> {
    const map = new Map<K, V[]>()

    for await (const value of source) {
        const key = await selector(value)
        const array = map.get(key)

        if (array === undefined) {
            map.set(key, [value])
        } else {
            array.push(value)
        }
    }

    return map
}

export async function toObject<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => string): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for await (const value of source) {
        map[selector(value)] = value
    }

    return map
}

export async function toObjectAsync<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<string>): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for await (const value of source) {
        map[await selector(value)] = value
    }

    return map
}

export async function toSet<TSource>(source: AsyncIterable<TSource>): Promise<Set<TSource>> {
    const set = new Set<TSource>()
    for await (const item of source) {
        set.add(item)
    }
    return set
}

export function union<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource> {
    if (comparer) {
        return union_2(first, second, comparer)
    } else {
        return union_1(first, second)
    }
}

function union_1<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>) {

    async function* iterator() {

        const set = new Set<TSource>()

        for await (const item of first) {
            if (set.has(item) === false) {
                yield item
                set.add(item)
            }
        }

        for await (const item of second) {
            if (set.has(item) === false) {
                yield item
                set.add(item)
            }
        }
    }

    return new BasicAsyncEnumerable<TSource>(iterator)
}

function union_2<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: IEqualityComparer<TSource>) {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const result: TSource[] = []

        for (const source of [first, second]) {
            for await (const value of source) {
                let exists = false

                for (const resultValue of result) {
                    if (comparer(value, resultValue) === true) {
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

export function where<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): IAsyncEnumerable<TSource>
export function where<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>
export function where<TSource>(
    source: AsyncIterable<TSource>,
    predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IAsyncEnumerable<TSource> {
    if (predicate.length === 1) {
        return where_1(source, predicate as (x: TSource) => boolean)
    } else {
        return where_2(source, predicate as (x: TSource, index: number) => boolean)
    }
}

function where_1<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): IAsyncEnumerable<T> {
    async function* iterator() {
        for await (const item of source) {
            if (predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

function where_2<T>(
    source: AsyncIterable<T>, predicate: (x: T, index: number) => boolean): IAsyncEnumerable<T> {
    async function* iterator() {
        let i = 0
        for await (const item of source) {
            if (predicate(item, i++) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

export function whereAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource>
export function whereAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource>
export function whereAsync<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {
    if (predicate.length === 1) {
        return whereAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return whereAsync_2(source, predicate)
    }
}

function whereAsync_1<T>(
    source: AsyncIterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        for await (const item of source) {
            if (await predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

function whereAsync_2<T>(
    source: AsyncIterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        let i = 0
        for await (const item of source) {
            if (await predicate(item, i++) === true) {
                yield item
            }
        }
    }

    return new BasicAsyncEnumerable<T>(iterator)
}

export function zip<T, Y>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>): IAsyncEnumerable<ITuple<T, Y>>
export function zip<T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT>
export function zip<T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
    resultSelector?: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT> | IAsyncEnumerable<ITuple<T, Y>> {
    if (resultSelector) {
        return zip_2(source, second, resultSelector)
    } else {
        return zip_1(source, second)
    }
}

function zip_1<T, Y>(
    source: AsyncIterable<T>, second: AsyncIterable<Y>): IAsyncEnumerable<ITuple<T, Y>> {
    async function* iterator() {
        const firstIterator = source[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const result = await Promise.all([firstIterator.next(), secondIterator.next()])
            const a = result[0]
            const b = result[1]

            if (a.done && b.done) {
                break
            } else {
                yield AsTuple(a.value, b.value)
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function zip_2<T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IAsyncEnumerable<OUT> {
    async function* iterator() {
        const firstIterator = source[Symbol.asyncIterator]()
        const secondIterator = second[Symbol.asyncIterator]()

        while (true) {
            const result = await Promise.all([firstIterator.next(), secondIterator.next()])
            const a = result[0]
            const b = result[1]

            if (a.done && b.done) {
                break
            } else {
                yield resultSelector(a.value, b.value)
            }
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

export function zipAsync<T, Y, OUT>(
    source: AsyncIterable<T>,
    second: AsyncIterable<Y>,
    resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT> {
    async function *generator() {
        const firstIterator = source[Symbol.asyncIterator]()
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
