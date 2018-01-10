import { InvalidOperationException } from "../../src/index"

import { asAsync, asParallel, asPromise, expectAsync, itAsync, itEnumerableAsync } from "../TestHelpers"

describe("firstAsync", () => {
    itEnumerableAsync("FirstPredicate", async (asEnumerable) => {
        expect(await asEnumerable([1, 2]).firstOrDefaultAsync((x) => asPromise(x === 2)))
        .toBe(2)
    })

    itAsync("FirstPredicateAsync", async () => {
        expect(await asAsync([1, 2]).firstOrDefaultAsync((x) => asPromise(x === 2))).toBe(2)
    })

    itAsync("FirstPredicateParallel", async () => {
        expect(await asParallel([1, 2]).firstOrDefaultAsync((x) => asPromise(x === 2))).toBe(2)
    })

    itEnumerableAsync("empty array with predicate causes exception", async (asEnumerable) => {
        const promise = asEnumerable([1, 2, 3]).firstOrDefaultAsync((x) => asPromise(x === 4))
        const expectExpr = await expectAsync(promise)
        expectExpr.toBeNull()
    })

    itAsync("empty array with predicate causes exception async", async () => {
        const value = await expectAsync(asAsync([1, 2, 3]).firstOrDefaultAsync((x) => asPromise(x === 4)))
        value.toBeNull()
    })

    itAsync("empty array with predicate causes exception parallel", async () => {
        const value = await expectAsync(asParallel([1, 2, 3]).firstOrDefaultAsync((x) => asPromise(x === 4)))
        value.toBeNull()
    })
})
