import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("orderByAsync", () => {

    const unsorted = [9, 8, 7, 6, 5, 5, 4, 3, 9, 1, 0]
    const sorted = [0, 1, 3, 4, 5, 5, 6, 7, 8, 9, 9]

    itEnumerableAsync<string>("string", async (asEnumerable) => {
        const vals = await asEnumerable(["b", "c", "a"]).orderByAsync(async (x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itAsync("StringAsync", async () => {
        const vals = await asAsync(["b", "c", "a"]).orderByAsync(async (x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itParallel<string>("StringParallel", async (asParallel) => {
        const vals = await asParallel(["b", "c", "a"]).orderByAsync(async (x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itEnumerableAsync("basic", async (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(await vals.orderByAsync(async (x) => x).toArray()).toEqual(sorted)
    })

    itAsync("basicAsync", async () => {
        const vals = asAsync(unsorted)
        expect(await vals.orderByAsync(async (x) => x).toArray()).toEqual(sorted)
    })

    itParallel("basicParallel", async (asParallel) => {
        const vals = asParallel(unsorted)
        expect(await vals.orderByAsync(async (x) => x).toArray()).toEqual(sorted)
    })

    //#region With Comparer
    const comparer = (x: number, y: number) => x - y

    itEnumerableAsync("With Comparer Sync", async (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        const orderedValues = await vals.orderByAsync(async (x) => x, comparer).toArray()
        expect(orderedValues).toEqual(sorted)
    })

    itAsync("With Comparer Async", async () => {
        const vals = asAsync(unsorted)
        const orderedValues = await vals.orderByAsync(async (x) => x, comparer).toArray()
        expect(orderedValues).toEqual(sorted)
    })

    itParallel("With Comparer Parallel", async (asParallel) => {
        const vals = asParallel(unsorted)
        const orderedValues = await vals.orderByAsync(async (x) => x, comparer).toArray()
        expect(orderedValues).toEqual(sorted)
    })

    //#endregion
})
