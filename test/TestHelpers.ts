import { BasicAsyncEnumerable } from "async/BasicAsyncEnumerable"
import {
    ArrayEnumerable,
    from,
    fromAsync,
    IAsyncEnumerable,
    IEnumerable,
    IParallelEnumerable,
    ParallelEnumerable,
    ParallelGeneratorType,
} from "./../src/index"

// There are helper functions to make testing easy

// We want the description to be the function
// being tested

// Check that there is the same test for
// Enumerable, AsyncEnumerable, and ParallelEnumerable
type EnumerationType = "Sync" | "Async" | "Parallel"
const nameMap = new Map<string, EnumerationType[]>()

//#region Describe Wrapper

const desc = describe

const isChecks: ReadonlyArray<string> = [
    "isAsyncEnumerable",
    "isEnumerable",
    "isParallelEnumerable",
]

const syncKeys = Object.getOwnPropertyNames(ArrayEnumerable)
const asyncKeys = Object.getOwnPropertyNames(BasicAsyncEnumerable)
const staticMethods = [ ...syncKeys, ...asyncKeys ]

function validateKeys(description: string) {
    for (const [key, values] of nameMap.entries()) {
        if (values.length !== 3) {
            // tslint:disable-next-line:no-console
            console.warn(`For ${ description }: ${ key } - there is only ${ values.length } entries`)
        }
    }

    nameMap.clear()
}

function describeWrapper(description: string, specDefinitions: () => void): void {
    const allowed = [
        "AsyncEnumerableIteration",
        "ParallelEnumerable",
        "thenBy",
        "thenByAsync",
        "joinByKey",
        ... isChecks,
    ]
    const keys = [ ...staticMethods, ...allowed ]

    if (keys.find((key) => key === description) === undefined) {
        // tslint:disable-next-line:no-console
        console.warn(`Describe - "${ description }"`)
    }

    desc(description, () => {
        specDefinitions()
        if (staticMethods.includes(description)) {
            validateKeys(description)
        } else {
            nameMap.clear()
        }
    })
}

(window as any).describe = describeWrapper

//#endregion

/**
 * Creates an @see {ArrayEnumerable} from passed in values
 * @param values values for the array enumerable
 */
function asArrayEnumerable<T>(values: T[]): IEnumerable<T> {
    const array = new ArrayEnumerable<T>()
    array.push(...values)
    return array
}

/**
 * Creates a BasicEnumerable from passed in values
 * @param values values for the basic enumerable
 */
function asBasicEnumerable<T>(values: T[]): IEnumerable<T> {
    return from(values)
}

/**
 * Creates an empty BasicAsyncEnumerable.
 * @param values Empty Array
 */
export function asAsync(values: never[]): IAsyncEnumerable<number>
/**
 * Creates a BasicAsyncEnumerable from an array of values.
 * Each value is returned after 10 miliseconds.
 * @param values Values to Async-ify
 */
export function asAsync<T>(values: T[]): IAsyncEnumerable<T>
export function asAsync<T>(values: T[]) {
    async function *promises() {
        for (const value of values) {
            yield await new Promise<T>((resolve) => setTimeout(() => resolve(value), 10))
        }
    }
    return fromAsync(promises)
}

function asParallel<T>(type: ParallelGeneratorType, values: T[]): IParallelEnumerable<T> {
    const generator1 = () =>
        values.map((value) => new Promise<T>((resolve) => setTimeout(() => resolve(value), 10)))
    const generator2 = () =>
        new Promise<T[]>((resolve) => setTimeout(() => resolve([... values]), 10))
    const generator3 = async () =>
        await generator1()
    switch (type) {
        case ParallelGeneratorType.ArrayOfPromises:
            return ParallelEnumerable.from(type, generator1)
        case ParallelGeneratorType.PromiseToArray:
            return ParallelEnumerable.from(type, generator2)
        case ParallelGeneratorType.PromiseOfPromises:
        default:
            return ParallelEnumerable.from(type, generator3)
    }

}

/**
 * Wrapper to run three @see {it} functions at the same time.
 * Tests ArrayEnumerable, BasicEnumerable, and Array (with extension methods applied)
 * @param expectation Expectation for the @see {it} function
 * @param assertion Assertion for the @see {it} function
 * @param timeout Timeout, if any, for the @see {it} function
 */
export function itEnumerable<T = number>(
    expectation: string,
    assertion: (asIEnumerable: (x: T[]) => IEnumerable<T>) => void, timeout?: number): void {
    const currentValues = nameMap.get(expectation)
    if (currentValues) {
        currentValues.push("Sync")
    } else {
        nameMap.set(expectation, ["Sync"])
    }

    if (expectation.toLowerCase().endsWith(`parallel`)) {
        // tslint:disable-next-line:no-console
        console.warn(`itEnumerable ends with Parallel: "${ expectation }"`)
    }

    if (expectation.toLowerCase().endsWith(`async`)) {
        // tslint:disable-next-line:no-console
        console.warn(`itEnumerable ends with Async: ${ expectation }`)
    }

    if (assertion.length === 0) {
        // asIEnumerable is not used
        it(expectation, () => assertion(asArrayEnumerable), timeout)
    } else {
        // asIEnumerable is used
        it(`${ expectation } array enumerable`, () => assertion(asArrayEnumerable), timeout)
        it(`${ expectation } basic enumerable`, () => assertion(asBasicEnumerable), timeout)
        it(`${ expectation } array`, () => assertion((x) => x as any), timeout)
    }
}

export function itParallel<T = number>(
    expectation: string,
    assertion: (asParallelEnumerable: (x: T[]) => IParallelEnumerable<T>) => void, timeout?: number): void {
    const currentValues = nameMap.get(expectation)
    if (currentValues) {
        currentValues.push("Parallel")
    } else {
        nameMap.set(expectation, ["Parallel"])
    }

    if (expectation.toLowerCase().endsWith(`parallel`)) {
        // tslint:disable-next-line:no-console
        console.warn(`itParallel ends with Parallel: "${ expectation }"`)
    }

    if (expectation.toLowerCase().endsWith(`async`)) {
        // tslint:disable-next-line:no-console
        console.warn(`itParallel ends with Async: ${ expectation }`)
    }

    const a = (x: T[]) => asParallel(ParallelGeneratorType.ArrayOfPromises, x)

    expectation = `${ expectation } Parallel`
    if (assertion.length === 0) {
        // asParallelEnumerable is not used
        it(expectation, () => assertion(a), timeout)
    } else {
        // asParallelEnumerable is used
        const b = (x: T[]) => asParallel(ParallelGeneratorType.PromiseOfPromises, x)
        const c = (x: T[]) => asParallel(ParallelGeneratorType.PromiseToArray, x)
        it(`${ expectation } ArrayOfPromises`, () => assertion(a), timeout)
        it(`${ expectation } PromiseOfPromises`, () => assertion(b), timeout)
        it(`${ expectation } PromiseToArray`, () => assertion(c), timeout)
    }
}

/**
 * Wrapper for @see {it} for async methods
 * @param expectation Textual description of what this spec is checking
 * @param assertion Function that contains the code of your test. If not provided the test will be pending.
 * @param timeout Custom timeout for an async spec.
 */
export function itAsync<T>(expectation: string, assertion: () => Promise<T>, timeout?: number): void {

    const currentValues = nameMap.get(expectation)
    if (currentValues) {
        currentValues.push("Async")
    } else {
        nameMap.set(expectation, ["Async"])
    }

    if (expectation.toLowerCase().endsWith(`async`)) {
        // tslint:disable-next-line:no-console
        console.warn(`itAsync ends with Async: "${ expectation }"`)
    }

    if (expectation.toLowerCase().endsWith(`parallel`)) {
        // tslint:disable-next-line:no-console
        console.warn(`itAsync ends with Parallel: ${ expectation }`)
    }

    expectation = `${ expectation } Async`

    it(expectation, (done) => assertion().then(done, fail), timeout)
}

/**
 * Wrapper to run three @see {itAsync} functions at the same time.
 * Tests ArrayEnumerable, BasicEnumerable, and Array (with extension methods applied)
 * @param expectation Textual description of what this spec is checking
 * @param assertion Function that contains the code of your test. If not provided the test will be pending.
 * @param timeout Custom timeout for an async spec.
 */
export function itEnumerableAsync<T = number>(
    expectation: string,
    assertion: (asIEnumerable: (x: T[]) => IEnumerable<T>) => Promise<void>, timeout?: number): void {
    const currentValues = nameMap.get(expectation)
    if (currentValues) {
        currentValues.push("Sync")
    } else {
        nameMap.set(expectation, ["Sync"])
    }

    if (assertion.length === 0) {
        // asIEnumerable is not used
        it(expectation, (done) => assertion(asArrayEnumerable).then(done, fail), timeout)
    } else {
        // asIEnumerable is used
        it(`${ expectation } Array Enumerable`,
        (done) => assertion(asArrayEnumerable).then(done, fail), timeout)
        it(`${ expectation } Basic Enumerable`,
            (done) => assertion(asBasicEnumerable).then(done, fail), timeout)
        it(`${ expectation } Array`,
            (done) => assertion((x) => x as any).then(done, fail), timeout)
    }
}

/**
 * Asyc wrapper for @see {expect}
 */
export async function expectAsync<T>(promise: Promise<T>): Promise<jasmine.Matchers<T>> {
    try {
        return expect(await promise)
    } catch (e) {
        return expect(() => { throw e })
    }
}
