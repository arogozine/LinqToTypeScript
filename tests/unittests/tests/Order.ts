import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("order", () => {
    const unsorted = [9, 8, 7, 6, 5, 5, 4, 3, 9, 1, 0]
    const sorted = [0, 1, 3, 4, 5, 5, 6, 7, 8, 9, 9]

    itEnumerable<string>("string", (asEnumerable) => {
        const vals = asEnumerable(["b", "c", "a"]).order().toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itAsync("string", async () => {
        const vals = await asAsync(["b", "c", "a"]).order().toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itParallel<string>("string", async (asParallel) => {
        const vals = await asParallel(["b", "c", "a"]).order().toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.order().toArray()).toEqual(sorted)
    })

    itAsync("basic", async () => {
        const vals = await asAsync(unsorted).order().toArray()
        expect(vals).toEqual(sorted)
    })

    itParallel("basic", async (asParallel) => {
        const vals = await asParallel(unsorted).order().toArray()
        expect(vals).toEqual(sorted)
    })

    //#region With Comparer
    
    const comparer = (x: number, y: number) => x - y

    itEnumerable("With Comparer", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.order(comparer).toArray()).toEqual(sorted)
    })

    itAsync("With Comparer", async () => {
        const vals = await asAsync(unsorted).order(comparer).toArray()
        expect(vals).toEqual(sorted)
    })

    itParallel("With Comparer", async (asParallel) => {
        const vals = await asParallel(unsorted).order(comparer).toArray()
        expect(vals).toEqual(sorted)
    })

    //#endregion
})