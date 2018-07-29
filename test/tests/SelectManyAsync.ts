import { asAsync, itAsync, itEnumerable, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("selectManyAsync", () => {
    itEnumerableAsync<{ a: number[] }>("Basic", async (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync(async (x) => x.a).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })

    itAsync("Basic", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync(async (x) => x.a).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })

    itParallel<{ a: number[] }>("Basic", async (asParallel) => {
        const values = asParallel([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync(async (x) => x.a).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })
})
