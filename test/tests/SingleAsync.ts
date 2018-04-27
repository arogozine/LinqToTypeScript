import { InvalidOperationException } from "../../src/index"
import { asAsync, asPromise, expectAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("singleAsync", () => {
    itEnumerableAsync("predicate", async (asEnumerable) => {
        const vals = asEnumerable([1])
        const expect = await expectAsync(vals.singleAsync((x) => asPromise(true)))
        expect.toBe(1)
    })

    itAsync("predicate async", async () => {
        const vals = asAsync([1])
        expect(await vals.singleAsync((x) => asPromise(true))).toBe(1)
    })

    itParallel("predicate parallel", async (asParallel) => {
        const vals = asParallel([1])
        expect(await vals.singleAsync((x) => asPromise(true))).toBe(1)
    })

    itEnumerableAsync("predicate multiple expection", async (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync((x) => asPromise(true)))
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerableAsync("predicate no matches expection", async (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync((x) => asPromise(false)))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate multiple expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync((x) => asPromise(true)))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync((x) => asPromise(false)))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("predicate multiple expection parallel", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync((x) => asPromise(true)))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("predicate no matches expection parallel", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleAsync((x) => asPromise(false)))
        expect.toThrowError(InvalidOperationException)
    })
})
