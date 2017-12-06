import { EqualityComparer } from "../../src/index"
import { asAsync, itAsync, itEnumerable, asParallel } from "../TestHelpers"

describe("intersect", () => {
    itEnumerable<string | number>("IntersectWithEqualityComparer", (asEnumerable) => {
        const array = asEnumerable([1, 2, "3"]).intersect(asEnumerable(["1", "2"]), EqualityComparer).toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("IntersectWithEqualityComparerAsync", async () => {
        const array = await asAsync([1, 2, "3"])
            .intersect(asAsync<string | number>(["1", "2"]), EqualityComparer)
            .toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("IntersectWithEqualityComparerParallel", async () => {
        const array = await asParallel([1, 2, "3"])
            .intersect(asAsync<string | number>(["1", "2"]), EqualityComparer)
            .toArray()

        expect(array).toEqual([1, 2])
    })
})
