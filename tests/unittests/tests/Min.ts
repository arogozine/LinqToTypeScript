import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("min", () => {
    itEnumerable("Min", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3, -7]).min()).toBe(-7)
    })

    itAsync("Min", async () => {
        expect(await asAsync([1, 2, 3, -7]).min()).toBe(-7)
    })

    itParallel("Min", async (asParallel) => {
        expect(await asParallel([1, 2, 3, -7]).min()).toBe(-7)
    })

    itEnumerable("Min Zero", (asEnumerable) => {
        expect(asEnumerable([1, 2, 0, 1, 3, 4, 9, 8, 5]).min()).toBe(0)
    })

    itAsync("Min Zero", async () => {
        expect(await asAsync([1, 2, 0, 1, 3, 4, 9, 8, 5]).min()).toBe(0)
    })

    itParallel("Min Zero", async (asParallel) => {
        expect(await asParallel([1, 2, 0, 1, 3, 4, 9, 8, 5]).min()).toBe(0)
    })

    itEnumerable("MinEmptyError", (asEnumerable) => {
        expect(() => asEnumerable([]).min()).toThrowError(InvalidOperationException)
    })

    itAsync("MinEmptyError", async () => {
        const expectMin = await expectAsync(asAsync([]).min())
        expectMin.toThrowError(InvalidOperationException)
    })

    itParallel("MinEmptyError", async (asParallel) => {
        const expectMin = await expectAsync(asParallel([]).min())
        expectMin.toThrowError(InvalidOperationException)
    })

    itEnumerable("MinPredicate Empty Error", (asEnumerable) => {
        expect(() => asEnumerable([] as number[]).min((x) => x * x)).toThrowError(InvalidOperationException)
    })

    itAsync("MinPredicate Empty Error", async () => {
        const expectMin = await expectAsync(asAsync([] as number[]).min((x) => x * x))
        expectMin.toThrowError(InvalidOperationException)
    })

    itParallel("MinPredicate Empty Error", async (asParallel) => {
        const expectMin = await expectAsync(asParallel([]).min((x) => x * x))
        expectMin.toThrowError(InvalidOperationException)
    })

    itEnumerable("Min Predicate", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3, -7]).min(Math.abs)).toBe(1)
    })

    itAsync("Min Predicate", async () => {
        const expectMin = await expectAsync(asAsync([1, 2, 3, -7]).min(Math.abs))
        expectMin.toBe(1)
    })

    itParallel("Min Predicate", async (asParallel) => {
        const expectMin = await expectAsync(asParallel([1, 2, 3, -7]).min(Math.abs))
        expectMin.toBe(1)
    })

    itEnumerable("Min Predicate Zero", (asEnumerable) => {
        expect(asEnumerable([1, 2, 0, 1, 3, 4, 9, 8, 5]).min(Math.abs)).toBe(0)
    })

    itAsync("Min Predicate Zero", async () => {
        const expectMin = await expectAsync(asAsync([1, 2, 0, 1, 3, 4, 9, 8, 5]).min(Math.abs))
        expectMin.toBe(0)
    })

    itParallel("Min Predicate Zero", async (asParallel) => {
        const expectMin = await expectAsync(asParallel([1, 2, 0, 1, 3, 4, 9, 8, 5]).min(Math.abs))
        expectMin.toBe(0)
    })

    itEnumerable("empty exception", (asEnumerable) => {
        expect(() => asEnumerable([]).min()).toThrowError(InvalidOperationException)
    })

    itAsync("empty exception", async () => {
        const expectMin = await expectAsync(asAsync([]).min())
        expectMin.toThrowError(InvalidOperationException)
    })

    itParallel("empty exception", async (asParallel) => {
        const expectMin = await expectAsync(asParallel([]).min())
        expectMin.toThrowError(InvalidOperationException)
    })

    itEnumerable("empty exception with selector", (asEnumerable) => {
        expect(() => asEnumerable([]).min((x) => x)).toThrowError(InvalidOperationException)
    })

    itAsync("empty exception with selector", async () => {
        const expectMin = await expectAsync(asAsync([]).min((x) => x))
        expectMin.toThrowError(InvalidOperationException)
    })

    itParallel("empty exception with selector", async (asParallel) => {
        const expectMin = await expectAsync(asParallel([]).min((x) => x))
        expectMin.toThrowError(InvalidOperationException)
    })

    //#region Infinity Test

    itEnumerable("Infinity Test", (asEnumerable) => {
        const min1 = asEnumerable([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .min()
        expect(min1).toBe(Number.NEGATIVE_INFINITY)

        const min2 = asEnumerable([ Number.POSITIVE_INFINITY ])
            .min()
        expect(min2).toBe(Number.POSITIVE_INFINITY)
    })

    itAsync("Infinity Test", async () => {
        const min1 = await asAsync([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .min()
        expect(min1).toBe(Number.NEGATIVE_INFINITY)

        const min2 = await asAsync([ Number.POSITIVE_INFINITY ])
            .min()
        expect(min2).toBe(Number.POSITIVE_INFINITY)
    })

    itParallel("Infinity Test", async (asParallel) => {
        const min1 = await asParallel([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .min()
        expect(min1).toBe(Number.NEGATIVE_INFINITY)

        const min2 = await asParallel([ Number.POSITIVE_INFINITY ])
            .min()
        expect(min2).toBe(Number.POSITIVE_INFINITY)
    })

    //#endregion

    //#region Infinity Test With Selector

    itEnumerable("Infinity Test With Selector", (asEnumerable) => {
        const min1 = asEnumerable([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .min((x) => x)
        expect(min1).toBe(Number.NEGATIVE_INFINITY)

        const min2 = asEnumerable([ Number.POSITIVE_INFINITY ])
            .min((x) => x)
        expect(min2).toBe(Number.POSITIVE_INFINITY)
    })

    itAsync("Infinity Test With Selector", async () => {
        const min1 = await asAsync([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .min((x) => x)
        expect(min1).toBe(Number.NEGATIVE_INFINITY)

        const min2 = await asAsync([ Number.POSITIVE_INFINITY ])
            .min((x) => x)
        expect(min2).toBe(Number.POSITIVE_INFINITY)
    })

    itParallel("Infinity Test With Selector", async (asParallel) => {
        const min1 = await asParallel([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])
            .min((x) => x)
        expect(min1).toBe(Number.NEGATIVE_INFINITY)

        const min2 = await asParallel([ Number.POSITIVE_INFINITY ])
            .min((x) => x)
        expect(min2).toBe(Number.POSITIVE_INFINITY)
    })

    //#endregion

    //#region Zero Array

    itEnumerable("Zero Array", (asEnumerable) => {
        const min = asEnumerable([0, 0]).min()
        expect(min).toBe(0)
      
        const min2 = asEnumerable([0, 0]).min((x) => x * 2)
        expect(min2).toBe(0)
    })

    itAsync("Zero Array", async () => {
        const min = await asAsync([0, 0]).min()
        expect(min).toBe(0)
      
        const min2 = await asAsync([0, 0]).min((x) => x * 2)
        expect(min2).toBe(0)
    })

    
    itParallel("Zero Array", async (asParallel) => {
        const min = await asParallel([0, 0]).min()
        expect(min).toBe(0)
      
        const min2 = await asParallel([0, 0]).min((x) => x * 2)
        expect(min2).toBe(0)
    })

    //#endregion
})
