import { EqualityComparer } from "../../src/index"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("contains", () => {
    itEnumerable<string | number>("Countains", (asEnumerable) => {
        const array = asEnumerable([1, "2", "3"])

        expect(array.contains(2)).toBe(false)
        expect(array.contains(1)).toBe(true)
    })

    itAsync("Countains", async () => {
        const array = asAsync([1, "2", "3"])

        expect(await array.contains(2)).toBe(false)
        expect(await array.contains(1)).toBe(true)
    })

    itParallel<string | number>("Countains", async (asParallel) => {
        const array = asParallel([1, "2", "3"])

        expect(await array.contains(2)).toBe(false)
        expect(await array.contains(1)).toBe(true)
    })

    itEnumerable<string | number>("Contains With Comparer", (asEnumerable) => {
        const array = asEnumerable([1, "2", "3"])

        expect(array.contains(2, EqualityComparer)).toBe(true)
        expect(array.contains("2", EqualityComparer)).toBe(true)
        expect(array.contains(4, EqualityComparer)).toBe(false)
    })

    itAsync("Contains With Comparer", async () => {
        const array = asAsync([1, "2", "3"])

        expect(await array.contains(2, EqualityComparer)).toBe(true)
        expect(await array.contains("2", EqualityComparer)).toBe(true)
        expect(await array.contains(4, EqualityComparer)).toBe(false)
    })

    itParallel<string | number>("Contains With Comparer", async (asParallel) => {
        const array = asParallel([1, "2", "3"])

        expect(await array.contains(2, EqualityComparer)).toBe(true)
        expect(await array.contains("2", EqualityComparer)).toBe(true)
        expect(await array.contains(4, EqualityComparer)).toBe(false)
    })

    itEnumerable("contains empty to be false", (asEnumerable) =>
        expect(asEnumerable([] as number[]).contains(0)).toBe(false))

    itAsync("contains empty to be false", async () => {
        const value = await asAsync([] as number[]).contains(0)
        expect(value).toBe(false)
    })

    itParallel("contains empty to be false", async (asParallel) => {
        const value = await asParallel([] as number[]).contains(0)
        expect(value).toBe(false)
    })

    itEnumerable("contains False", (asEnumerable) =>
        expect(asEnumerable([1, 2]).contains(0)).toBe(false))

    itAsync("Contains False", async () =>
        expect(await asAsync([1, 2]).contains(0)).toBe(false))

    itParallel("Contains False", async (asParallel) =>
        expect(await asParallel([1, 2]).contains(0)).toBe(false))

    itEnumerable("contains True", (asEnumerable) =>
        expect(asEnumerable([1, 2]).contains(1)).toBe(true))

    itAsync("Contains True", async () =>
        expect(await asAsync([1, 2]).contains(1)).toBe(true))

    itParallel("Contains True", async (asParallel) =>
        expect(await asParallel([1, 2]).contains(1)).toBe(true))
})
