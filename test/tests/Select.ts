import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

// tslint:disable:variable-name

describe("select", () => {
    it("String", () => {
        expect("abc".select(x => `div_${x}`).toArray()).toEqual([ "div_a", "div_b", "div_c" ])
    })

    it("String Index", () => {
        expect("abc".select((_, i) => `div_${i}`).toArray()).toEqual([ "div_0", "div_1", "div_2" ])
    })

    itEnumerable<string>("select parseInt", (asEnumerable) => {
        expect(asEnumerable(["1", "2", "3"]).select((num) => Number.parseInt(num, undefined))
            .toArray()).toEqual([1, 2, 3])

        expect(asEnumerable(["1", "2", "3"]).select((num, _index) => Number.parseInt(num, undefined))
            .toArray()).toEqual([1, 2, 3])
    })

    itAsync("select parseInt", async () => {
        expect(await asAsync(["1", "2", "3"]).select((num) => Number.parseInt(num, undefined))
            .toArray()).toEqual([1, 2, 3])

        expect(await asAsync(["1", "2", "3"]).select((num, _index) => Number.parseInt(num, undefined))
            .toArray()).toEqual([1, 2, 3])
    })

    itParallel<string>("select parseInt", async (asParallel) => {
        expect(await asParallel(["1", "2", "3"]).select((num) => Number.parseInt(num, undefined))
            .toArray()).toEqual([1, 2, 3])

        expect(await asParallel(["1", "2", "3"]).select((num, _index) => Number.parseInt(num, undefined))
            .toArray()).toEqual([1, 2, 3])
    })

    itEnumerable<string>("select length", (asEnumerable) => {
        expect(asEnumerable(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })

    itAsync("select length", async () => {
        expect(await asAsync(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })

    itParallel<string>("select length", async (asParallel) => {
        expect(await asParallel(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })

    itEnumerable("proper index", (asEnumerable) => {
        const indexArray = asEnumerable([2, 1, 0]).select((_, index) => index).toArray()
        expect(indexArray).toEqual([0, 1, 2])
    })

    itAsync("proper index", async () => {
        const indexArray = await asAsync([2, 1, 0]).select((_, index) => index).toArray()
        expect(indexArray).toEqual([0, 1, 2])
    })

    itParallel("proper index", async (asParallel) => {
        const indexArray = await asParallel([2, 1, 0]).select((_, index) => index).toArray()
        expect(indexArray).toEqual([0, 1, 2])
    })
})
