import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

// tslint:disable:variable-name

describe("single", () => {
    it("String", () => {
        expect("a".single()).toBe("a")
    })

    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.single()).toBe(1)
    })

    itAsync("basic", async () => {
        const vals = asAsync([1])
        expect(await vals.single()).toBe(1)
    })

    itParallel("basic", async (asParallel) => {
        const vals = asParallel([1])
        expect(await vals.single()).toBe(1)
    })

    itEnumerable("basic exception", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single()).toThrow(InvalidOperationException)
    })

    itAsync("basic exception", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single())
        expect.toThrow(InvalidOperationException)
    })

    itParallel("basic exception", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.single())
        expect.toThrow(InvalidOperationException)
    })

    itEnumerable("predicate", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.single((_x) => true)).toBe(1)
    })

    itAsync("predicate", async () => {
        const vals = asAsync([1])
        expect(await vals.single((_x) => true)).toBe(1)
    })

    itParallel("predicate", async (asParallel) => {
        const vals = asParallel([1])
        expect(await vals.single((_x) => true)).toBe(1)
    })

    itEnumerable("predicate multiple expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single((_x) => true)).toThrow(InvalidOperationException)
    })

    itEnumerable("predicate no matches expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single((_x) => false)).toThrow(InvalidOperationException)
    })

    itAsync("predicate multiple expection", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((_x) => true))
        expect.toThrow(InvalidOperationException)
    })

    itAsync("predicate no matches expection", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((_x) => false))
        expect.toThrow(InvalidOperationException)
    })

    itParallel("predicate multiple expection", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((_x) => true))
        expect.toThrow(InvalidOperationException)
    })

    itParallel("predicate no matches expection", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((_x) => false))
        expect.toThrow(InvalidOperationException)
    })
})
