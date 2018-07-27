import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("skipWhile", () => {
    itEnumerable("basic", (asEnumerable) => {
        const values = asEnumerable([ 0, 1, 2, 3 ])
            .skipWhile((x) => x < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itAsync("basic", async () => {
        const values = await asAsync([ 0, 1, 2, 3 ])
            .skipWhile((x) => x < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itParallel("basic", async (asParallel) => {
        const values = await asParallel([ 0, 1, 2, 3 ])
            .skipWhile((x) => x < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itEnumerable("index", (asEnumerable) => {
        const values = asEnumerable([ 0, 1, 2, 3 ])
            .skipWhile((_, i) => i < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itAsync("index", async () => {
        const values = await asAsync([ 0, 1, 2, 3 ])
            .skipWhile((_, i) => i < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })

    itParallel("index", async (asParallel) => {
        const values = await asParallel([ 0, 1, 2, 3 ])
            .skipWhile((_, i) => i < 2)
            .toArray()
        expect(values).toEqual([2, 3])
    })
})
