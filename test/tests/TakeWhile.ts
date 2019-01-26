import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

// tslint:disable:variable-name

describe("takeWhile", () => {
    const vals = [1, 2, 3, 4]

    itEnumerable("by value", (asEnumerable) => {
        expect(asEnumerable(vals).takeWhile((_x) => true).toArray()).toEqual(vals)
        expect(asEnumerable(vals).takeWhile((_x) => false).toArray()).toEqual([])
        expect(asEnumerable(vals).takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    itEnumerable("by value and index", (asEnumerable) => {
        expect(asEnumerable(vals).takeWhile((_x: number, _i: number) => true).toArray()).toEqual(vals)
        expect(asEnumerable(vals).takeWhile((_x: number, _i: number) => false).toArray()).toEqual([])
        expect(asEnumerable(vals).takeWhile((x: number, _i: number) => x !== 3).toArray()).toEqual([1, 2])
    })

    const valsAsync = asAsync([1, 2, 3, 4])

    itAsync("by value", async () => {
        expect(await valsAsync.takeWhile((_x) => true).toArray()).toEqual(vals)
        expect(await valsAsync.takeWhile((_x) => false).toArray()).toEqual([])
        expect(await valsAsync.takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    itAsync("by value and index", async () => {
        expect(await valsAsync.takeWhile((_x: number, _i: number) => true).toArray()).toEqual(vals)
        expect(await valsAsync.takeWhile((_x: number, _i: number) => false).toArray()).toEqual([])
        expect(await valsAsync.takeWhile((x: number, _i: number) => x !== 3).toArray()).toEqual([1, 2])
    })

    itParallel("by value", async (asParallel) => {
        const valsParallel = asParallel([1, 2, 3, 4])
        expect(await valsParallel.takeWhile((_x) => true).toArray()).toEqual(vals)
        expect(await valsParallel.takeWhile((_x) => false).toArray()).toEqual([])
        expect(await valsParallel.takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    itParallel("by value and index", async (asParallel) => {
        const valsParallel = asParallel([1, 2, 3, 4])
        expect(await valsParallel.takeWhile((_x: number, _i: number) => true).toArray()).toEqual(vals)
        expect(await valsParallel.takeWhile((_x: number, _i: number) => false).toArray()).toEqual([])
        expect(await valsParallel.takeWhile((x: number, _i: number) => x !== 3).toArray()).toEqual([1, 2])
    })
})
