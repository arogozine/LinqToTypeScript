import { partition, partitionAsync, partitionParallel } from "linq-to-typescript"
import { asAsync, itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("partition", () => {
    itEnumerable("Basic", (asEnumerable) => {
        const enumeration = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const [pass, fail] = partition(enumeration, (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })

    itAsync("Basic", async () => {
        const enumeration = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const [pass, fail] = await partitionAsync(enumeration, (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })

    itParallel("Basic", async (asParallel) => {
        const enumeration = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const [pass, fail] = await partitionParallel(enumeration, (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })
})
