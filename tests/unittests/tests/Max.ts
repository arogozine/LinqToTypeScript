import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("max", () => {
    itEnumerable("MaxSelectEmptyError", (asEnumerable) => {
        expect(() => asEnumerable([] as number[]).max((x) => x * x))
            .toThrowError(InvalidOperationException)
    })

    itAsync("MaxSelectEmptyError", async () => {
        const value = await expectAsync(asAsync([] as number[]).max((x) => x * x))
        value.toThrowError(InvalidOperationException)
    })

    itParallel("MaxSelectEmptyError", async (asParallel) => {
        const value = await expectAsync(asParallel([] as number[]).max((x) => x * x))
        value.toThrowError(InvalidOperationException)
    })

    itEnumerable("MaxSelect", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itAsync("MaxSelect", async () => {
        expect(await asAsync([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itParallel("MaxSelect", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itEnumerable("Basic", (asEnumerable) => expect(asEnumerable([1, 2, 3]).max()).toBe(3))

    itAsync("Basic", async () => expect(await asAsync([1, 2, 3]).max()).toBe(3))

    itParallel("Basic", async (asParallel) => expect(await asParallel([1, 2, 3]).max()).toBe(3))

    itEnumerable("Max Zero", (asEnumerable) => {
        expect(asEnumerable([0, -1]).max()).toBe(0)
    })

    itAsync("Max Zero", async () => {
        expect(await asAsync([0, -1]).max()).toBe(0)
    })

    itParallel("Max Zero", async (asParallel) => {
        expect(await asParallel([0, -1]).max()).toBe(0)
    })

    itEnumerable("empty array throws exception", (asEnumerable) =>
        expect(() => asEnumerable([]).max()).toThrowError(InvalidOperationException))

    itAsync("empty array throws exception", async () => {
        const value = await expectAsync(asAsync([]).max())
        value.toThrowError(InvalidOperationException)
    })

    itParallel("empty array throws exception", async (asParallel) => {
        const value = await expectAsync(asParallel([]).max())
        value.toThrowError(InvalidOperationException)
    })

    itEnumerable("max with selector", (asEnumerable) =>
        expect(asEnumerable([1, 2, 3]).max((x) => x * 2)).toBe(6))

    itAsync("max with selector", async () => {
        expect(await asAsync([1, 2, 3]).max((x) => x * 2)).toBe(6)
    })

    itParallel("max with selector", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).max((x) => x * 2)).toBe(6)
    })

    itEnumerable("empty array throws exception with selector", (asEnumerable) =>
        expect(() => asEnumerable([]).max((x) => x * 2)).toThrowError(InvalidOperationException))

    itAsync("empty array throws exception with selector", async () => {
        const expect = await expectAsync(asAsync([] as number[]).max((x) => x * 2))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("empty array throws exception with selector", async (asParallel) => {
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
    
    //#region Zero Array

    itEnumerable("Zero Array", (asEnumerable) => {
        const max = asEnumerable([0, 0]).max()
        expect(max).toBe(0)

        const max2 = asEnumerable([0, 0]).max((x) => x * 2)
        expect(max2).toBe(0)
    })

    itAsync("Zero Array", async () => {
        const max = await asAsync([0, 0]).max()
        expect(max).toBe(0)

        const max2 = await asAsync([0, 0]).max((x) => x * 2)
        expect(max2).toBe(0)
    })

    itParallel("Zero Array", async (asParallel) => {
        const max = await asParallel([0, 0]).max()
        expect(max).toBe(0)

        const max2 = await asParallel([0, 0]).max((x) => x * 2)
        expect(max2).toBe(0)
    })

    //#endregion
})
