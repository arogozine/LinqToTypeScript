import { InvalidOperationException } from "../../src/index"
import { asAsync, asParallel, asPromise, expectAsync, itAsync, itEnumerableAsync } from "../TestHelpers"

describe("minAsync", () => {

    itEnumerableAsync("MinPredicate Empty Error", async (asEnumerable) => {
        const expect = await expectAsync(asEnumerable([] as number[]).minAsync((x) => asPromise(x * x)))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("MinPredicate Empty Error Async", async () => {
        const expectMin = await expectAsync(asAsync([] as number[]).minAsync((x) => asPromise(x * x)))
        expectMin.toThrowError(InvalidOperationException)
    })

    itAsync("MinPredicate Empty Error Parallel", async () => {
        const expectMin = await expectAsync(asParallel([] as number[]).minAsync((x) => asPromise(x * x)))
        expectMin.toThrowError(InvalidOperationException)
    })

    itEnumerableAsync("Min Predicate", async (asEnumerable) => {
        const expect = await expectAsync(asEnumerable([1, 2, 3, -7]).minAsync((x) => asPromise(Math.abs(x))))
        expect.toBe(1)
    })

    itAsync("Min Predicate Async", async () => {
        const expectMin = await expectAsync(asAsync([1, 2, 3, -7]).min(Math.abs))
        expectMin.toBe(1)
    })

    itAsync("Min Predicate Parallel", async () => {
        const expectMin = await expectAsync(asParallel([1, 2, 3, -7]).minAsync((x) => asPromise(Math.abs(x))))
        expectMin.toBe(1)
    })

    itEnumerableAsync("empty exception with selector", async (asEnumerable) => {
        const expect = await expectAsync(asEnumerable([]).minAsync((x) => asPromise(x)))
        expect.toThrowError(InvalidOperationException)
    })
})
