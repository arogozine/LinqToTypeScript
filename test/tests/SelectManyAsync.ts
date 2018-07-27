import { asAsync, itAsync, itEnumerable, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("selectManyAsync", () => {
    itEnumerableAsync<{ a: number[] }>("selectManyAsync", async (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync(async (x) => x.a).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })

    itAsync("selectManyAsync", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync(async (x) => x.a).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })

    itParallel<{ a: number[] }>("selectManyAsync", async (asParallel) => {
        const values = asParallel([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync(async (x) => x.a).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })
})
