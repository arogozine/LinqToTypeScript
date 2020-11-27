import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("skip", () => {
    const vals = [1, 2, 3, 4]
    const valsAsync = asAsync(vals)

    it("String", () => {
        expect("one".skip(1).toArray()).toEqual(["n", "e"])
    })

    itEnumerable("first element", (asEnumerable) =>
        expect(asEnumerable(vals).skip(1).toArray()).toEqual([2, 3, 4]))

    itAsync("first element", async () =>
        expect(await valsAsync.skip(1).toArray()).toEqual([2, 3, 4]))

    itParallel("first element", async (asParallel) => {
        const valsParallel = asParallel(vals)
        expect(await valsParallel.skip(1).toArray()).toEqual([2, 3, 4])
    })

    itEnumerable("first two elements", (asEnumerable) =>
        expect(asEnumerable(vals).skip(0).toArray()).toEqual(vals))

    itAsync("first two elements", async () =>
        expect(await valsAsync.skip(0).toArray()).toEqual(vals))

    itParallel("first two elements", async (asParallel) => {
        const valsParallel = asParallel(vals)
        expect(await valsParallel.skip(0).toArray()).toEqual(vals)
    })

    itEnumerable("negative value", (asEnumerable) =>
        expect(asEnumerable(vals).skip(-9).toArray()).toEqual(vals))

    itAsync("negative value", async () =>
        expect(await valsAsync.skip(-9).toArray()).toEqual(vals))

    itParallel("negative value", async (asParallel) => {
        const valsParallel = asParallel(vals)
        expect(await valsParallel.skip(-9).toArray()).toEqual(vals)
    })
})
