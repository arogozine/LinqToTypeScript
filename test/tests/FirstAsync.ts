import { InvalidOperationException } from "../../src/index"

import { asAsync, expectAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("firstAsync", () => {
    itEnumerableAsync("FirstPredicate", async (asEnumerable) => {
        expect(await asEnumerable([1, 2]).firstAsync(async (x) => x === 2))
        .toBe(2)
    })

    itAsync("FirstPredicate", async () => {
        expect(await asAsync([1, 2]).firstAsync(async (x) => x === 2)).toBe(2)
    })

    itParallel("FirstPredicate", async (asParallel) => {
        expect(await asParallel([1, 2]).firstAsync(async (x) => x === 2)).toBe(2)
    })

    itEnumerableAsync("Empty array with predicate causes exception", async (asEnumerable) => {
        const promise = asEnumerable([1, 2, 3]).firstAsync(async (x) => x === 4)
        const expectExpr = await expectAsync(promise)
        expectExpr.toThrowError(InvalidOperationException)
    })

    itAsync("Empty array with predicate causes exception", async () => {
        const value = await expectAsync(asAsync([1, 2, 3]).firstAsync(async (x) => x === 4))
        value.toThrowError(InvalidOperationException)
    })

    itParallel("Empty array with predicate causes exception", async (asParallel) => {
        const value = await expectAsync(asParallel([1, 2, 3]).firstAsync(async (x) => x === 4))
        value.toThrowError(InvalidOperationException)
    })
})
