import { asAsync, expectAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("firstAsync", () => {
    itEnumerableAsync("FirstPredicate", async (asEnumerable) => {
        expect(await asEnumerable([1, 2]).firstOrDefaultAsync(async (x) => x === 2))
        .toBe(2)
    })

    itAsync("FirstPredicate", async () => {
        expect(await asAsync([1, 2]).firstOrDefaultAsync(async (x) => x === 2)).toBe(2)
    })

    itParallel("FirstPredicate", async (asParallel) => {
        expect(await asParallel([1, 2]).firstOrDefaultAsync(async (x) => x === 2)).toBe(2)
    })

    itEnumerableAsync("empty array with predicate causes exception", async (asEnumerable) => {
        const promise = asEnumerable([1, 2, 3]).firstOrDefaultAsync(async (x) => x === 4)
        const expectExpr = await expectAsync(promise)
        expectExpr.toBeNull()
    })

    itAsync("empty array with predicate causes exception", async () => {
        const value = await expectAsync(asAsync([1, 2, 3]).firstOrDefaultAsync(async (x) => x === 4))
        value.toBeNull()
    })

    itParallel("empty array with predicate causes exception", async (asParallel) => {
        const value = await expectAsync(asParallel([1, 2, 3]).firstOrDefaultAsync(async (x) => x === 4))
        value.toBeNull()
    })
})
