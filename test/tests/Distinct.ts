import { EqualityComparer } from "../../src/index"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("distinct", () => {
    itEnumerable("basic", (asEnumerable) => {
        expect(asEnumerable([1, 1]).distinct().toArray()).toEqual([1])
    })

    itAsync("Basic", async () => {
        expect(await asAsync([1, 1]).distinct().toArray()).toEqual([1])
    })

    itParallel("Basic", async (asParallel) => {
        expect(await asParallel([1, 1]).distinct().toArray()).toEqual([1])
    })

    itEnumerable<string | number>("Distinct", (asEnumerable) => {
        const array = asEnumerable(["f", "o", "o"])

        expect(array.distinct().toArray()).toEqual(["f", "o"])
    })

    itAsync("Distinct", async () => {
        const array = asAsync(["f", "o", "o"])

        expect(await array.distinct().toArray()).toEqual(["f", "o"])
    })

    itParallel<string>("Distinct", async (asParallel) => {
        const array = asParallel(["f", "o", "o"])

        expect(await array.distinct().toArray()).toEqual(["f", "o"])
    })

    itEnumerable<string | number>("DistinctWeakEquality", (asEnumerable) => {
        const array = asEnumerable(["1", 1, 2, 2, 3, "3"])

        expect(array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itAsync("DistinctWeakEquality", async () => {
        const array = asAsync(["1", 1, 2, 2, 3, "3"])

        expect(await array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itParallel<string | number>("DistinctWeakEquality", async (asParallel) => {
        const array = asParallel(["1", 1, 2, 2, 3, "3"])

        expect(await array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itEnumerable("empty array to remain empty", (asEnumerable) =>
        expect(asEnumerable([]).distinct().toArray()).toEqual([]))

    itAsync("empty array to remain empty async", async () => {
        const value = await asAsync([]).distinct().toArray()
        expect(value).toEqual([])
    })

    itParallel("empty array to remain empty", async (asParallel) => {
        const value = await asParallel([]).distinct().toArray()
        expect(value).toEqual([])
    })

})
