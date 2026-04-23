import { InvalidOperationException } from "linq-to-typescript"

import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("first", () => {
    it("String", () => {
        expect("abc".first()).toBe("a")
    })

    itEnumerable("Basic", (asEnumerable) =>
        expect(asEnumerable([1]).first()).toBe(1))

    itAsync("Basic", async () =>
        expect(await asAsync([1]).first()).toBe(1))

    itParallel("Basic", async (asParallel) =>
        expect(await asParallel([1]).first()).toBe(1))

    itEnumerable("FirstEmptyException", (asEnumerable) => {
        expect(() => asEnumerable([]).first()).toThrow(InvalidOperationException)
    })

    itAsync("FirstEmptyException", async () => {
        const expect = await expectAsync(asAsync([]).first())
        expect.toThrow(InvalidOperationException)
    })

    itParallel("FirstEmptyException", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).first())
        expect.toThrow(InvalidOperationException)
    })

    itEnumerable("FirstPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itAsync("FirstPredicate", async () => {
        expect(await asAsync([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itParallel("FirstPredicate", async (asParallel) => {
        expect(await asParallel([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itEnumerable("Predicate", (asEnumerable) =>
        expect(asEnumerable([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itAsync("Predicate", async () =>
        expect(await asAsync([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itParallel("Predicate", async (asParallel) =>
        expect(await asParallel([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itEnumerable("Empty array with predicate causes exception", (asEnumerable) =>
        expect(() => asEnumerable([1, 2, 3]).first((x) => x === 4)).toThrow(InvalidOperationException))

    itAsync("Empty array with predicate causes exception", async () => {
        const value = await expectAsync(asAsync([1, 2, 3]).first((x) => x === 4))
        value.toThrow(InvalidOperationException)
    })

    itParallel("Empty array with predicate causes exception", async (asParallel) => {
        const value = await expectAsync(asParallel([1, 2, 3]).first((x) => x === 4))
        value.toThrow(InvalidOperationException)
    })
})
