import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("exceptAsync", () => {
    // tslint:disable:triple-equals

    itEnumerableAsync<string | number>("with comparer", async (asEnumerable) => {
        const exceptResult = await asEnumerable([1, "2", 3])
            .exceptAsync(asEnumerable([1, "2"]), async (x, y) => x == y)
            .toArray()
        expect(exceptResult).toEqual([3])
    })

    itAsync("with comparer", async () => {
        const value = await asAsync([1, "2", 3]).exceptAsync(asAsync([1, "2"]), async (x, y) => x == y).toArray()
        expect(value).toEqual([3])
    })

    itParallel<string | number>("with comparer", async (asParallel) => {
        const value = await asParallel([1, "2", 3]).exceptAsync(asParallel([1, "2"]), async (x, y) => x == y).toArray()
        expect(value).toEqual([3])
    })
})
