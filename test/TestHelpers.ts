import {
    ArrayEnumerable,
    AsyncEnumerable,
    Enumerable,
    IAsyncEnumerable,
    IEnumerable,
    IParallelEnumerable,
    ParallelEnumerable,
    ParallelGeneratorType,
} from "./../src/index"

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

export function itParallel<T = number>(
    expectation: string,
    assertion: (asOParallelEnumerable: (x: T[]) => IParallelEnumerable<T>) => void, timeout?: number): void {
    const a = (x: T[]) => asParallel(ParallelGeneratorType.ArrayOfPromises, x)
    const b = (x: T[]) => asParallel(ParallelGeneratorType.PromiseOfPromises, x)
    const c = (x: T[]) => asParallel(ParallelGeneratorType.PromiseToArray, x)
    if (expectation.toLowerCase().endsWith(`parallel`)) {
        throw new Error(`No need for Parallel`)
    }
    expectation = `${ expectation } Parallel`
    it(`${ expectation } ArrayOfPromises`, () => assertion(a), timeout)
    it(`${ expectation } PromiseOfPromises`, () => assertion(b), timeout)
    it(`${ expectation } PromiseToArray`, () => assertion(c), timeout)
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
