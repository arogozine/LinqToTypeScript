import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("sum", () => {
    itEnumerable("sum basic", (asEnumerable) => {
        expect(asEnumerable([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itAsync("sum basic", async () => {
        expect(await asAsync([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itParallel("sum basic", async (asParallel) => {
        expect(await asParallel([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itEnumerable<{ a: number }>("sum Selector", (asEnumerable) => {
        const zooms = asEnumerable([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(zooms.sum((x) => x.a)).toBe(6)
    })

    itAsync("sum Selector", async () => {
        const zooms = asAsync([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sum((x) => x.a)).toBe(6)
    })

    itParallel<{ a: number }>("sum Selector", async (asParallel) => {
        const zooms = asParallel([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sum((x) => x.a)).toBe(6)
    })
})
