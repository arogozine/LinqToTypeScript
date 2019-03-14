import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("lastAsync", () => {
    itEnumerableAsync("Basic", async (asEnumerable) => {
        expect(await  asEnumerable([1, 2]).lastAsync(async (x) => x === 1)).toBe(1)
    })

    itAsync("Basic", async () => {
        expect(await asAsync([1, 2]).lastAsync(async (x) => x === 1)).toBe(1)
    })

    itParallel("Basic", async (asParallel) => {
        expect(await asParallel([1, 2]).lastAsync(async (x) => x === 1)).toBe(1)
    })

    itEnumerableAsync("Empty Throws Error", async (asEnumerable) => {
        const expect = await expectAsync(asEnumerable([]).lastAsync(async (x) => x === 1))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("Empty Throws Error", async () => {
        const expect = await expectAsync(asAsync([]).lastAsync(async (x) => x === 1))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("Empty Throws Error", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).lastAsync(async (x) => x === 1))
        expect.toThrowError(InvalidOperationException)
    })
})
