import { EqualityComparer } from "../../src/index"
import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("distinctAsync", () => {
    // tslint:disable:triple-equals
    itEnumerableAsync<string | number>("DistinctWeakEquality", async (asEnumerable) => {
        const array = asEnumerable(["1", 1, 2, 2, 3, "3"])
        const distinct = await array.distinctAsync(async (x, y) => x == y).toArray()
        expect(distinct).toEqual(["1", 2, 3])
    })

    itAsync("DistinctWeakEqualityAsync", async () => {
        const array = asAsync(["1", 1, 2, 2, 3, "3"])

        expect(await array.distinctAsync(async (x, y) => x == y).toArray()).toEqual(["1", 2, 3])
    })

    itParallel<string | number>("DistinctWeakEquality", async (asParallel) => {
        const array = asParallel(["1", 1, 2, 2, 3, "3"])
        const distinct = await array.distinctAsync(async (x, y) => x == y).toArray()
        expect(distinct).toEqual(["1", 2, 3])
    })
})
