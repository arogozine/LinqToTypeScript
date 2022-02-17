import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers";

describe("DefaultIfEmpty", () => {
    itEnumerable<number>("Empty", (asEnumerable) => {
        const defaultValueArray = asEnumerable([]).defaultIfEmpty(1).toArray()
        expect(defaultValueArray).toEqual([1])
    })

    itAsync("Empty", async () => {
        const defaultValueArray = await asAsync<number>([]).defaultIfEmpty(1).toArray()
        expect(defaultValueArray).toEqual([1])
    })

    itParallel<number>("Empty", async (asParallel) => {
        const defaultValueArray = await asParallel([]).defaultIfEmpty(1).toArray()
        expect(defaultValueArray).toEqual([1])
    })

    itEnumerable<number>("Exists", (asEnumerable) => {
        const defaultValueArray = asEnumerable([2, 3]).defaultIfEmpty(1).toArray()
        expect(defaultValueArray).toEqual([2, 3])
    })

    itAsync("Exists", async () => {
        const defaultValueArray = await asAsync<number>([2, 3]).defaultIfEmpty(1).toArray()
        expect(defaultValueArray).toEqual([2, 3])
    })

    itParallel<number>("Exists", async (asParallel) => {
        const defaultValueArray = await asParallel([2, 3]).defaultIfEmpty(1).toArray()
        expect(defaultValueArray).toEqual([2, 3])
    })
})