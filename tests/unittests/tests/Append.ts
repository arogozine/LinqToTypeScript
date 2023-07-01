import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers";

describe("Append", () => {
    itEnumerable<number>("Empty", (asEnumerable) => {
        const appendArray = asEnumerable([]).append(1).toArray()
        expect(appendArray).toEqual([1])
    })

    itEnumerable<number>("Not Empty", (asEnumerable) => {
        const appendArray = asEnumerable([2, 3]).append(1).toArray()
        expect(appendArray).toEqual([2, 3, 1])
    })

    itAsync("Empty", async () => {
        const appendArray = await asAsync([]).append(1).toArray()
        expect(appendArray).toEqual([1])
    })

    itAsync("Not Empty", async () => {
        const appendArray = await asAsync([2, 3]).append(1).toArray()
        expect(appendArray).toEqual([2, 3, 1])
    })

    itParallel("Empty", async (asParallel) => {
        const appendArray = await asParallel([]).append(1).toArray()
        expect(appendArray).toEqual([1])
    })

    itParallel("Not Empty", async (asParallel) => {
        const appendArray = await asParallel([2, 3]).append(1).toArray()
        expect(appendArray).toEqual([2, 3, 1])
    })
})