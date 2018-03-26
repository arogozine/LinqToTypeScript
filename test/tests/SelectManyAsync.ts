import { asAsync, asPromise, itAsync, itEnumerable, asParallel, itEnumerableAsync } from "../TestHelpers"

describe("selectManyAsync", () => {
    itEnumerableAsync<{ a: number[] }>("selectManyAsync basic", async (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync((x) => asPromise(x.a)).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })

    itAsync("selectManyAsync async", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync((x) => asPromise(x.a)).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })

    itAsync("selectManyAsync parallel", async () => {
        const values = asParallel([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        const result = await values.selectManyAsync((x) => asPromise(x.a)).toArray()
        expect(result).toEqual([1, 2, 3, 4])
    })
})
