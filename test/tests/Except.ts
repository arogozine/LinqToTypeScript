import { EqualityComparer } from "../../src/index"
import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("except", () => {
    itEnumerable("basic", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).except(asEnumerable([1, 2])).toArray()).toEqual([3])
    })

    itAsync("basicAsync", async () => {
        const value = await asAsync([1, 2, 3]).except(asAsync([1, 2])).toArray()
        expect(value).toEqual([3])
    })

    itAsync("basicParallel", async () => {
        const value = await asParallel([1, 2, 3]).except(asAsync([1, 2])).toArray()
        expect(value).toEqual([3])
    })

    itEnumerable<string | number>("with comparer", (asEnumerable) => {
        expect(asEnumerable([1, "2", 3]).except(asEnumerable([1, "2"]), EqualityComparer).toArray()).toEqual([3])
    })

    itAsync("with comparer async", async () => {
        const value = await asAsync([1, "2", 3]).except(asAsync([1, "2"]), EqualityComparer).toArray()
        expect(value).toEqual([3])
    })

    itAsync("with comparer parallel", async () => {
        const value = await asParallel([1, "2", 3]).except(asParallel([1, "2"]), EqualityComparer).toArray()
        expect(value).toEqual([3])
    })
})
