import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("sumAsync", () => {
    itEnumerableAsync<{ a: number }>("sum Selector", async (asEnumerable) => {
        const zooms = await asEnumerable([ { a: 1}, { a: 2 }, {a: 3} ])
            .sumAsync(async (x) => x.a)
        expect(zooms).toBe(6)
    })

    itAsync("sum Selector Async", async () => {
        const zooms = asAsync([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sumAsync(async (x) => x.a)).toBe(6)
    })

    itParallel<{ a: number }>("sum Selector parallel", async (asParallel) => {
        const zooms = asParallel([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sumAsync(async (x) => x.a)).toBe(6)
    })
})
