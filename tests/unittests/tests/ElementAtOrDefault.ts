import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("elementAtOrDefault", () => {

    it("String", () => {
        expect("abc".elementAtOrDefault(0)).toBe("a")
        expect("abc".elementAtOrDefault(1)).toBe("b")
        expect("abc".elementAtOrDefault(2)).toBe("c")

        expect("abc".elementAtOrDefault(3)).toBeNull()
    })

    itEnumerable("WithElements", (asEnumerable) => {
        expect(asEnumerable([1]).elementAtOrDefault(0)).toBe(1)
        expect(asEnumerable([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itAsync("WithElements", async () => {
        expect(await asAsync([1]).elementAtOrDefault(0)).toBe(1)
        expect(await asAsync([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itParallel("WithElements", async (asParallel) => {
        expect(await asParallel([1]).elementAtOrDefault(0)).toBe(1)
        expect(await asParallel([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itEnumerable("Empty to be null", (asEnumerable) =>
        expect(asEnumerable([]).elementAtOrDefault(0)).toBeNull())

    itAsync("Empty to be null", async () => {
        const expect = await expectAsync(asAsync([]).elementAtOrDefault(0))
        expect.toBeNull()
    })

    itParallel("Empty to be null", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).elementAtOrDefault(0))
        expect.toBeNull()
    })
})
