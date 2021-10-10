import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("partitionAsync", () => {
    itEnumerableAsync("Basic", async (asEnumerable) => {
        const [pass, fail] = await asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
            .partitionAsync(async (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })

    itAsync("Basic", async () => {
        const [pass, fail] = await asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
            .partitionAsync(async (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })

    itParallel("Basic", async (asParallel) => {
        const [pass, fail] = await asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])
            .partitionAsync(async (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })
})
