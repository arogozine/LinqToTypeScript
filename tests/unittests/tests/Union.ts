import { EqualityComparer } from "linq-to-typescript"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("union", () => {
    itEnumerable("=== union", (asEnumerable) => {
        const ints1 = asEnumerable([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asEnumerable([ 8, 3, 6, 4, 4, 9, 1, 0 ])
        const result = [5, 3, 9, 7, 8, 6, 4, 1, 0]
        const union = ints1.union(ints2).toArray()
        expect(union).toEqual(result)
    })

    itAsync("=== union", async () => {
        const ints1 = asAsync([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asAsync([ 8, 3, 6, 4, 4, 9, 1, 0 ])
        const result = [5, 3, 9, 7, 8, 6, 4, 1, 0]
        const union = await ints1.union(ints2).toArray()
        expect(union).toEqual(result)
    })

    itParallel("=== union", async (asParallel) => {
        const ints1 = asParallel([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asParallel([ 8, 3, 6, 4, 4, 9, 1, 0 ])
        const result = [5, 3, 9, 7, 8, 6, 4, 1, 0]
        const union = await ints1.union(ints2).toArray()
        expect(union).toEqual(result)
    })

    itEnumerable<string|number>("== union", (asEnumerable) => {
        const ints1 = asEnumerable([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asEnumerable([ "8", "3", "6", "4", "4", "9", "1", "0" ])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = ints1.union(ints2, EqualityComparer).toArray()

        expect(union).toEqual(result)
    })

    itAsync("== union", async () => {
        const ints1 = asAsync<string | number>([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asAsync<string | number>([ "8", "3", "6", "4", "4", "9", "1", "0" ])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = await ints1.union(ints2, EqualityComparer).toArray()

        expect(union).toEqual(result)
    })

    itParallel<string | number>("== union", async (asParallel) => {
        const ints1 = asParallel([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asParallel([ "8", "3", "6", "4", "4", "9", "1", "0" ])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = await ints1.union(ints2, EqualityComparer).toArray()

        expect(union).toEqual(result)
    })
})
