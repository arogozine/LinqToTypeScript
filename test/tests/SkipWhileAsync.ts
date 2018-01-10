import { asAsync, asParallel, asPromise, itAsync, itEnumerableAsync } from "../TestHelpers"

describe("skipWhileAsync", () => {
    itEnumerableAsync("basic", async (asEnumerable) => {
        const values = await asEnumerable([ 0, 1, 2, 3 ])
            .skipWhileAsync((x) => asPromise(x < 2))
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itAsync("basic async", async () => {
        const values = await asAsync([ 0, 1, 2, 3 ])
            .skipWhileAsync((x) => asPromise(x < 2))
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itAsync("basic parallel", async () => {
        const values = await asParallel([ 0, 1, 2, 3 ])
            .skipWhileAsync((x) => asPromise(x < 2))
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itEnumerableAsync("index", async (asEnumerable) => {
        const values = await asEnumerable([ 0, 1, 2, 3 ])
            .skipWhileAsync((_, i) => asPromise(i < 2))
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itAsync("index async", async () => {
        const values = await asAsync([ 0, 1, 2, 3 ])
            .skipWhileAsync((_, i) => asPromise(i < 2))
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itAsync("index parallel", async () => {
        const values = await asParallel([ 0, 1, 2, 3 ])
            .skipWhileAsync((_, i) => asPromise(i < 2))
            .toArray()
        expect(values).toEqual([2, 3])
    })
})
