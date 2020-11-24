import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("lastOrDefault", () => {
    it("String", () => {
        expect("abc".lastOrDefault()).toEqual("c")
    })

    it("String Empty", () => {
        expect("".lastOrDefault()).toBeNull()
    })

    itEnumerable("LastOrDefault", (asEnumerable) => {
        expect(asEnumerable([]).lastOrDefault()).toBeNull()

        expect(asEnumerable([1, 2, 3]).lastOrDefault())
            .toBe(3)
    })

    itAsync("LastOrDefault", async () => {
        expect(await asAsync([]).lastOrDefault()).toBeNull()

        expect(await asAsync([1, 2, 3]).lastOrDefault())
            .toBe(3)
    })

    itParallel("LastOrDefault", async (asParallel) => {
        expect(await asParallel([]).lastOrDefault()).toBeNull()

        expect(await asParallel([1, 2, 3]).lastOrDefault())
            .toBe(3)
    })

    itEnumerable("LastOrDefaultPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()

        expect(asEnumerable([1, 2, 3]).lastOrDefault((x) => x === 3)).toBe(3)
    })

    itAsync("LastOrDefaultPredicate", async () => {
        expect(await asAsync([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()
        expect(await asAsync([1, 2, 3]).lastOrDefault((x) => x === 3)).toBe(3)

    })

    itParallel("LastOrDefaultPredicate", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()
        expect(await asParallel([1, 2, 3]).lastOrDefault((x) => x === 3)).toBe(3)
    })
})
