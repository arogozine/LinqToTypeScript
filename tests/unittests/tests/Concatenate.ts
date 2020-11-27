import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("concat", () => {
    itEnumerable("handles two empty arrays", (asEnumerable) =>
        expect(asEnumerable([]).concatenate(asEnumerable([])).toArray()).toEqual([]))

    itAsync("handles two empty arrays", async () => {
        const value = await asAsync([]).concatenate(asAsync([])).toArray()
        expect(value).toEqual([])
    })

    itParallel("handles two empty arrays", async (asParallel) => {
        const value = await asParallel([]).concatenate(asParallel([])).toArray()
        expect(value).toEqual([])
    })

    itEnumerable("handles calling array being empty", (asEnumerable) => {
        expect(asEnumerable([]).concatenate(asEnumerable([1])).toArray())
            .toEqual([1])
    })

    itAsync("handles calling array being empty", async () => {
        const value = await asAsync([] as number[]).concatenate(asAsync([1])).toArray()
        expect(value).toEqual([1])
    })

    itParallel("handles calling array being empty", async (asParallel) => {
        const value = await asParallel([] as number[]).concatenate(asParallel([1])).toArray()
        expect(value).toEqual([1])
    })

    itEnumerable("handles concat with empty array", (asEnumerable) =>
        expect(asEnumerable([2]).concatenate(asEnumerable([])).toArray()).toEqual([2]))

    itAsync("handles concat with empty array", async () => {
        const value = await asAsync([2]).concatenate(asAsync([])).toArray()
        expect(value).toEqual([2])
    })

    itParallel("handles concat with empty array", async (asParallel) => {
        const value = await asParallel([2]).concatenate(asParallel([])).toArray()
        expect(value).toEqual([2])
    })

    itEnumerable("handle two arrays concat", (asEnumerable) =>
        expect(asEnumerable([1]).concatenate(asEnumerable([2, 3])).toArray()).toEqual([1, 2, 3]))

    itAsync("handle two arrays concat", async () => {
        const value = await asAsync([1]).concatenate(asAsync([2, 3])).toArray()
        expect(value).toEqual([1, 2, 3])
    })

    itParallel("handle two arrays concat", async (asParallel) => {
        const value = await asParallel([1]).concatenate(asParallel([2, 3])).toArray()
        expect(value).toEqual([1, 2, 3])
    })
})
