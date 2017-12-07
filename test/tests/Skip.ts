import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("skip", () => {
    const vals = [1, 2, 3, 4]
    const valsAsync = asAsync(vals)
    const valsParallel = asParallel(vals)

    itEnumerable("first element", (asEnumerable) =>
        expect(asEnumerable(vals).skip(1).toArray()).toEqual([2, 3, 4]))

    itAsync("first element async", async () =>
        expect(await valsAsync.skip(1).toArray()).toEqual([2, 3, 4]))

    itAsync("first element parallel", async () =>
        expect(await valsParallel.skip(1).toArray()).toEqual([2, 3, 4]))

    itEnumerable("first two elements", (asEnumerable) =>
        expect(asEnumerable(vals).skip(0).toArray()).toEqual(vals))

    itAsync("first two elements async", async () =>
        expect(await valsAsync.skip(0).toArray()).toEqual(vals))

    itAsync("first two elements parallel", async () =>
        expect(await valsParallel.skip(0).toArray()).toEqual(vals))

    itEnumerable("negative value", (asEnumerable) =>
        expect(asEnumerable(vals).skip(-9).toArray()).toEqual(vals))

    itAsync("negative value async", async () =>
        expect(await valsAsync.skip(-9).toArray()).toEqual(vals))

    itAsync("negative value parallel", async () =>
        expect(await valsParallel.skip(-9).toArray()).toEqual(vals))
})
