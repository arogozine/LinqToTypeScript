import { InvalidOperationException } from "../../src/index"
import { asAsync, asParallel, expectAsync, itAsync, itEnumerable } from "../TestHelpers"

describe("singleOrDefault", () => {
    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.singleOrDefault()).toBe(1)
    })

    itAsync("basic async", async () => {
        const vals = asAsync([1])
        expect(await vals.singleOrDefault()).toBe(1)
    })

    itAsync("basic parallel", async () => {
        const vals = asParallel([1])
        expect(await vals.singleOrDefault()).toBe(1)
    })

    itEnumerable("empty", (asEnumerable) => {
        const vals = asEnumerable([])
        expect(vals.singleOrDefault()).toBeNull()
    })

    itAsync("empty async", async () => {
        const vals = asAsync([])
        expect(await vals.singleOrDefault()).toBeNull()
    })

    itAsync("empty parallel", async () => {
        const vals = asParallel([])
        expect(await vals.singleOrDefault()).toBeNull()
    })

    itEnumerable("basic expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.singleOrDefault()).toThrowError(InvalidOperationException)
    })

    itAsync("basic expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault())
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("basic expection parallel", async () => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.singleOrDefault((x) => true)).toBe(1)
    })

    itAsync("predicate async", async () => {
        const vals = asAsync([1])
        expect(await vals.singleOrDefault((x) => true)).toBe(1)
    })

    itAsync("predicate parallel", async () => {
        const vals = asParallel([1])
        expect(await vals.singleOrDefault((x) => true)).toBe(1)
    })

    itEnumerable("predicate multiple expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.singleOrDefault((x) => true)).toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate no matches expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(vals.singleOrDefault((x) => false)).toBeNull()
    })

    itAsync("predicate multiple expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches null async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        expect(await vals.singleOrDefault((x) => false)).toBeNull()
    })

    itAsync("predicate multiple expection parallel", async () => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches null parallel", async () => {
        const vals = asParallel([1, 2, 3, 4])
        expect(await vals.singleOrDefault((x) => false)).toBeNull()
    })
})
