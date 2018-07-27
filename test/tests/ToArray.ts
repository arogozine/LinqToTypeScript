import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("toArray", () => {
    itEnumerable("toArray", (asEnumerable) => {
        const array1 = asEnumerable([1, 2, 3])
        const array2 = array1.toArray()
        expect(array2.length).toBe(array1.count())
        expect(array1 as any === array2 as any).toBe(false)
        expect(array1.toArray()).toEqual(array2)
    })

    itAsync("toArrayAsync", async () => {
        const array1 = [1, 2, 3]
        const array2 = await asAsync(array1).toArray()
        expect(array2.length).toBe(array1.length)
        expect(array1 === array2).toBe(false)
        expect(array1).toEqual(array2)
    })

    itParallel("toArray", async (asParallel) => {
        const array1 = [1, 2, 3]
        const array2 = await asParallel(array1).toArray()
        expect(array2.length).toBe(array1.length)
        expect(array1 === array2).toBe(false)
        expect(array1).toEqual(array2)
    })
})
