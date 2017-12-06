import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("takeWhile", () => {
    const vals = [1, 2, 3, 4]

    itEnumerable("by value", (asEnumerable) => {
        expect(asEnumerable(vals).takeWhile((x) => true).toArray()).toEqual(vals)
        expect(asEnumerable(vals).takeWhile((x) => false).toArray()).toEqual([])
        expect(asEnumerable(vals).takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    itEnumerable("by value and index", (asEnumerable) => {
        expect(asEnumerable(vals).takeWhile((x: number, i: number) => true).toArray()).toEqual(vals)
        expect(asEnumerable(vals).takeWhile((x: number, i: number) => false).toArray()).toEqual([])
        expect(asEnumerable(vals).takeWhile((x: number, i: number) => x !== 3).toArray()).toEqual([1, 2])
    })

    const valsAsync = asAsync([1, 2, 3, 4])

    itAsync("by value async", async () => {
        expect(await valsAsync.takeWhile((x) => true).toArray()).toEqual(vals)
        expect(await valsAsync.takeWhile((x) => false).toArray()).toEqual([])
        expect(await valsAsync.takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    itAsync("by value and index async", async () => {
        expect(await valsAsync.takeWhile((x: number, i: number) => true).toArray()).toEqual(vals)
        expect(await valsAsync.takeWhile((x: number, i: number) => false).toArray()).toEqual([])
        expect(await valsAsync.takeWhile((x: number, i: number) => x !== 3).toArray()).toEqual([1, 2])
    })

    const valsParallel = asParallel([1, 2, 3, 4])

    itAsync("by value parallel", async () => {
        expect(await valsParallel.takeWhile((x) => true).toArray()).toEqual(vals)
        expect(await valsParallel.takeWhile((x) => false).toArray()).toEqual([])
        expect(await valsParallel.takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    itAsync("by value and index parallel", async () => {
        expect(await valsParallel.takeWhile((x: number, i: number) => true).toArray()).toEqual(vals)
        expect(await valsParallel.takeWhile((x: number, i: number) => false).toArray()).toEqual([])
        expect(await valsParallel.takeWhile((x: number, i: number) => x !== 3).toArray()).toEqual([1, 2])
    })
})
