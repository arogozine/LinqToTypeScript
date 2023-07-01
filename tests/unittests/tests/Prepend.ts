import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers";

describe("Prepend", () => {
    itEnumerable<number>("Empty", (asEnumerable) => {
        const appendArray = asEnumerable([]).prepend(1).toArray()
        expect(appendArray).toEqual([1])
    })

    itEnumerable<number>("Not Empty", (asEnumerable) => {
        const appendArray = asEnumerable([2, 3]).prepend(1).toArray()
        expect(appendArray).toEqual([1, 2, 3])
    })

    itAsync("Empty", async () => {
        const appendArray = await asAsync([]).prepend(1).toArray()
        expect(appendArray).toEqual([1])
    })

    itAsync("Not Empty", async () => {
        const appendArray = await asAsync([2, 3]).prepend(1).toArray()
        expect(appendArray).toEqual([1, 2, 3])
    })

    itParallel("Empty", async (asParallel) => {
        const appendArray = await asParallel([]).prepend(1).toArray()
        expect(appendArray).toEqual([1])
    })

    itParallel("Not Empty", async (asParallel) => {
        const appendArray = await asParallel([2, 3]).prepend(1).toArray()
        expect(appendArray).toEqual([1, 2, 3])
    })
})