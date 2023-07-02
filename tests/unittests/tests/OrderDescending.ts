import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("orderDescending", () => {
    const unsorted = [9, 8, 7, 6, 5, 5, 4, 3, 9, 1, 0]
    const sorted = [9, 9, 8, 7, 6, 5, 5, 4, 3, 1, 0]

    itEnumerable("Basic", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.orderDescending().toArray()).toEqual(sorted)
    })

    itAsync("Basic", async () => {
        const vals = await asAsync(unsorted).orderDescending().toArray()
        expect(vals).toEqual(sorted)
    })

    itParallel("Basic", async (asParallel) => {
        const vals = await asParallel(unsorted).orderDescending().toArray()
        expect(vals).toEqual(sorted)
    })

    //#region With Comparer

    const comparer = (x: number, y: number) => x - y

    itEnumerable("With Comparer", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.orderDescending(comparer).toArray()).toEqual(sorted)
    })

    itAsync("With Comparer", async () => {
        const vals = await asAsync(unsorted).orderDescending(comparer).toArray()
        expect(vals).toEqual(sorted)
    })

    itParallel("With Comparer", async (asParallel) => {
        const vals = await asParallel(unsorted).orderDescending(comparer).toArray()
        expect(vals).toEqual(sorted)
    })

    //#endregion
})