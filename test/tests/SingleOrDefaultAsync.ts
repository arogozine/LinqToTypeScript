import { InvalidOperationException } from "../../src/index"
import { asAsync, asPromise, expectAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("singleOrDefault", () => {

    itEnumerableAsync("predicate", async (asEnumerable) => {
        const vals = asEnumerable([1])
        const expectResult = await expectAsync(vals.singleOrDefaultAsync((x) => asPromise(true)))
        expectResult.toBe(1)
    })

    itAsync("predicate async", async () => {
        const vals = asAsync([1])
        expect(await vals.singleOrDefaultAsync((x) => asPromise(true))).toBe(1)
    })

    itParallel("predicate parallel", async (asParallel) => {
        const vals = asParallel([1])
        expect(await vals.singleOrDefaultAsync((x) => asPromise(true))).toBe(1)
    })

    itEnumerableAsync("predicate multiple exception", async (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        const expectException = await expectAsync(vals.singleOrDefaultAsync((x) => asPromise(true)))
        expectException.toThrowError(InvalidOperationException)
    })

    itEnumerableAsync("predicate no matches exception", async (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(await vals.singleOrDefaultAsync((x) => asPromise(false))).toBeNull()
    })

    itAsync("predicate multiple expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefaultAsync((x) => asPromise(true)))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches null async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        expect(await vals.singleOrDefaultAsync((x) => asPromise(false))).toBeNull()
    })

    itParallel("predicate multiple expection parallel", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefaultAsync((x) => asPromise(true)))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("predicate no matches null parallel", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4])
        expect(await vals.singleOrDefaultAsync((x) => asPromise(false))).toBeNull()
    })
})
