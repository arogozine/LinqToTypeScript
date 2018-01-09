import { asAsync, asParallel, asPromise, itAsync, itEnumerableAsync } from "../TestHelpers"

describe("sumAsync", () => {
    itEnumerableAsync<{ a: number }>("sum Selector", async (asEnumerable) => {
        const zooms = await asEnumerable([ { a: 1}, { a: 2 }, {a: 3} ])
            .sumAsync((x) => asPromise(x.a))
        expect(zooms).toBe(6)
    })

    itAsync("sum Selector Async", async () => {
        const zooms = asAsync([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sumAsync((x) => asPromise(x.a))).toBe(6)
    })

    itAsync("sum Selector parallel", async () => {
        const zooms = asParallel([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sumAsync((x) => asPromise(x.a))).toBe(6)
    })
})
