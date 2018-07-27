import { InvalidOperationException } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("last", () => {
    itEnumerable("Last", (asEnumerable) => {
        expect(asEnumerable([1, 2]).last()).toBe(2)
    })

    itAsync("LastAsync", async () => {
        expect(await asAsync([1, 2]).last()).toBe(2)
    })

    itParallel("Last", async (asParallel) => {
        expect(await asParallel([1, 2]).last()).toBe(2)
    })

    itEnumerable("LastEmpty", (asEnumerable) => {
        expect(() => asEnumerable([]).last()).toThrowError(InvalidOperationException)
    })

    itAsync("LastEmptyAsync", async () => {
        const expect = await expectAsync(asAsync([]).last())
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("LastEmpty", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).last())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("LastPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2]).last((x) => x === 1)).toBe(1)
    })

    itAsync("LastPredicateAsync", async () => {
        expect(await asAsync([1, 2]).last((x) => x === 1)).toBe(1)
    })

    itParallel("LastPredicate", async (asParallel) => {
        expect(await asParallel([1, 2]).last((x) => x === 1)).toBe(1)
    })
})
