import { InvalidOperationException } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("singleAsync", () => {
    itEnumerableAsync("predicate", async (asEnumerable) => {
        const vals = asEnumerable([1])
        const expect = await expectAsync(vals.singleAsync(async (x) => true))
        expect.toBe(1)
    })

    itAsync("predicate async", async () => {
        const vals = asAsync([1])
        expect(await vals.singleAsync(async (x) => true)).toBe(1)
    })

    itParallel("predicate", async (asParallel) => {
        const vals = asParallel([1])
        expect(await vals.singleAsync(async (x) => true)).toBe(1)
    })

    itEnumerableAsync("predicate multiple expection", async (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync(async (x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerableAsync("predicate no matches expection", async (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync(async (x) => false))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate multiple expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync(async (x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync(async (x) => false))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("predicate multiple expection", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync(async (x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("predicate no matches expection", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync(async (x) => false))
        expect.toThrowError(InvalidOperationException)
    })
})
