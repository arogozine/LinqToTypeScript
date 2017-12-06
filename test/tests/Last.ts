import { InvalidOperationException } from "../../src/index"
import { asAsync, asParallel, expectAsync, itAsync, itEnumerable } from "../TestHelpers"

describe("last", () => {
    itEnumerable("Last", (asEnumerable) => {
        expect(asEnumerable([1, 2]).last()).toBe(2)
    })

    itAsync("LastAsync", async () => {
        expect(await asAsync([1, 2]).last()).toBe(2)
    })

    itAsync("LastParallel", async () => {
        expect(await asParallel([1, 2]).last()).toBe(2)
    })

    itEnumerable("LastEmpty", (asEnumerable) => {
        expect(() => asEnumerable([]).last()).toThrowError(InvalidOperationException)
    })

    itAsync("LastEmptyAsync", async () => {
        const expect = await expectAsync(asAsync([]).last())
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("LastEmptyParallel", async () => {
        const expect = await expectAsync(asParallel([]).last())
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("LastEmptyParallel", async () => {
        const expect = await expectAsync(asParallel([]).last())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("LastPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2]).last((x) => x === 1)).toBe(1)
    })

    itAsync("LastPredicateAsync", async () => {
        expect(await asAsync([1, 2]).last((x) => x === 1)).toBe(1)
    })

    itAsync("LastPredicateParallel", async () => {
        expect(await asParallel([1, 2]).last((x) => x === 1)).toBe(1)
    })
})
