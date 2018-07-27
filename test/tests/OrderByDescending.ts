import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("orderByDescending", () => {
    const unsorted = [9, 8, 7, 6, 5, 5, 4, 3, 9, 1, 0]
    const sorted = [9, 9, 8, 7, 6, 5, 5, 4, 3, 1, 0]

    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.orderByDescending((x) => x).toArray()).toEqual(sorted)
    })

    itAsync("BasicAsync", async () => {
        const vals = asAsync(unsorted)
        expect(await vals.orderByDescending((x) => x).toArray())
            .toEqual(sorted)
    })

    itParallel("Basic", async (asParallel) => {
        const vals = asParallel(unsorted)
        expect(await vals.orderByDescending((x) => x).toArray())
            .toEqual(sorted)
    })

    //#region With Comparer

    const comparer = (x: number, y: number) => x - y

    itEnumerable("With Comparer Sync", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.orderByDescending((x) => x, comparer).toArray()).toEqual(sorted)
    })

    itAsync("With Comparer Async", async () => {
        const vals = asAsync(unsorted)
        expect(await vals.orderByDescending((x) => x, comparer).toArray())
            .toEqual(sorted)
    })

    itParallel("With Comparer", async (asParallel) => {
        const vals = asParallel(unsorted)
        expect(await vals.orderByDescending((x) => x, comparer).toArray())
            .toEqual(sorted)
    })

    //#endregion
})
