import { EqualityComparer } from "../../src/index"
import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("distinct", () => {
    itEnumerable("basic", (asEnumerable) => {
        expect(asEnumerable([1, 1]).distinct().toArray()).toEqual([1])
    })

    itAsync("Basic Async", async () => {
        expect(await asAsync([1, 1]).distinct().toArray()).toEqual([1])
    })

    itAsync("Basic Parallel", async () => {
        expect(await asParallel([1, 1]).distinct().toArray()).toEqual([1])
    })

    itEnumerable<string | number>("Distinct", (asEnumerable) => {
        const array = asEnumerable(["f", "o", "o"])

        expect(array.distinct().toArray()).toEqual(["f", "o"])
    })

    itAsync("DistinctAsync", async () => {
        const array = asAsync(["f", "o", "o"])

        expect(await array.distinct().toArray()).toEqual(["f", "o"])
    })

    itAsync("DistinctParallel", async () => {
        const array = asParallel(["f", "o", "o"])

        expect(await array.distinct().toArray()).toEqual(["f", "o"])
    })

    itEnumerable<string | number>("DistinctWeakEquality", (asEnumerable) => {
        const array = asEnumerable(["1", 1, 2, 2, 3, "3"])

        expect(array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itAsync("DistinctWeakEqualityAsync", async () => {
        const array = asAsync(["1", 1, 2, 2, 3, "3"])

        expect(await array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itAsync("DistinctWeakEqualityParallel", async () => {
        const array = asParallel(["1", 1, 2, 2, 3, "3"])

        expect(await array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itEnumerable("empty array to remain empty", (asEnumerable) =>
        expect(asEnumerable([]).distinct().toArray()).toEqual([]))

    itAsync("empty array to remain empty async", async () => {
        const value = await asAsync([]).distinct().toArray()
        expect(value).toEqual([])
    })

    itAsync("empty array to remain empty parallel", async () => {
        const value = await asParallel([]).distinct().toArray()
        expect(value).toEqual([])
    })

})
