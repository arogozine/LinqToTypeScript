import { EqualityComparer } from "linq-to-typescript"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("intersect", () => {
    itEnumerable("Basic", (asEnumerable) => {
        const array = asEnumerable([1, 2, 3])
            .intersect(asEnumerable([1, 2]))
            .toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("Basic", async () => {
        const array = await asAsync([1, 2, 3])
            .intersect(asAsync([1, 2]))
            .toArray()

        expect(array).toEqual([1, 2])
    })

    itParallel("Basic", async (asParallel) => {
        const array = await asParallel([1, 2, 3])
            .intersect(asAsync([1, 2]))
            .toArray()

        expect(array).toEqual([1, 2])
    })

    itEnumerable<string | number>("IntersectWithEqualityComparer", (asEnumerable) => {
        const array = asEnumerable([1, 2, "3"]).intersect(asEnumerable(["1", "2"]), EqualityComparer).toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("IntersectWithEqualityComparer", async () => {
        const array = await asAsync([1, 2, "3"])
            .intersect(asAsync<string | number>(["1", "2"]), EqualityComparer)
            .toArray()

        expect(array).toEqual([1, 2])
    })

    itParallel<string | number>("IntersectWithEqualityComparer", async (asParallel) => {
        const array = await asParallel([1, 2, "3"])
            .intersect(asAsync<string | number>(["1", "2"]), EqualityComparer)
            .toArray()

        expect(array).toEqual([1, 2])
    })
})
