import { InvalidOperationException } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

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
        expect(vals.singleOrDefault((x) => true)).toBe(1)
    })

    itAsync("predicate", async () => {
        const vals = asAsync([1])
        expect(await vals.singleOrDefault((x) => true)).toBe(1)
    })

    itParallel("predicate", async (asParallel) => {
        const vals = asParallel([1])
        expect(await vals.singleOrDefault((x) => true)).toBe(1)
    })

    itEnumerable("predicate multiple exception", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.singleOrDefault((x) => true)).toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate no matches exception", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(vals.singleOrDefault((x) => false)).toBeNull()
    })

    itAsync("predicate multiple exception async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault((x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches null async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        expect(await vals.singleOrDefault((x) => false)).toBeNull()
    })

    itParallel("predicate multiple exception", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault((x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("predicate no matches nulll", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        expect(await vals.singleOrDefault((x) => false)).toBeNull()
    })
})
