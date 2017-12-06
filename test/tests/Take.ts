import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers";

describe("take", () => {
    itEnumerable("Take", (asEnumerable) => {
        const array = asEnumerable([1, 2, 3, 4, 5]).take(2).toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("TakeAsync", async () => {
        const array = await asAsync([1, 2, 3, 4, 5]).take(2).toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("TakeParallel", async () => {
        const array = await asParallel([1, 2, 3, 4, 5]).take(2).toArray()

        expect(array).toEqual([1, 2])
    })

    const vals = [1, 2, 3, 4]
    const valsAsync = asAsync(vals)
    const valsParallel = asParallel(vals)

    itEnumerable("various positive amounts", (asEnumerable) => {
        expect(asEnumerable(vals).take(4).toArray()).toEqual(vals)
        expect(asEnumerable(vals).take(1).toArray()).toEqual([1])
        expect(asEnumerable(vals).take(2).toArray()).toEqual([1, 2])
    })

    itAsync("various positive amounts async", async () => {
        expect(await valsAsync.take(4).toArray()).toEqual(vals)
        expect(await valsAsync.take(1).toArray()).toEqual([1])
        expect(await valsAsync.take(2).toArray()).toEqual([1, 2])
    })

    itAsync("various positive amounts parallel", async () => {
        expect(await valsParallel.take(4).toArray()).toEqual(vals)
        expect(await valsParallel.take(1).toArray()).toEqual([1])
        expect(await valsParallel.take(2).toArray()).toEqual([1, 2])
    })

    itEnumerable("zero elements", (asEnumerable) =>
        expect(asEnumerable(vals).take(0).toArray()).toEqual([]))

    itAsync("zero elements async", async () =>
        expect(await valsAsync.take(0).toArray()).toEqual([]))

    itAsync("zero elements async", async () =>
        expect(await valsParallel.take(0).toArray()).toEqual([]))

    itEnumerable("negative amount", (asEnumerable) =>
        expect(asEnumerable(vals).take(-1).toArray()).toEqual([]))

    itAsync("negative amount async", async () =>
        expect(await valsAsync.take(-1).toArray()).toEqual([]))

    itAsync("negative amount parallel", async () =>
        expect(await valsParallel.take(-1).toArray()).toEqual([]))
})
