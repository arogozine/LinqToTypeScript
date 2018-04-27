import { asAsync, asPromise, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("takeWhileAsync", () => {
    const vals = [1, 2, 3, 4]

    itEnumerableAsync("by value", async (asEnumerable) => {
        expect(await asEnumerable(vals).takeWhileAsync((x) => asPromise(true)).toArray())
            .toEqual(vals)
        expect(await asEnumerable(vals).takeWhileAsync((x) => asPromise(false)).toArray())
            .toEqual([])
        expect(await asEnumerable(vals).takeWhileAsync((x) => asPromise(x !== 3)).toArray())
            .toEqual([1, 2])
    })

    itEnumerableAsync("by value and index", async (asEnumerable) => {
        expect(await asEnumerable(vals).takeWhileAsync((x: number, i: number) => asPromise(true)).toArray())
            .toEqual(vals)
        expect(await asEnumerable(vals).takeWhileAsync((x: number, i: number) => asPromise(false)).toArray())
            .toEqual([])
        expect(await asEnumerable(vals).takeWhileAsync((x: number, i: number) => asPromise(x !== 3)).toArray())
            .toEqual([1, 2])
    })

    const valsAsync = asAsync([1, 2, 3, 4])

    itAsync("by value async", async () => {
        expect(await valsAsync.takeWhileAsync((x) => asPromise(true)).toArray())
            .toEqual(vals)
        expect(await valsAsync.takeWhileAsync((x) => asPromise(false)).toArray())
            .toEqual([])
        expect(await valsAsync.takeWhileAsync((x) => asPromise(x !== 3)).toArray())
            .toEqual([1, 2])
    })

    itAsync("by value and index async", async () => {
        expect(await valsAsync.takeWhileAsync((x: number, i: number) => asPromise(true)).toArray())
            .toEqual(vals)
        expect(await valsAsync.takeWhileAsync((x: number, i: number) => asPromise(false)).toArray())
            .toEqual([])
        expect(await valsAsync.takeWhileAsync((x: number, i: number) => asPromise(x !== 3)).toArray())
            .toEqual([1, 2])
    })

    itParallel("by value parallel", async (asParallel) => {
        const valsParallel = asParallel([1, 2, 3, 4])

        expect(await valsParallel.takeWhileAsync((x) => asPromise(true)).toArray())
            .toEqual(vals)
        expect(await valsParallel.takeWhileAsync((x) => asPromise(false)).toArray())
            .toEqual([])
        expect(await valsParallel.takeWhileAsync((x) => asPromise(x !== 3)).toArray())
            .toEqual([1, 2])
    })

    itParallel("by value and index parallel", async (asParallel) => {
        const valsParallel = asParallel([1, 2, 3, 4])

        expect(await valsParallel.takeWhileAsync((x: number, i: number) => asPromise(true)).toArray())
            .toEqual(vals)
        expect(await valsParallel.takeWhileAsync((x: number, i: number) => asPromise(false)).toArray())
            .toEqual([])
        expect(await valsParallel.takeWhileAsync((x: number, i: number) => asPromise(x !== 3)).toArray())
            .toEqual([1, 2])
    })
})
