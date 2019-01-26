import { InvalidOperationException } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

// tslint:disable:variable-name

describe("singleOrDefault", () => {
    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.singleOrDefault()).toBe(1)
    })

    itAsync("basic", async () => {
        const vals = asAsync([1])
        expect(await vals.singleOrDefault()).toBe(1)
    })

    itParallel("basic", async (asParallel) => {
        const vals = asParallel([1])
        expect(await vals.singleOrDefault()).toBe(1)
    })

    itEnumerable("empty", (asEnumerable) => {
        const vals = asEnumerable([])
        expect(vals.singleOrDefault()).toBeNull()
    })

    itAsync("empty", async () => {
        const vals = asAsync([])
        expect(await vals.singleOrDefault()).toBeNull()
    })

    itParallel("empty", async (asParallel) => {
        const vals = asParallel([])
        expect(await vals.singleOrDefault()).toBeNull()
    })

    itEnumerable("basic expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.singleOrDefault()).toThrowError(InvalidOperationException)
    })

    itAsync("basic expection", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault())
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("basic expection", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.singleOrDefault((_x) => true)).toBe(1)
    })

    itAsync("predicate", async () => {
        const vals = asAsync([1])
        expect(await vals.singleOrDefault((_x) => true)).toBe(1)
    })

    itParallel("predicate", async (asParallel) => {
        const vals = asParallel([1])
        expect(await vals.singleOrDefault((_x) => true)).toBe(1)
    })

    itEnumerable("predicate multiple exception", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.singleOrDefault((_x) => true)).toThrowError(InvalidOperationException)
    })

    itAsync("predicate multiple exception", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault((_x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("predicate multiple exception", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault((_x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate no matches null", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(vals.singleOrDefault((_x) => false)).toBeNull()
    })

    itAsync("predicate no matches null", async () => {
        const vals = asAsync([1, 2, 3, 4])
        expect(await vals.singleOrDefault((_x) => false)).toBeNull()
    })

    itParallel("predicate no matches null", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        expect(await vals.singleOrDefault((_x) => false)).toBeNull()
    })
})
