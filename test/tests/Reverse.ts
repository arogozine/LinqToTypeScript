import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("reverse", () => {
    it("String", () => {
        expect("abc".reverse().toArray()).toEqual(["c", "b", "a"])
        expect(typeof "abc".reverse()).toBe("string")
    })

    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3])
        expect(vals.reverse().toArray()).toEqual([3, 2, 1])
    })

    itAsync("basic", async () => {
        const vals = asAsync([1, 2, 3])
        expect(await vals.reverse().toArray()).toEqual([3, 2, 1])
    })

    itParallel("basic", async (asParallel) => {
        const vals = asParallel([1, 2, 3])
        expect(await vals.reverse().toArray()).toEqual([3, 2, 1])
    })

    itEnumerable("empty array still empty", (asEnumerable) =>
        expect(asEnumerable([]).reverse().toArray()).toEqual([]))

    itAsync("empty array still empty", async () =>
        expect(await asAsync([]).reverse().toArray()).toEqual([]))

    itParallel("empty array still empty", async (asParallel) =>
        expect(await asParallel([]).reverse().toArray()).toEqual([]))
})
