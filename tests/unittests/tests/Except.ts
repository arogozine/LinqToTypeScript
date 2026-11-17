import { EqualityComparer } from "linq-to-typescript"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("except", () => {
    itEnumerable("basic", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).except(asEnumerable([1, 2])).toArray()).toEqual([3])
    })

    itAsync("basic", async () => {
        const value = await asAsync([1, 2, 3]).except(asAsync([1, 2]))
            .toArray()
        expect(value).toEqual([3])
    })

    itParallel("basic", async (asParallel) => {
        const value = await asParallel([1, 2, 3]).except(asAsync([1, 2]))
            .toArray()
        expect(value).toEqual([3])
    })

    itEnumerable("de-duplicates", (asEnumerable) => {
        expect(asEnumerable([1, 1, 2, 3, 3]).except(asEnumerable([3])).toArray()).toEqual([1, 2])
    })

    itAsync("de-duplicates", async () => {
        const value = await asAsync([1, 1, 2, 3, 3]).except(asAsync([3])).toArray()
        expect(value).toEqual([1, 2])
    })

    itParallel("de-duplicates", async (asParallel) => {
        const value = await asParallel([1, 1, 2, 3, 3]).except(asAsync([3])).toArray()
        expect(value).toEqual([1, 2])
    })

    itEnumerable("NaN is treated as equal (default comparer)", (asEnumerable) => {
        expect(asEnumerable([NaN, NaN, 1]).except(asEnumerable([1])).toArray()).toEqual([NaN])
        expect(asEnumerable([NaN, 2]).except(asEnumerable([NaN])).toArray()).toEqual([2])
    })

    itAsync("NaN is treated as equal (default comparer)", async () => {
        const value = await asAsync([NaN, NaN, 1]).except(asAsync([1])).toArray()
        expect(value).toEqual([NaN])
    })

    itParallel("NaN is treated as equal (default comparer)", async (asParallel) => {
        const value = await asParallel([NaN, NaN, 1]).except(asAsync([1])).toArray()
        expect(value).toEqual([NaN])
    })

    itEnumerable<string | number>("with comparer", (asEnumerable) => {
        expect(asEnumerable([1, "2", 3]).except(asEnumerable([1, "2"]), EqualityComparer).toArray()).toEqual([3])
    })

    itAsync("with comparer", async () => {
        const value = await asAsync([1, "2", 3]).except(asAsync([1, "2"]), EqualityComparer)
            .toArray()
        expect(value).toEqual([3])
    })

    itParallel<string | number>("with comparer", async (asParallel) => {
        const value = await asParallel([1, "2", 3]).except(asParallel([1, "2"]), EqualityComparer)
            .toArray()
        expect(value).toEqual([3])
    })
})
