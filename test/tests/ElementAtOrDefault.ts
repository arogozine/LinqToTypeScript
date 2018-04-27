import { ArgumentOutOfRangeException, ArrayEnumerable } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("elementAtOrDefault", () => {

    it("ArrayEnumerable", () => {
        const arrayEnum = new ArrayEnumerable(1, 2, 3)
        for (const val of arrayEnum) {
            expect(val).toBeDefined()
        }
    })

    itEnumerable("with elements", (asEnumerable) => {
        expect(asEnumerable([1]).elementAtOrDefault(0)).toBe(1)
        expect(asEnumerable([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itAsync("WithElementsAsync", async () => {
        expect(await asAsync([1]).elementAtOrDefault(0)).toBe(1)
        expect(await asAsync([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itParallel("WithElementsParallel", async (asParallel) => {
        expect(await asParallel([1]).elementAtOrDefault(0)).toBe(1)
        expect(await asParallel([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itEnumerable("empty to be null", (asEnumerable) =>
        expect(asEnumerable([]).elementAtOrDefault(0)).toBeNull())

    itAsync("empty to be null async", async () => {
        const expect = await expectAsync(asAsync([]).elementAtOrDefault(0))
        expect.toBeNull()
    })

    itParallel("empty to be null parallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).elementAtOrDefault(0))
        expect.toBeNull()
    })
})
