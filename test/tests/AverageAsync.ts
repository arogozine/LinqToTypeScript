import { InvalidOperationException } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("averageAsync", () => {
    itEnumerableAsync("selector", async (asEnumerable) => {
        const value = await asEnumerable([0, 10]).averageAsync(async (x) => x * 10)
        expect(value).toBe(50)
    })

    itAsync("selectorAsync", async () => {
        const value = await asAsync([0, 10]).averageAsync(async (x) => x * 10)
        expect(value).toBe(50)
    })

    itParallel("selector", async (asParallel) => {
        expect(await asParallel([0, 10]).averageAsync(async (x) => x * 10)).toBe(50)
    })

    itEnumerableAsync("empty array with selector throws exception", async (asEnumerable) => {
        const expect = await expectAsync(asEnumerable([]).averageAsync(async (x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("empty array with selector throws exception Async", async () => {
        const expect = await expectAsync((asAsync([])).averageAsync(async (x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("empty array with selector throws exception", async (asParallel) => {
        const expect = await expectAsync((asParallel([])).averageAsync(async (x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })
})
