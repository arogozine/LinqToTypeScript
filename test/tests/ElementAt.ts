import { ArgumentOutOfRangeException, AsyncEnumerable } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("elementAt", () => {
    itEnumerable("Basic", (asEnumerable) => {
        expect(asEnumerable([1]).elementAt(0)).toBe(1)
        expect(asEnumerable([1, 2]).elementAt(1)).toBe(2)
    })

    itAsync("BasicAsync", async () => {
        expect(await asAsync([1]).elementAt(0)).toBe(1)
        expect(await asAsync([1, 2]).elementAt(1)).toBe(2)
    })

    itParallel("BasicParallel", async (asParallel) => {
        expect(await asParallel([1]).elementAt(0)).toBe(1)
        expect(await asParallel([1, 2]).elementAt(1)).toBe(2)
    })

    itEnumerable("empty array throws exception", (asEnumerable) =>
        expect(() => asEnumerable([]).elementAt(0)).toThrowError(ArgumentOutOfRangeException))

    itAsync("empty array throws exception async", async () => {
        const expect = await expectAsync(asAsync([]).elementAt(0))
        expect.toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("empty array throws exception parallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).elementAt(0))
        expect.toThrowError(ArgumentOutOfRangeException)
    })

    itEnumerable("negative index throws exception", (asEnumerable) => {
        expect(() => asEnumerable([1, 2]).elementAt(-1)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("negative index throws exception Async", async () => {
        const expect = await expectAsync(asAsync([1, 2]).elementAt(-1))
        expect.toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("negative index throws exception Parallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([1, 2]).elementAt(-1))
        expect.toThrowError(ArgumentOutOfRangeException)
    })
})
