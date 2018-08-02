import { EqualityComparer } from "../../src/index"
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
