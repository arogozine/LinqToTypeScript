import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("reverse", () => {
    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3])
        expect(vals.reverse().toArray()).toEqual([3, 2, 1])
    })

    itAsync("basicAsync", async () => {
        const vals = asAsync([1, 2, 3])
        expect(await vals.reverse().toArray()).toEqual([3, 2, 1])
    })

    itParallel("basic", async (asParallel) => {
        const vals = asParallel([1, 2, 3])
        expect(await vals.reverse().toArray()).toEqual([3, 2, 1])
    })

    it("empty array still empty", () =>
        expect([].reverse()).toEqual([]))

    itAsync("empty array still empty async", async () =>
        expect(await asAsync([]).reverse().toArray()).toEqual([]))

    itParallel("empty array still empty", async (asParallel) =>
        expect(await asParallel([]).reverse().toArray()).toEqual([]))
})
