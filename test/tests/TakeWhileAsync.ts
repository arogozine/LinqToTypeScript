import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("takeWhileAsync", () => {
    const vals = [1, 2, 3, 4]

    itEnumerableAsync("by value", async (asEnumerable) => {
        expect(await asEnumerable(vals).takeWhileAsync(async (x) => true).toArray())
            .toEqual(vals)
        expect(await asEnumerable(vals).takeWhileAsync(async (x) => false).toArray())
            .toEqual([])
        expect(await asEnumerable(vals).takeWhileAsync(async (x) => x !== 3).toArray())
            .toEqual([1, 2])
    })

    itEnumerableAsync("by value and index", async (asEnumerable) => {
        expect(await asEnumerable(vals).takeWhileAsync(async (x: number, i: number) => true).toArray())
            .toEqual(vals)
        expect(await asEnumerable(vals).takeWhileAsync(async (x: number, i: number) => false).toArray())
            .toEqual([])
        expect(await asEnumerable(vals).takeWhileAsync(async (x: number, i: number) => x !== 3).toArray())
            .toEqual([1, 2])
    })

    const valsAsync = asAsync([1, 2, 3, 4])

    itAsync("by value", async () => {
        expect(await valsAsync.takeWhileAsync(async (x) => true).toArray())
            .toEqual(vals)
        expect(await valsAsync.takeWhileAsync(async (x) => false).toArray())
            .toEqual([])
        expect(await valsAsync.takeWhileAsync(async (x) => x !== 3).toArray())
            .toEqual([1, 2])
    })

    itAsync("by value and index", async () => {
        expect(await valsAsync.takeWhileAsync(async (x: number, i: number) => true).toArray())
            .toEqual(vals)
        expect(await valsAsync.takeWhileAsync(async (x: number, i: number) => false).toArray())
            .toEqual([])
        expect(await valsAsync.takeWhileAsync(async (x: number, i: number) => x !== 3).toArray())
            .toEqual([1, 2])
    })

    itParallel("by value", async (asParallel) => {
        const valsParallel = asParallel([1, 2, 3, 4])

        expect(await valsParallel.takeWhileAsync(async (x) => true).toArray())
            .toEqual(vals)
        expect(await valsParallel.takeWhileAsync(async (x) => false).toArray())
            .toEqual([])
        expect(await valsParallel.takeWhileAsync(async (x) => x !== 3).toArray())
            .toEqual([1, 2])
    })

    itParallel("by value and index", async (asParallel) => {
        const valsParallel = asParallel([1, 2, 3, 4])

        expect(await valsParallel.takeWhileAsync(async (x: number, i: number) => true).toArray())
            .toEqual(vals)
        expect(await valsParallel.takeWhileAsync(async (x: number, i: number) => false).toArray())
            .toEqual([])
        expect(await valsParallel.takeWhileAsync(async (x: number, i: number) => x !== 3).toArray())
            .toEqual([1, 2])
    })
})
