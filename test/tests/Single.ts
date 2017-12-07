import { InvalidOperationException } from "../../src/index"
import { asAsync, asParallel, expectAsync, itAsync, itEnumerable } from "../TestHelpers"

describe("single", () => {
    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.single()).toBe(1)
    })

    itAsync("basic async", async () => {
        const vals = asAsync([1])
        expect(await vals.single()).toBe(1)
    })

    itAsync("basic parallel", async () => {
        const vals = asParallel([1])
        expect(await vals.single()).toBe(1)
    })

    itEnumerable("basic expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single()).toThrowError(InvalidOperationException)
    })

    itAsync("basic expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single())
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("basic expection parallel", async () => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.single())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.single((x) => true)).toBe(1)
    })

    itAsync("predicate async", async () => {
        const vals = asAsync([1])
        expect(await vals.single((x) => true)).toBe(1)
    })

    itAsync("predicate parallel", async () => {
        const vals = asParallel([1])
        expect(await vals.single((x) => true)).toBe(1)
    })

    itEnumerable("predicate multiple expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single((x) => true)).toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate no matches expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single((x) => false)).toThrowError(InvalidOperationException)
    })

    itAsync("predicate multiple expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => false))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate multiple expection parallel", async () => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches expection parallel", async () => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => false))
        expect.toThrowError(InvalidOperationException)
    })
})
