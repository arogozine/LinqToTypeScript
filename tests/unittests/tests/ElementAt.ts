import { ArgumentOutOfRangeException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("elementAt", () => {
    it("String", () => {
        expect("abc".elementAt(0)).toBe("a")
        expect("abc".elementAt(1)).toBe("b")
        expect("abc".elementAt(2)).toBe("c")

        expect(() => "abc".elementAt(3)).toThrowError(ArgumentOutOfRangeException)
    })

    itEnumerable("Basic", (asEnumerable) => {
        expect(asEnumerable([1]).elementAt(0)).toBe(1)
        expect(asEnumerable([1, 2]).elementAt(1)).toBe(2)
    })

    itAsync("Basic", async () => {
        expect(await asAsync([1]).elementAt(0)).toBe(1)
        expect(await asAsync([1, 2]).elementAt(1)).toBe(2)
    })

    itParallel("Basic", async (asParallel) => {
        expect(await asParallel([1]).elementAt(0)).toBe(1)
        expect(await asParallel([1, 2]).elementAt(1)).toBe(2)
    })

    itEnumerable("empty array throws exception", (asEnumerable) =>
        expect(() => asEnumerable([]).elementAt(0)).toThrowError(ArgumentOutOfRangeException))

    itAsync("empty array throws exception", async () => {
        const expect = await expectAsync(asAsync([]).elementAt(0))
        expect.toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("empty array throws exception", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).elementAt(0))
        expect.toThrowError(ArgumentOutOfRangeException)
    })

    itEnumerable("negative index throws exception", (asEnumerable) => {
        expect(() => asEnumerable([1, 2]).elementAt(-1)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("negative index throws exception", async () => {
        const expect = await expectAsync(asAsync([1, 2]).elementAt(-1))
        expect.toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("negative index throws exception", async (asParallel) => {
        const expect = await expectAsync(asParallel([1, 2]).elementAt(-1))
        expect.toThrowError(ArgumentOutOfRangeException)
    })
})
