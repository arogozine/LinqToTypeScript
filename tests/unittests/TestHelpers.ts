import {
    IAsyncEnumerable,
    IParallelEnumerable,
    ParallelGeneratorType,
    ArrayEnumerable,
    from,
    fromAsync,
    fromParallel,
    IEnumerable,
} from "linq-to-typescript"

/**
 * Return a promise that returns after 0 to 100 ms
 * @param value Value to Return
 * @returns Promise that returns value
 */
export const randomTimeOut = <T>(value: T) => {
    const rand = Math.floor(Math.random() * 100)

    return new Promise<T>(resolve => {
        setTimeout(() => resolve(value), rand)
    })
}

// There are helper functions to make testing easy

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
            yield await randomTimeOut(value)
        }
    }
    return fromAsync(promises)
}

function asParallel<T>(type: ParallelGeneratorType, values: T[]): IParallelEnumerable<T> {
    const generator1 = () => values.map(randomTimeOut)
    const generator2 = () => randomTimeOut([...values])
    const generator3 = async () => await generator1()

    switch (type) {
        case ParallelGeneratorType.ArrayOfPromises:
            return fromParallel(type, generator1)
        case ParallelGeneratorType.PromiseToArray:
            return fromParallel(type, generator2)
        case ParallelGeneratorType.PromiseOfPromises:
        default:
            return fromParallel(type, generator3)
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
    it(`${ expectation } Async`, (done) => {
        assertion().then(done)
    }, timeout)
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

    if (assertion.length === 0) {
        // asIEnumerable is not used
        it(expectation, (done) => { assertion(asArrayEnumerable).then(done) }, timeout)
    } else {
        // asIEnumerable is used
        it(`${ expectation } Array Enumerable`, (done) => {
            assertion(asArrayEnumerable).then(done)
        }, timeout)
        it(`${ expectation } Basic Enumerable`, (done) => {
            assertion(asBasicEnumerable).then(done)
        }, timeout)
        it(`${ expectation } Array`, (done) => {
            assertion((x) => x as any).then(done)
        }, timeout)
    }
}

/**
 * Asyc wrapper for @see {expect}
 */
export async function expectAsync<T>(promise: Promise<T>) {
    try {
        return expect(await promise)
    } catch (e) {
        return expect((() => { throw e }) as any)
    }
}
