import { ArrayEnumerable, AsyncEnumerable, BasicEnumerable, IAsyncEnumerable, IEnumerable } from "./../src/index"

function asArrayEnumerable<T>(values: T[]): IEnumerable<T> {
    const array = new ArrayEnumerable<T>()
    array.push(...values)
    return array
}

function asBasicEnumerable<T>(values: T[]): IEnumerable<T> {
    return new BasicEnumerable<T>(function* meh() {
        for (const x of values) {
            yield x
        }
    })
}

export function asAsync(values: never[]): IAsyncEnumerable<number>
export function asAsync<T>(values: T[]): IAsyncEnumerable<T>
export function asAsync<T>(values: T[]) {
    async function *promises() {
        for (const value of values) {
            yield await new Promise<T>((resolve) => setTimeout(() => resolve(value), 10))
        }
    }
    return AsyncEnumerable.from(promises)
}

export function itEnumerable<T = number>(
    expectation: string,
    assertion: (asIEnumerable: (x: T[]) => IEnumerable<T>) => void, timeout?: number): void {
    it(`${ expectation } array enumerable`, () => assertion(asArrayEnumerable), timeout)
    it(`${ expectation } basic enumerable`, () => assertion(asBasicEnumerable), timeout)
    it(`${ expectation } array`, () => assertion((x) => x as any), timeout)
}

export function itAsync<T>(expectation: string, assertion: () => Promise<T>, timeout?: number): void {
    it(expectation, (done) => assertion().then(done, fail), timeout)
}

export async function expectAsync<T>(promise: Promise<T>): Promise<jasmine.Matchers<T>> {
    try {
        return expect(await promise)
    } catch (e) {
        return expect(() => { throw e })
    }
}
