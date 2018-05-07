import { AsyncEnumerable, InvalidOperationException } from "../../src/index"
import { asAsync, asPromise, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("max", () => {
    itEnumerable("MaxSelectEmptyError", (asEnumerable) => {
        expect(() => asEnumerable([] as number[]).max((x) => x * x))
            .toThrowError(InvalidOperationException)
    })

    itAsync("MaxSelectEmptyErrorAsync", async () => {
        const value = await expectAsync(asAsync([] as number[]).max((x) => x * x))
        value.toThrowError(InvalidOperationException)
    })

    itParallel("MaxSelectEmptyErrorParallel", async (asParallel) => {
        const value = await expectAsync(asParallel([] as number[]).max((x) => x * x))
        value.toThrowError(InvalidOperationException)
    })

    itEnumerable("MaxSelect", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itAsync("MaxSelectAsync", async () => {
        expect(await asAsync([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itParallel("MaxSelectParallel", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itEnumerable("Basic", (asEnumerable) => expect(asEnumerable([1, 2, 3]).max()).toBe(3))

    itAsync("BasicAsync", async () => expect(await asAsync([1, 2, 3]).max()).toBe(3))

    itParallel("BasicParallel", async (asParallel) => expect(await asParallel([1, 2, 3]).max()).toBe(3))

    itEnumerable("empty array throws exception", (asEnumerable) =>
        expect(() => asEnumerable([]).max()).toThrowError(InvalidOperationException))

    itAsync("empty array throws exception async", async () => {
        const value = await expectAsync(asAsync([]).max())
        value.toThrowError(InvalidOperationException)
    })

    itParallel("empty array throws exception parallel", async (asParallel) => {
        const value = await expectAsync(asParallel([]).max())
        value.toThrowError(InvalidOperationException)
    })

    itEnumerable("max with selector", (asEnumerable) =>
        expect(asEnumerable([1, 2, 3]).max((x) => x * 2)).toBe(6))

    itAsync("max with selector async", async () => {
        expect(await asAsync([1, 2, 3]).max((x) => x * 2)).toBe(6)
    })

    itParallel("max with selector parallel", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).max((x) => x * 2)).toBe(6)
    })

    itEnumerable("empty array throws exception with selector", (asEnumerable) =>
        expect(() => asEnumerable([]).max((x) => x * 2)).toThrowError(InvalidOperationException))

    itAsync("empty array throws exception with selector async", async () => {
        const expect = await expectAsync(asAsync([] as number[]).max((x) => x * 2))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("empty array throws exception with selector parallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([] as number[]).max((x) => x * 2))
        expect.toThrowError(InvalidOperationException)
    })

    //#region Infinity Test

    itEnumerable("Infinity Test", (asEnumerable) => {
        const max1 = asEnumerable([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .max()
        expect(max1).toBe(Number.POSITIVE_INFINITY)

        const max2 = asEnumerable([ Number.NEGATIVE_INFINITY ])
            .max()
        expect(max2).toBe(Number.NEGATIVE_INFINITY)
    })

    itAsync("Infinity Test", async () => {
        const max1 = await asAsync([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .max()
        expect(max1).toBe(Number.POSITIVE_INFINITY)

        const max2 = await asAsync([ Number.NEGATIVE_INFINITY ])
            .max()
        expect(max2).toBe(Number.NEGATIVE_INFINITY)
    })

    itParallel("Infinity Test", async (asParallel) => {
        const max1 = await asParallel([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .max()
        expect(max1).toBe(Number.POSITIVE_INFINITY)

        const max2 = await asParallel([ Number.NEGATIVE_INFINITY ])
            .max()
        expect(max2).toBe(Number.NEGATIVE_INFINITY)
    })

    //#endregion

    //#region Infinity Test With Selector

    itEnumerable("Infinity Test With Selector", (asEnumerable) => {
        const max1 = asEnumerable([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .max((x) => x)
        expect(max1).toBe(Number.POSITIVE_INFINITY)

        const max2 = asEnumerable([ Number.NEGATIVE_INFINITY ])
            .max((x) => x)
        expect(max2).toBe(Number.NEGATIVE_INFINITY)
    })

    itAsync("Infinity Test With Selector", async () => {
        const max1 = await asAsync([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .max((x) => x)
        expect(max1).toBe(Number.POSITIVE_INFINITY)

        const max2 = await asAsync([ Number.NEGATIVE_INFINITY ])
            .max((x) => x)
        expect(max2).toBe(Number.NEGATIVE_INFINITY)
    })

    itParallel("Infinity Test With Selector", async (asParallel) => {
        const max1 = await asParallel([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .max((x) => x)
        expect(max1).toBe(Number.POSITIVE_INFINITY)

        const max2 = await asParallel([ Number.NEGATIVE_INFINITY ])
            .max((x) => x)
        expect(max2).toBe(Number.NEGATIVE_INFINITY)
    })

    //#endregion
})
