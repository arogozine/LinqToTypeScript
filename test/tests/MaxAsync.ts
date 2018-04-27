import { InvalidOperationException } from "../../src/index"
import { asAsync, asPromise, expectAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("MaxAsync", () => {
    itEnumerableAsync("MaxSelectEmptyError", async (asEnumerable) => {
        const expect = await expectAsync(asEnumerable([] as number[]).maxAsync((x) => asPromise(x * x)))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("MaxSelectEmptyErrorAsync", async () => {
        const value = await expectAsync(asAsync([] as number[]).maxAsync((x) => asPromise(x * x)))
        value.toThrowError(InvalidOperationException)
    })

    itParallel("MaxSelectEmptyErrorParallel", async (asParallel) => {
        const value = await expectAsync(asParallel([]).maxAsync((x) => asPromise(x * x)))
        value.toThrowError(InvalidOperationException)
    })

    itEnumerableAsync("MaxSelect", async (asEnumerable) => {
        const value = await asEnumerable([1, 2, 3]).maxAsync((x) => asPromise(x * x))
        expect(value).toBe(9)
    })

    itAsync("MaxSelectAsync", async () => {
        expect(await asAsync([1, 2, 3]).maxAsync((x) => asPromise(x * x))).toBe(9)
    })

    itParallel("MaxSelectParallel", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).maxAsync((x) => asPromise(x * x))).toBe(9)
    })

    itEnumerableAsync("max with selector", async (asEnumerable) => {
        const value = await asEnumerable([1, 2, 3]).maxAsync((x) => asPromise(x * 2))
        expect(value).toBe(6)
    })

    itAsync("max with selector async", async () => {
        expect(await asAsync([1, 2, 3]).maxAsync((x) => asPromise(x * 2))).toBe(6)
    })

    itParallel("max with selector parallel", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).maxAsync((x) => asPromise(x * 2))).toBe(6)
    })

    itEnumerableAsync("empty array throws exception with selector", async (asEnumerable) => {
        const expect = await expectAsync(asEnumerable([]).maxAsync((x) => asPromise(x * 2)))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("empty array throws exception with selector async", async () => {
        const expect = await expectAsync(asAsync([] as number[]).maxAsync((x) => asPromise(x * 2)))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("empty array throws exception with selector parallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).maxAsync((x) => asPromise(x * 2)))
        expect.toThrowError(InvalidOperationException)
    })
})
