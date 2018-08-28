import { IOrderedAsyncEnumerable } from "../async/IOrderedAsyncEnumerable"
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
} from "../shared/shared"
import { AsyncEnumerable } from "./../async/AsyncEnumerable"
import {
    IAsyncEnumerable,
} from "./../async/IAsyncEnumerable"
import { BasicEnumerable } from "./BasicEnumerable"
import { Grouping } from "./Grouping"
import { IEnumerable } from "./IEnumerable"
import { IOrderedEnumerable } from "./IOrderedEnumerable"
import { OrderedEnumerable } from "./OrderedEnumerable"

// tslint:disable:no-shadowed-variable

// Enumerable class based on,
// https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx

export function aggregate<TSource>(
    source: Iterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): TSource
export function aggregate<TSource, TAccumulate>(
    source: Iterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate
export function aggregate<TSource, TAccumulate, TResult>(
    source: Iterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): TResult
export function aggregate<TSource, TAccumulate, TResult>(
    source: Iterable<TSource>,
    seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
    func?: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector?: (x: TAccumulate) => TResult): TSource | TAccumulate | TResult | null {
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

/**
 * @throws {InvalidOperationException} No Elements
 */
function aggregate_1<TSource>(
    source: Iterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): TSource | null {
    let aggregateValue: TSource | undefined

    for (const value of source) {
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

function aggregate_2<TSource, TAccumulate>(
    source: Iterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate {
    let aggregateValue = seed

    for (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return aggregateValue
}

function aggregate_3<TSource, TAccumulate, TResult>(
    source: Iterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): TResult {
    let aggregateValue = seed

    for (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return resultSelector(aggregateValue)
}

export function all<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean {
    for (const item of source) {
        if (predicate(item) === false) {
            return false
        }
    }

    return true
}

export async function allAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for (const item of source) {
        if (await predicate(item) === false) {
            return false
        }
    }

    return true
}

export function any<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): boolean {
    if (predicate) {
        return any_2(source, predicate)
    } else {
        return any_1(source)
    }
}

function any_1<TSource>(source: Iterable<TSource>): boolean {
    for (const _ of source) {
        return true
    }

    return false
}

function any_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): boolean {
    for (const item of source) {
        if (predicate(item) === true) {
            return true
        }
    }

    return false
}

export async function anyAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    for (const item of source) {
        if (await predicate(item) === true) {
            return true
        }
    }

    return false
}

/**
 * Converts the iterable to an @see {IAsyncEnumerable}
 */
export function asAsync<TSource>(source: Iterable<TSource>): IAsyncEnumerable<TSource> {
    async function* generator() {
        for (const value of source) {
            yield value
        }
    }

    return AsyncEnumerable.from(generator)
}

/**
 * Converts an iterable to @see {IAsyncParallel}
 */
export function asParallel<TSource>(source: Iterable<TSource>): IParallelEnumerable<TSource> {
    async function generator() {
        const array = []
        for (const value of source) {
            array.push(value)
        }
        return array
    }

    return ParallelEnumerable.from(ParallelGeneratorType.PromiseToArray, generator)
}

/**
 * @throws {InvalidOperationException}
 * @param source Iteration of Numbers
 */
export function average(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException}
 */
export function average<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function average<TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number {
    if (selector) {
        return average_2(source as Iterable<TSource>, selector)
    } else {
        return average_1(source as Iterable<number>)
    }
}

function average_1(source: Iterable<number>): number {
    let value: number | undefined
    let count: number | undefined
    for (const item of source) {
        value = (value || 0) + item
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}

function average_2<TSource>(source: Iterable<TSource>, func: (x: TSource) => number): number {
    let value: number | undefined
    let count: number | undefined
    for (const item of source) {
        value = (value || 0) + func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}

/**
 * @throws {InvalidOperationException} No Elements
 */
export async function averageAsync<TSource>(
    source: Iterable<TSource>, func: (x: TSource) => Promise<number>): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for (const item of source) {
        value = (value || 0) + await func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}

export function concat<TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource> {
    function* iterator() {
        yield* first
        yield* second
    }

    return new BasicEnumerable(iterator)
}

export function contains<TSource>(
    source: Iterable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

    for (const item of source) {
        if (comparer(value, item)) {
            return true
        }
    }

    return false
}

export async function containsAsync<TSource>(
    source: Iterable<TSource>,
    value: TSource,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {
    for (const item of source) {
        if (await comparer(value, item)) {
            return true
        }
    }

    return false
}

export function count<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): number {
    if (predicate) {
        return count_2(source, predicate)
    } else {
        return count_1(source)
    }
}

function count_1<T>(source: Iterable<T>): number {
    let count = 0

    for (const _ of source) {
        count++
    }

    return count
}

function count_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): number {
    let count = 0
    for (const value of source) {
        if (predicate(value) === true) {
            count++
        }
    }
    return count
}

export async function countAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<number> {
    let count = 0
    for (const value of source) {
        if (await predicate(value) === true) {
            count++
        }
    }
    return count
}

export function distinct<TSource>(
    source: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> {

    function* iterator() {
        const distinctElements: TSource[] = []
        for (const item of source) {

            const foundItem = distinctElements.find((x) => comparer(x, item))

            if (!foundItem) {
                distinctElements.push(item)
                yield item
            }
        }
    }

    return new BasicEnumerable(iterator)
}

export function distinctAsync<TSource>(
    source: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        const distinctElements: TSource[] = []
        outerLoop:
        for (const item of source) {
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

    return AsyncEnumerable.from(iterator)
}

export function each<TSource>(source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource> {
    function *generator() {
        for (const value of source) {
            action(value)
            yield value
        }
    }

    return new BasicEnumerable(generator)
}

export function eachAsync<TSource>(
    source: Iterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
    async function *generator() {
        for (const value of source) {
            await action(value)
            yield value
        }
    }

    return AsyncEnumerable.from(generator)
}

/**
 * Returns Element at specified position
 * @throws {ArgumentOutOfRangeException} Index outside of iteration
 * @param source Iteration of Elements
 * @param index Index for Element
 */
export function elementAt<TSource>(source: Iterable<TSource>, index: number): TSource {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    throw new ArgumentOutOfRangeException("index")
}

export function elementAtOrDefault<TSource>(source: Iterable<TSource>, index: number): TSource | null {
    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    return null
}

/**
 * Empty Enumerable
 */
export function empty<TSource>(): IEnumerable<TSource> {
    const iterator = function*() {
        for (const x of [] as TSource[]) {
            yield x
        }
    }
    return new BasicEnumerable(iterator)
}

export function enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>> {
    function *iterable() {
        // tslint:disable-next-line:forin
        for (const key in source) {
            yield {
                first: key,
                second: source[key],
            }
        }
    }

    return new BasicEnumerable(iterable)
}

export function except<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = EqualityComparer): IEnumerable<TSource> {

    function *iterator() {
        const secondArray = [...second]

        for (const firstItem of first) {

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

    return new BasicEnumerable(iterator)
}

export function exceptAsync<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator() {
        const secondArray = [...second]

        for (const firstItem of first) {

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

    return AsyncEnumerable.from(iterator)
}

/**
 * @throws {InvalidOperationException} No Elements in Iteration
 */
export function first<TSource>(source: Iterable<TSource>): TSource
/**
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
export function first<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource
export function first<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return first_2(source, predicate)
    } else {
        return first_1(source)
    }
}

function first_1<T>(source: Iterable<T>) {
    const first = source[Symbol.iterator]().next()

    if (first.done === true) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return first.value
}

function first_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): T {
    for (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}

/**
 * @throws {InvalidOperationException} No Matching Elements in Iteration
 * @param source Source Iteration
 * @param predicate Predicate to Select First Element
 */
export async function firstAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T> {
    for (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}

export function firstOrDefault<T>(source: Iterable<T>): T | null
export function firstOrDefault<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null
export function firstOrDefault<T>(source: Iterable<T>, predicate?: (x: T) => boolean): T | null {
    if (predicate) {
        return firstOrDefault_2(source, predicate)
    } else {
        return firstOrDefault_1(source)
    }
}

function firstOrDefault_1<T>(source: Iterable<T>): T | null {
    const first = source[Symbol.iterator]().next()
    return first.value || null
}

function firstOrDefault_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null {
    for (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}

export async function firstOrDefaultAsync<T>(
    source: Iterable<T>, predicate: (x: T) => Promise<boolean>): Promise<T | null> {
    for (const value of source) {
        if (await predicate(value) === true) {
            return value
        }
    }

    return null
}

export function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>): IEnumerable<TSource>
export function flatten<TSource>(
    source: Iterable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>
export function flatten<TSource>(
    source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>
export function flatten<TSource>(
    source: Iterable<TSource | Iterable<TSource>>, shallow?: boolean): IEnumerable<TSource | Iterable<TSource>> {

    // tslint:disable-next-line:no-shadowed-variable
    function* iterator(source: Iterable<any>): IterableIterator<TSource | Iterable<TSource>> {
        for (const item of source) {
            // JS string is an Iterable.
            // We exclude it from being flattened
            if (item[Symbol.iterator] !== undefined && typeof item !== "string") {
                yield* shallow ? item : iterator(item)
            } else {
                yield item
            }
        }
    }

    return new BasicEnumerable(() => iterator(source))
}

/**
 * Creates an IEnumerable from an array
 * @param source Array of Elements
 */
export function from<TSource>(source: TSource[]): IEnumerable<TSource>
/**
 * Creates an IEnumerable from an iteration of elements
 * @param source Iteration of Elements
 */
export function from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>
export function from<TSource>(source: TSource[] | IterableIterator<TSource>): IEnumerable<TSource> {
    if (Array.isArray(source)) {
        function *iterator() {
            for (const value of source) {
                yield value
            }
        }
        return new BasicEnumerable(iterator)
    } else {
        return new BasicEnumerable(() => source)
    }
}

export function groupBy<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>
export function groupBy<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>
export function groupBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>
export function groupBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<any, TSource>> {

    if (comparer) {
        return groupBy_0<TSource, TKey>(source,
            keySelector as (x: TSource) => TKey, comparer)
    } else {
        return groupBy_0_Simple(source,
            keySelector as ((x: TSource) => number) | ((x: TSource) => string))
    }
}

function groupBy_0_Simple<TSource>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
        IEnumerable<IGrouping<string | number, TSource>> {

    function *iterator(): IterableIterator<IGrouping<string | number, TSource>> {
        const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
        for (const value of source) {

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

    return new BasicEnumerable(iterator)
}

function groupBy_0<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>> {

    function *generate(): IterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for (const value of source) {
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

        for (const keyValue of keyMap) {
            yield keyValue
        }
    }

    return new BasicEnumerable(generate)
}

export function groupByWithSel<TSource, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>
export function groupByWithSel<TSource, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey),
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>
export function groupByWithSel<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => number) | ((x: TSource) => string),
    elementSelector: (x: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>): IEnumerable<IGrouping<any, TElement>> {

    if (comparer) {
        return groupBy_1(source,
            keySelector as (x: TSource) => TKey, elementSelector, comparer)
    } else {
        return groupBy_1_Simple(source,
            keySelector as (x: TSource) => number | string, elementSelector)
    }
}

function groupBy_1_Simple<TSource, TElement>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string | number,
    elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string | number, TElement>> {

    function *generate(): IterableIterator<IGrouping<string | number, TElement>> {
        const keyMap: { [key: string]: Grouping<string | number, TElement> } = {}
        for (const value of source) {

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

    return new BasicEnumerable(generate)
}

function groupBy_1<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>> {

    function *generate(): IterableIterator<IGrouping<TKey, TElement>> {
        const keyMap = new Array<Grouping<TKey, TElement>>()
        for (const value of source) {
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

        for (const keyValue of keyMap) {
            yield keyValue
        }
    }

    return new BasicEnumerable(generate)
}

//#region GroupByAsync

export function groupByAsync<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<number> | number): IAsyncEnumerable<IGrouping<number, TSource>>
export function groupByAsync<TSource>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<string> | string): IAsyncEnumerable<IGrouping<string, TSource>>
export function groupByAsync<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>
export function groupByAsync<TSource, TKey>(
    source: Iterable<TSource>,
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
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<any>): IAsyncEnumerable<IGrouping<any, TSource>> {

    async function *iterator(): AsyncIterableIterator<IGrouping<string, TSource>> {
        const keyMap: {[key: string]: Grouping<any, TSource>} = {}
        for (const value of source) {

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

    return AsyncEnumerable.from(iterator)
}

function groupByAsync_0<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => Promise<TKey> | TKey,
    comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>> {

    async function *generate(): AsyncIterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for (const value of source) {
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

    return AsyncEnumerable.from(generate)
}

//#endregion

export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string,
    resultSelector: (x: string, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string,
    resultSelector: (x: string, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<string>): IEnumerable<TResult>

export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: number, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<number>): IEnumerable<TResult>

export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>
export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => number,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<TKey>): IEnumerable<TResult>

export function groupByWithResult<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
    resultSelector: (x: string | number | TKey, values: IEnumerable<TSource>) => TResult,
    comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {

    if (comparer) {
        return groupBy_2<TSource, TKey, TResult>(source,
            keySelector as (x: TSource) => TKey,
            resultSelector,
            comparer)
    } else {
        return groupBy_2_Simple(source,
            keySelector as ((x: TSource) => string) | ((x: TSource) => number),
            resultSelector)
    }
}

function groupBy_2_Simple<TSource, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string) | ((x: TSource) => number),
    resultSelector: (x: string | number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_0_Simple(source, keySelector)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}

function groupBy_2<TSource, TKey, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_0(source, keySelector, comparer)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}

export function GroupByWithResultAndSelector<TSource, TKey, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement,
    resultSelector: ((key: TKey, values: IEnumerable<TElement>) => TResult) |
        ((key: string | number, values: IEnumerable<TElement>) => TResult),
    comparer?: IEqualityComparer<TKey>): IEnumerable<TResult> {
    if (comparer) {
        return groupBy_3(source,
            keySelector as (x: TSource) => TKey,
            elementSelector,
            resultSelector as (key: TKey, values: IEnumerable<TElement>) => TResult)
    } else {
        return groupBy_3_Simple(source,
            keySelector as ((x: TSource) => string) | ((x: TSource) => number),
            elementSelector,
            resultSelector as (key: string | number, values: IEnumerable<TElement>) => TResult)
    }
}

function groupBy_3<TSource, TKey, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    resultSelector: (key: TKey, values: IEnumerable<TElement>) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_1(source, keySelector, elementSelector, comparer)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}

function groupBy_3_Simple<TSource, TElement, TResult>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string) | ((x: TSource) => number),
    elementSelector: (x: TSource) => TElement,
    resultSelector: (key: string | number, values: IEnumerable<TElement>) => TResult): IEnumerable<TResult> {

    function *iterator(): IterableIterator<TResult> {
        const groupByResult = groupBy_1_Simple(source, keySelector, elementSelector)

        for (const group of groupByResult) {
            yield resultSelector(group.key, group)
        }
    }

    return new BasicEnumerable(iterator)
}

export function join<TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult): IEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey>): IEnumerable<TResult>
export function join<TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> {
    function *iterator(): IterableIterator<TResult> {
        const innerArray = [...inner]
        for (const o of outer) {
            const outerKey = outerKeySelector(o)

            for (const i of innerArray) {
                const innerKey = innerKeySelector(i)
                if (comparer(outerKey, innerKey) === true) {
                    yield resultSelector(o, i)
                }
            }
        }
    }

    return new BasicEnumerable(iterator)
}

export function intersect<TSource>(
    first: IEnumerable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): IEnumerable<TSource> {

    function *iterator(): IterableIterator<TSource> {

        const firstResults = [...first.distinct(comparer)]

        if (firstResults.length === 0) {
            return
        }

        const secondResults = [...second]

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

    return new BasicEnumerable(iterator)
}

export function intersectAsync<TSource>(
    first: IEnumerable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): IAsyncEnumerable<TSource> {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const firstResults = []
        for await (const item of first.distinctAsync(comparer)) {
            firstResults.push(item)
        }

        if (firstResults.length === 0) {
            return
        }

        const secondResults = [...second]

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

    return AsyncEnumerable.from(iterator)
}

export function partition<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource[][] {
    const fail: TSource[] = []
    const pass: TSource[] = []

    for (const value of source) {
        if (predicate(value) === true) {
            pass.push(value)
        } else {
            fail.push(value)
        }
    }

    return [fail, pass]
}

export async function partitionAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource[][]> {
    const fail: TSource[] = []
    const pass: TSource[] = []

    for (const value of source) {
        if (await predicate(value) === true) {
            pass.push(value)
        } else {
            fail.push(value)
        }
    }

    return [fail, pass]
}

export function select<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult>
export function select<TSource, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]>
export function select<TSource, TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => TResult) | TKey): IEnumerable<TSource[TKey]> | IEnumerable<TResult> {

    if (typeof selector === "string") {
        return select_2(source, selector)
    } else {
        return select_1(source, selector as (x: TSource) => TResult)
    }
}

function select_1<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => TResult): IEnumerable<TResult> {
    function* iterator() {
        for (const value of source) {
            yield selector(value)
        }
    }

    return new BasicEnumerable(iterator)
}

function select_2<TSource, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IEnumerable<TSource[TKey]> {
    function* iterator() {
        for (const value of source) {
            yield value[key]
        }
    }

    return new BasicEnumerable(iterator)
}

export function selectAsync<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult>
export function selectAsync<TSource extends { [key: string]: Promise<any> }, TKey extends keyof TSource>(
    source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TSource[TKey]>
export function selectAsync<TSource extends { [key: string]: Promise<TResult> }, TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => Promise<TResult>) | TKey): IAsyncEnumerable<any> {

    if (typeof selector === "string") {
        return selectAsync_2(source, selector)
    } else {
        return selectAsync_1(source, selector as (x: TSource) => Promise<TResult>)
    }
}

function selectAsync_1<TSource, TResult>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<TResult>): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for (const value of source) {
            yield selector(value)
        }
    }

    return AsyncEnumerable.from(iterator)
}

function selectAsync_2<
    TSource extends { [ key: string]: Promise<TResult> },
    TKey extends keyof TSource, TResult>(
    source: Iterable<TSource>, key: TKey): IAsyncEnumerable<TResult> {
    async function* iterator() {
        for (const value of source) {
            yield value[key]
        }
    }

    return AsyncEnumerable.from(iterator)
}

export function selectMany<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult>
export function selectMany<
    TSource extends { [key: string]: Iterable<TResult>}, TResult>(
        source: Iterable<TSource>,
        selector: keyof TSource): IEnumerable<TResult>
export function selectMany<TSource extends { [key: string]: Iterable<TResult>}, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource) => Iterable<TResult>) | keyof TSource) {
    if (typeof selector === "string") {
        return selectMany_2(source, selector)
    } else {
        return selectMany_1(source, selector as (x: TSource) => Iterable<TResult>)
    }
}

function selectMany_1<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult> {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue
            }
        }
    }

    return new BasicEnumerable(iterator)
}

export function selectMany_2<TSource extends { [key: string]: Iterable<TResult> }, TResult>(
    source: Iterable<TSource>, selector: keyof TSource) {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue
            }
        }
    }

    return new BasicEnumerable(iterator)
}

export function selectManyAsync<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult> {
    async function* generator() {
        for (const value of source) {
            const innerValues = await selector(value)
            for (const innerValue of innerValues) {
                yield innerValue
            }
        }
    }

    return AsyncEnumerable.from(generator)
}

/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains more than one element
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export function single<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return single_2(source, predicate)
    } else {
        return single_1(source)
    }
}

function single_1<TSource>(source: Iterable<TSource>): TSource {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
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

function single_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
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
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export async function singleAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
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

/**
 * @throws {InvalidOperationException} More than one element
 */
export function singleOrDefault<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null {

    if (predicate) {
        return singleOrDefault_2(source, predicate)
    } else {
        return singleOrDefault_1(source)
    }
}

function singleOrDefault_1<TSource>(source: Iterable<TSource>): TSource | null {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (hasValue === true) {
            throw new InvalidOperationException(ErrorString.MoreThanOneElement)
        } else {
            hasValue = true
            singleValue = value
        }
    }

    return singleValue
}

function singleOrDefault_2<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): TSource | null {

    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
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

/**
 * @throws {InvalidOperationException} More than one element matchines predicate
 */
export async function singleOrDefaultAsync<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {

    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (await predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    return singleValue
}

export function skipWhile<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {

    if (predicate.length === 1) {
        return skipWhile_1(source, predicate as (x: TSource) => boolean)
    } else {
        return skipWhile_2(source, predicate)
    }
}

function skipWhile_1<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): IEnumerable<TSource> {

    function* iterator() {
        let skip = true
        for (const item of source) {

            if (skip === false) {
                yield item
            } else if (predicate(item) === false) {
                skip = false
                yield item
            }
        }
    }

    return new BasicEnumerable(iterator)
}

function skipWhile_2<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource> {

    function* iterator() {
        let index = 0
        let skip = true
        for (const item of source) {

            if (skip === false) {
                yield item
            } else if (predicate(item, index) === false) {
                skip = false
                yield item
            }

            index++
        }
    }

    return new BasicEnumerable(iterator)
}

export function skipWhileAsync<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    if (predicate.length === 1) {
        return skipWhileAsync_1(source, predicate as (x: TSource) => Promise<boolean>)
    } else {
        return skipWhileAsync_2(source, predicate)
    }
}

function skipWhileAsync_1<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let skip = true
        for (const item of source) {

            if (skip === false) {
                yield item
            } else if (await predicate(item) === false) {
                skip = false
                yield item
            }
        }
    }

    return AsyncEnumerable.from(iterator)
}

function skipWhileAsync_2<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IAsyncEnumerable<TSource> {

    async function* iterator() {
        let index = 0
        let skip = true
        for (const item of source) {

            if (skip === false) {
                yield item
            } else if (await predicate(item, index) === false) {
                skip = false
                yield item
            }

            index++
        }
    }

    return AsyncEnumerable.from(iterator)
}

export function skip<TSource>(source: Iterable<TSource>, count: number): IEnumerable<TSource> {

    function* iterator() {
        let i = 0
        for (const item of source) {
            if (i++ >= count) {
                yield item
            }
        }
    }

    return new BasicEnumerable<TSource>(iterator)
}

/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains no matching element
 */
export function last<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return last_2(source, predicate)
    } else {
        return last_1(source)
    }
}

function last_1<TSource>(source: Iterable<TSource>): TSource {
    let last: TSource | undefined

    for (const value of source) {
        last = value
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return last
}

function last_2<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource {
    let last: TSource | undefined

    for (const value of source) {
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
 * @throws {InvalidOperationException} No Matching Element
 */
export async function lastAsync<TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    let last: TSource | undefined

    for (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    if (!last) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return last
}

export function lastOrDefault<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null {

    if (predicate) {
        return lastOrDefault_2(source, predicate)
    } else {
        return lastOrDefault_1(source)
    }
}

function lastOrDefault_1<TSource>(source: Iterable<TSource>): TSource | null {
    let last: TSource | null = null

    for (const value of source) {
        last = value
    }

    return last
}

function lastOrDefault_2<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): TSource | null {

    let last: TSource | null = null

    for (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    return last
}

export async function lastOrDefaultAsync<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> {

    let last: TSource | null = null

    for (const value of source) {
        if (await predicate(value) === true) {
            last = value
        }
    }

    return last
}

/**
 * @throws {InvalidOperationException} No Elements
 */
export function max(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function max<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function max<TSource>(
    source: Iterable<TSource> | Iterable<number>,
    selector?: (x: TSource) => number): number {
    if (selector) {
        return max_2<TSource>(source as Iterable<TSource>, selector)
    } else {
        return max_1(source as Iterable<number>)
    }
}

function max_1(source: Iterable<number>): number {
    let max: number | null = null
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, item)
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

function max_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number {
    let max: number | null = null
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

export async function maxAsync<TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let max: number | null = null
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, await selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}

/**
 * @throws {InvalidOperationException} No Elements
 */
export function min(source: Iterable<number>): number
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export function min<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function min<TSource>(source: Iterable<TSource> | Iterable<number>,
                             selector?: (x: TSource) => number): number {
    if (selector) {
        return min_2(source as Iterable<TSource>, selector)
    } else {
        return min_1(source as Iterable<number>)
    }
}

function min_1(source: Iterable<number>) {
    let min: number | null = null
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, item)
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

function min_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number) {
    let min: number | null = null
    for (const item of source) {
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
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let min: number | null = null
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, await selector(item))
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}

export function ofType<TSource, TType extends OfType>(
    source: Iterable<TSource>,
    type: TType): IEnumerable<InferType<TType>> {

    const typeCheck = typeof type === "string" ?
        ((x: TSource) => typeof x === type) as (x: TSource) => x is InferType<TType> :
        ((x: TSource) => x instanceof (type as any)) as (x: TSource) => x is InferType<TType>

    function *iterator(): IterableIterator<InferType<TType>> {
        for (const item of source) {
            if (typeCheck(item)) {
                yield item
            }
        }
    }

    return new BasicEnumerable(iterator)
}

export function orderBy<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
    return OrderedEnumerable.generate<TSource, TKey>(source, keySelector, true, comparer)
}

export function orderByAsync<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedEnumerable.generateAsync<TSource, TKey>(source, keySelector, true, comparer)
}

export function orderByDescending<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer?: IComparer<TKey>): IOrderedEnumerable<TSource> {
    return OrderedEnumerable.generate<TSource, TKey>(source, keySelector, false, comparer)
}

export function orderByDescendingAsync<TSource, TKey>(
    source: IEnumerable<TSource>,
    keySelector: (x: TSource) => Promise<TKey>,
    comparer?: IComparer<TKey>): IOrderedAsyncEnumerable<TSource> {
    return OrderedEnumerable.generateAsync<TSource, TKey>(source, keySelector, false, comparer)
}

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export function range(start: number, count: number): IEnumerable<number> {
    if (start < 0) {
        throw new ArgumentOutOfRangeException(`start`)
    }

    function* iterator() {
        const max = start + count
        for (let i = start; i < max; i++) {
            yield i
        }
    }

    return new BasicEnumerable(iterator)
}

export function repeat<T>(element: T, count: number): IEnumerable<T> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }

    function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element
        }
    }

    return new BasicEnumerable(iterator)
}

/**
 * Reverses an Iterable
 * @param source Iterable
 */
export function reverse<TSource>(source: Iterable<TSource>): IEnumerable<TSource> {
    function* iterator() {
        for (const x of [...source].reverse()) {
            yield x
        }
    }

    return new BasicEnumerable(iterator)
}

/**
 * Determines whether or not two sequences are equal
 * @param first first iterable
 * @param second second iterable
 * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
 */
export function sequenceEquals<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

    const firstIterator = first[Symbol.iterator]()
    const secondIterator = second[Symbol.iterator]()

    let firstResult = firstIterator.next()
    let secondResult = secondIterator.next()

    while (!firstResult.done && !secondResult.done) {
        if (!comparer(firstResult.value, secondResult.value)) {
            return false
        }

        firstResult = firstIterator.next()
        secondResult = secondIterator.next()
    }

    return firstResult.done && secondResult.done
}

export async function sequenceEqualsAsync<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

    const firstIterator = first[Symbol.iterator]()
    const secondIterator = second[Symbol.iterator]()

    let firstResult = firstIterator.next()
    let secondResult = secondIterator.next()

    while (!firstResult.done && !secondResult.done) {
        if (await comparer(firstResult.value, secondResult.value) === false) {
            return false
        }

        firstResult = firstIterator.next()
        secondResult = secondIterator.next()
    }

    return firstResult.done && secondResult.done
}

export function sum(source: Iterable<number>): number
export function sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function sum<TSource>(
    source: Iterable<number> | Iterable<TSource>,
    selector?: (x: TSource) => number): number {

    if (selector) {
        return sum_2(source as Iterable<TSource>, selector)
    } else {
        return sum_1(source as Iterable<number>)
    }
}

function sum_1(source: Iterable<number>): number {
    let sum = 0
    for (const value of source) {
        sum += value
    }

    return sum
}

function sum_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number {
    let sum = 0
    for (const value of source) {
        sum += selector(value)
    }

    return sum
}

export async function sumAsync<TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    let sum = 0
    for (const value of source) {
        sum += await selector(value)
    }

    return sum
}

export function take<T>(source: Iterable<T>, amount: number): IEnumerable<T> {

    function* iterator() {
        // negative amounts should yield empty
        let amountLeft = amount > 0 ? amount : 0
        for (const item of source) {
            if (amountLeft-- === 0) {
                break
            } else {
                yield item
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}

export function takeWhile<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => boolean): IEnumerable<T> {

    if (predicate.length === 1) {
        return takeWhile_1(source, predicate as (x: T) => boolean)
    } else {
        return takeWhile_2(source, predicate as (x: T, index: number) => boolean)
    }
}

function takeWhile_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
    function* iterator() {
        for (const item of source) {
            if (predicate(item)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}

function takeWhile_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
    function* iterator() {
        let index = 0
        for (const item of source) {
            if (predicate(item, index++)) {
                yield item
            } else {
                break
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}

export function takeWhileAsync<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {

    if (predicate.length === 1) {
        return takeWhileAsync_1(source, predicate as (x: T) => Promise<boolean>)
    } else {
        return takeWhileAsync_2(source, predicate as (x: T, index: number) => Promise<boolean>)
    }
}

function takeWhileAsync_1<T>(
    source: Iterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        for (const item of source) {
            if (await predicate(item)) {
                yield item
            } else {
                break
            }
        }
    }

    return AsyncEnumerable.from(iterator)
}

function takeWhileAsync_2<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* iterator() {
        let index = 0
        for (const item of source) {
            if (await predicate(item, index++)) {
                yield item
            } else {
                break
            }
        }
    }

    return AsyncEnumerable.from(iterator)
}

export function toArray<TSource>(source: Iterable<TSource>): TSource[] {
    return [...source]
}

export function toMap<K, V>(source: Iterable<V>, selector: (x: V) => K): Map<K, V[]> {
    const map = new Map<K, V[]>()

    for (const value of source) {
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

export async function toMapAsync<K, V>(source: Iterable<V>, selector: (x: V) => Promise<K>): Promise<Map<K, V[]>> {
    const map = new Map<K, V[]>()

    for (const value of source) {
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

export function toObject<TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => string): {[key: string]: TSource} {

    const map: {[key: string]: TSource} = {}

    for (const value of source) {
        map[selector(value)] = value
    }

    return map
}

export async function toObjectAsync<TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<string>): Promise<{[key: string]: TSource}> {

    const map: {[key: string]: TSource} = {}

    for (const value of source) {
        map[await selector(value)] = value
    }

    return map
}

export function toSet<TSource>(source: Iterable<TSource>): Set<TSource> {
    return new Set<TSource>(source)
}

export function union<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        if (comparer) {
            return union_2(first, second, comparer)
        } else {
            return union_1(first, second)
        }
}

function union_1<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>) {

    function* iterator() {

        const set = new Set<TSource>()

        for (const item of first) {
            if (set.has(item) === false) {
                yield item
                set.add(item)
            }
        }

        for (const item of second) {
            if (set.has(item) === false) {
                yield item
                set.add(item)
            }
        }
    }

    return new BasicEnumerable<TSource>(iterator)
}

function union_2<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource>) {

    function *iterator(): IterableIterator<TSource> {
        const result: TSource[] = []

        for (const source of [first, second]) {
            for (const value of source) {
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

    return new BasicEnumerable(iterator)
}

export function unionAsync<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IAsyncEqualityComparer<TSource>) {

    async function *iterator(): AsyncIterableIterator<TSource> {
        const result: TSource[] = []

        for (const source of [first, second]) {
            for (const value of source) {
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

    return AsyncEnumerable.from(iterator)
}

export function where<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => boolean): IEnumerable<T> {
    if (predicate.length === 1) {
        return where_1(source, predicate as (x: T) => boolean)
    } else {
        return where_2(source, predicate as (x: T, index: number) => boolean)
    }
}

function where_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T> {
    function* iterator() {
        for (const item of source) {
            if (predicate(item) === true) {
                yield item
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}

function where_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T> {
    function* iterator() {
        let i = 0
        for (const item of source) {
            if (predicate(item, i++) === true) {
                yield item
            }
        }
    }

    return new BasicEnumerable<T>(iterator)
}

export function whereAsync<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    if (predicate.length === 1) {
        return whereAsync_1(source, predicate as (x: T) => Promise<boolean>)
    } else {
        return whereAsync_2(source, predicate)
    }
}

function whereAsync_1<T>(
    source: Iterable<T>,
    predicate: (x: T) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* generator() {
        for (const item of source) {
            if (await predicate(item) === true) {
                yield item
            }
        }
    }

    return AsyncEnumerable.from(generator)
}

function whereAsync_2<T>(
    source: Iterable<T>,
    predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T> {
    async function* generator() {
        let i = 0
        for (const item of source) {
            if (await predicate(item, i++) === true) {
                yield item
            }
        }
    }

    return AsyncEnumerable.from(generator)
}

export function zip<T, Y>(
    source: Iterable<T>,
    second: Iterable<Y>): IEnumerable<ITuple<T, Y>>
export function zip<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT>
export function zip<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector?: (x: T, y: Y) => OUT): IEnumerable<OUT> | IEnumerable<ITuple<T, Y>> {
    if (resultSelector) {
        return zip_2(source, second, resultSelector)
    } else {
        return zip_1(source, second)
    }
}

function zip_1<T, Y>(source: Iterable<T>, second: Iterable<Y>): IEnumerable<ITuple<T, Y>> {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        while (true) {
            const a = firstIterator.next()
            const b = secondIterator.next()

            if (a.done && b.done) {
                break
            } else {
                yield AsTuple(a.value, b.value)
            }
        }
    }

    return new BasicEnumerable(iterator)
}

function zip_2<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT> {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        while (true) {
            const a = firstIterator.next()
            const b = secondIterator.next()

            if (a.done && b.done) {
                break
            } else {
                yield resultSelector(a.value, b.value)
            }
        }
    }

    return new BasicEnumerable(iterator)
}

export function zipAsync<T, Y, OUT>(
    source: Iterable<T>,
    second: Iterable<Y>,
    resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT> {
    async function* generator() {
        const firstIterator = source[Symbol.iterator]()
        const secondIterator = second[Symbol.iterator]()

        while (true) {
            const a = firstIterator.next()
            const b = secondIterator.next()

            if (a.done && b.done) {
                break
            } else {
                yield resultSelector(a.value, b.value)
            }
        }
    }

    return AsyncEnumerable.from(generator)
}
