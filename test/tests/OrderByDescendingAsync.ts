import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("orderByDescendingAsync", () => {
    const unsorted = [9, 8, 7, 6, 5, 5, 4, 3, 9, 1, 0]
    const sorted = [9, 9, 8, 7, 6, 5, 5, 4, 3, 1, 0]

    itEnumerableAsync("basic", async (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        const sortedValues = await vals.orderByDescendingAsync(async (x) => x).toArray()
        expect(sortedValues).toEqual(sorted)
    })

    itAsync("BasicAsync", async () => {
        const vals = asAsync(unsorted)
        const sortedValues = await vals.orderByDescendingAsync(async (x) => x).toArray()
        expect(sortedValues).toEqual(sorted)
    })

    itParallel("Basic", async (asParallel) => {
        const vals = asParallel(unsorted)
        const sortedValues = await vals.orderByDescendingAsync(async (x) => x).toArray()
        expect(sortedValues).toEqual(sorted)
    })

    //#region With Comparer

    const comparer = (x: number, y: number) => x - y

    itEnumerableAsync("With Comparer Sync", async (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        const sortedValues = await vals.orderByDescendingAsync(async (x) => x, comparer).toArray()
        expect(sortedValues).toEqual(sorted)
    })

    itAsync("With Comparer Async", async () => {
        const vals = asAsync(unsorted)
        const sortedValues = await vals.orderByDescendingAsync(async (x) => x, comparer).toArray()
        expect(sortedValues).toEqual(sorted)
    })

    itParallel("With Comparer", async (asParallel) => {
        const vals = asParallel(unsorted)
        const sortedValues = await vals.orderByDescendingAsync(async (x) => x, comparer).toArray()
        expect(sortedValues).toEqual(sorted)
    })

    //#endregion
})
