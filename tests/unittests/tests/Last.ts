import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("last", () => {
    it("String", () => {
        expect("abc".last()).toEqual("c")
    })

    it("String Empty", () => {
        expect(() => "".last()).toThrow(InvalidOperationException)
    })

    itEnumerable("Last", (asEnumerable) => {
        expect(asEnumerable([1, 2]).last()).toBe(2)
    })

    itAsync("Last", async () => {
        expect(await asAsync([1, 2]).last()).toBe(2)
    })

    itParallel("Last", async (asParallel) => {
        expect(await asParallel([1, 2]).last()).toBe(2)
    })

    itEnumerable("LastEmpty", (asEnumerable) => {
        expect(() => asEnumerable([]).last()).toThrowError(InvalidOperationException)
    })

    itAsync("LastEmpty", async () => {
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

    itAsync("LastPredicate", async () => {
        expect(await asAsync([1, 2]).last((x) => x === 1)).toBe(1)
    })

    itParallel("LastPredicate", async (asParallel) => {
        expect(await asParallel([1, 2]).last((x) => x === 1)).toBe(1)
    })

    itEnumerable("Last Empty With Predicate", (asEnumerable) => {
        expect(() => asEnumerable([]).last((x) => x > 2))
            .toThrowError(InvalidOperationException)
    })

    itAsync("Last Empty With Predicate", async () => {
        const expect = await expectAsync(asAsync([]).last((x) => x > 2))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("Last Empty With Predicate", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).last((x) => x > 2))
        expect.toThrowError(InvalidOperationException)
    })
})
