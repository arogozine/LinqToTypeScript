import { EqualityComparer } from "../../src/index"
import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

// tslint:disable:triple-equals

describe("intersect", () => {
    itEnumerableAsync<string | number>("IntersectWithEqualityComparer", async (asEnumerable) => {
        const array = await asEnumerable([1, 2, "3"])
            .intersectAsync(asEnumerable(["1", "2"]), async (x, y) => x == y)
            .toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("IntersectWithEqualityComparerAsync", async () => {
        const array = await asAsync([1, 2, "3"])
            .intersectAsync(asAsync<string | number>(["1", "2"]), async (x, y) => x == y)
            .toArray()

        expect(array).toEqual([1, 2])
    })

    itParallel<string | number>("IntersectWithEqualityComparerParallel", async (asParallel) => {
        const array = await asParallel([1, 2, "3"])
            .intersectAsync(asAsync<string | number>(["1", "2"]), async (x, y) => x == y)
            .toArray()

        expect(array).toEqual([1, 2])
    })
})
