import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("skipWhileAsync", () => {
    itEnumerableAsync("basic", async (asEnumerable) => {
        const values = await asEnumerable([ 0, 1, 2, 3 ])
            .skipWhileAsync(async (x) => x < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itAsync("basic async", async () => {
        const values = await asAsync([ 0, 1, 2, 3 ])
            .skipWhileAsync(async (x) => x < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itParallel("basic parallel", async (asParallel) => {
        const values = await asParallel([ 0, 1, 2, 3 ])
            .skipWhileAsync(async (x) => x < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itEnumerableAsync("index", async (asEnumerable) => {
        const values = await asEnumerable([ 0, 1, 2, 3 ])
            .skipWhileAsync(async (_, i) => i < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itAsync("index async", async () => {
        const values = await asAsync([ 0, 1, 2, 3 ])
            .skipWhileAsync(async (_, i) => i < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itParallel("index parallel", async (asParallel) => {
        const values = await asParallel([ 0, 1, 2, 3 ])
            .skipWhileAsync(async (_, i) => i < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })
})
