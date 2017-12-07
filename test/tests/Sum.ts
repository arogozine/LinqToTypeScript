import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("sum", () => {
    itEnumerable("sum basic", (asEnumerable) => {
        expect(asEnumerable([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itAsync("sum basic async", async () => {
        expect(await asAsync([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itAsync("sum basic parallel", async () => {
        expect(await asParallel([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itEnumerable<{ a: number }>("sum Selector", (asEnumerable) => {
        const zooms = asEnumerable([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(zooms.sum((x) => x.a)).toBe(6)
    })

    itAsync("sum Selector Async", async () => {
        const zooms = asAsync([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sum((x) => x.a)).toBe(6)
    })

    itAsync("sum Selector parallel", async () => {
        const zooms = asParallel([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sum((x) => x.a)).toBe(6)
    })
})
