import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("orderBy", () => {
    const unsorted = [9, 8, 7, 6, 5, 5, 4, 3, 9, 1, 0]
    const sorted = [0, 1, 3, 4, 5, 5, 6, 7, 8, 9, 9]

    itEnumerable<string>("string", (asEnumerable) => {
        const vals = asEnumerable(["b", "c", "a"]).orderBy((x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itAsync("StringAsync", async () => {
        const vals = await asAsync(["b", "c", "a"]).orderBy((x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itParallel<string>("String", async (asParallel) => {
        const vals = await asParallel(["b", "c", "a"]).orderBy((x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.orderBy((x) => x).toArray()).toEqual(sorted)
    })

    itAsync("basicAsync", async () => {
        const vals = asAsync(unsorted)
        expect(await vals.orderBy((x) => x).toArray()).toEqual(sorted)
    })

    itParallel("basic", async (asParallel) => {
        const vals = asParallel(unsorted)
        expect(await vals.orderBy((x) => x).toArray()).toEqual(sorted)
    })

    //#region With Comparer
    const comparer = (x: number, y: number) => x - y

    itEnumerable("With Comparer", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.orderBy((x) => x, comparer).toArray()).toEqual(sorted)
    })

    itAsync("With Comparer Async", async () => {
        const vals = asAsync(unsorted)
        expect(await vals.orderBy((x) => x, comparer).toArray()).toEqual(sorted)
    })

    itParallel("With Comparer", async (asParallel) => {
        const vals = asParallel(unsorted)
        expect(await vals.orderBy((x) => x, comparer).toArray()).toEqual(sorted)
    })

    //#endregion
})
