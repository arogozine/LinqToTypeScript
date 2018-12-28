import { partitionAsync as partitionAsyncAsync } from "../../../src/async"
import { partitionAsync } from "../../../src/index"
import { partitionAsync as partitionAsyncParallel } from "../../../src/parallel"
import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../../TestHelpers"

describe("partitionAsync", () => {
    itEnumerableAsync("Basic", async (asEnumerable) => {
        const enumeration = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const [pass, fail] = await partitionAsync(enumeration, async (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })

    itAsync("Basic", async () => {
        const enumeration = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const [pass, fail] = await partitionAsyncAsync(enumeration, async (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })

    itParallel("Basic", async (asParallel) => {
        const enumeration = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const [pass, fail] = await partitionAsyncParallel(enumeration, async (x) => x % 2 === 0)
        expect(pass).toEqual([2, 4, 6, 8])
        expect(fail).toEqual([1, 3, 5, 7, 9])
    })
})
