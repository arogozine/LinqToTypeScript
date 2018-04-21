import { DataType } from "../src/parallel/DataType"
import {
    ArrayEnumerable,
    AsyncEnumerable,
    Enumerable,
    IAsyncEnumerable,
    IEnumerable,
    IParallelEnumerable,
    ParallelEnumerable,
} from "./../src/index"

// There are helper functions to make testing easy

export function asParallel<T>(values: never[]): IParallelEnumerable<number>
export function asParallel<T>(values: T[]): IParallelEnumerable<T>
export function asParallel<T>(values: T[]): IParallelEnumerable<T> {
    const generator = () => {
        return values.map((value) => new Promise<T>((resolve) => setTimeout(() => resolve(value), 10)))
    }
    return ParallelEnumerable.from(DataType.ArrayOfPromises, generator)
}

/**
 * Wraps a value in a promise. For testing async code.
 * @param value Value to Wrap in a Promise.
 */
export function asPromise<T>(value: T): Promise<T> {
    return new Promise((resolve) => resolve(value))
}

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
    return Enumerable.from(values)
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
    return AsyncEnumerable.from(promises)
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
    it(`${ expectation } array enumerable`, () => assertion(asArrayEnumerable), timeout)
    it(`${ expectation } basic enumerable`, () => assertion(asBasicEnumerable), timeout)
    it(`${ expectation } array`, () => assertion((x) => x as any), timeout)
}

/**
 * Wrapper for @see {it} for async methods
 * @param expectation Textual description of what this spec is checking
 * @param assertion Function that contains the code of your test. If not provided the test will be pending.
 * @param timeout Custom timeout for an async spec.
 */
export function itAsync<T>(expectation: string, assertion: () => Promise<T>, timeout?: number): void {
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
        itAsync(`${ expectation } array enumerable`, () => assertion(asArrayEnumerable), timeout)
        itAsync(`${ expectation } basic enumerable`, () => assertion(asBasicEnumerable), timeout)
        itAsync(`${ expectation } array`, () => assertion((x) => x as any), timeout)
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
