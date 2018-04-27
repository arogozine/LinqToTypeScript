import { InvalidOperationException } from "../../src/index"

import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("first", () => {
    itEnumerable("FirstEmptyException", (asEnumerable) => {
        expect(() => asEnumerable([]).first()).toThrowError(InvalidOperationException)
    })

    itAsync("FirstEmptyExceptionAsync", async () => {
        const expect = await expectAsync(asAsync([]).first())
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("FirstEmptyExceptionParallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).first())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("FirstPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itAsync("FirstPredicateAsync", async () => {
        expect(await asAsync([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itParallel("FirstPredicateParallel", async (asParallel) => {
        expect(await asParallel([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itEnumerable("basic", (asEnumerable) =>
        expect(asEnumerable([1]).first()).toBe(1))

    itAsync("BasicAsync", async () =>
        expect(await asAsync([1]).first()).toBe(1))

    itParallel("BasicParallel", async (asParallel) =>
        expect(await asParallel([1]).first()).toBe(1))

    itEnumerable("predicate", (asEnumerable) =>
        expect(asEnumerable([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itAsync("PredicateAsync", async () =>
        expect(await asAsync([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itParallel("PredicateParallel", async (asParallel) =>
        expect(await asParallel([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itEnumerable("empty array with predicate causes exception", (asEnumerable) =>
        expect(() => asEnumerable([1, 2, 3]).first((x) => x === 4)).toThrowError(InvalidOperationException))

    itAsync("empty array with predicate causes exception async", async () => {
        const value = await expectAsync(asAsync([1, 2, 3]).first((x) => x === 4))
        value.toThrowError(InvalidOperationException)
    })

    itParallel("empty array with predicate causes exception parallel", async (asParallel) => {
        const value = await expectAsync(asParallel([1, 2, 3]).first((x) => x === 4))
        value.toThrowError(InvalidOperationException)
    })
})
