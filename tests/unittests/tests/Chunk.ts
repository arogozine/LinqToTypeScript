import { ArgumentOutOfRangeException } from "linq-to-typescript"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("chunk", () => {
    itEnumerable("Empty", (asEnumerable) => {
        const values = asEnumerable([]).chunk(5).toArray()
        expect(values).toEqual([])
    })

    itAsync("Empty", async () => {
        const values = await asAsync([]).chunk(5).toArray()
        expect(values).toEqual([])
    })

    itParallel("Empty", async (asParallel) => {
        const values = await asParallel([]).chunk(5).toArray()
        expect(values).toEqual([])
    })

    itEnumerable("Size 0", (asEnumerable) => {
        const values = [1, 2, 3, 4, 5]
        expect(() => asEnumerable(values).chunk(0)).toThrow(ArgumentOutOfRangeException)
    })

    itAsync("Size 0", async () => {
        const values = [1, 2, 3, 4, 5]
        expect(() => asAsync(values).chunk(0)).toThrow(ArgumentOutOfRangeException)
    })

    itParallel("Size 0", async (asParallel) => {
        const values = [1, 2, 3, 4, 5]
        expect(() => asParallel(values).chunk(0)).toThrow(ArgumentOutOfRangeException)
    })

    itEnumerable("Size 1", (asEnumerable) => {
        const values = [1, 2, 3, 4, 5]
        const newValues = asEnumerable(values).chunk(1).toArray()
        expect(newValues.length).toBe(values.length)
        expect(newValues).toEqual([ [ 1 ], [ 2 ], [ 3 ], [ 4 ], [ 5 ] ])
    })

    itAsync("Size 1", async () => {
        const values = [1, 2, 3, 4, 5]
        const newValues = await asAsync(values).chunk(1).toArray()
        expect(newValues).toEqual([ [ 1 ], [ 2 ], [ 3 ], [ 4 ], [ 5 ] ])
    })

    itParallel("Size 1", async (asParallel) => {
        const values = [1, 2, 3, 4, 5]
        const newValues = await asParallel(values).chunk(1).toArray()
        expect(newValues).toEqual([ [ 1 ], [ 2 ], [ 3 ], [ 4 ], [ 5 ] ])
    })

    itEnumerable("Size 2 Odd", (asEnumerable) => {
        const values = [1, 2, 3, 4, 5]
        const newValues = asEnumerable(values).chunk(2).toArray()

        expect(newValues).toEqual([ [1, 2], [3, 4], [5] ])
    })

    itAsync("Size 2 Odd", async () => {
        const values = [1, 2, 3, 4, 5]
        const newValues = await asAsync(values).chunk(2).toArray()
        expect(newValues).toEqual([ [1, 2], [3, 4], [5] ])
    })

    itParallel("Size 2 Odd", async (asParallel) => {
        const values = [1, 2, 3, 4, 5]
        const newValues = await asParallel(values).chunk(2).toArray()
        expect(newValues).toEqual([ [1, 2], [3, 4], [5] ])
    })

    itEnumerable("Size 2 Even", (asEnumerable) => {
        const values = [1, 2, 3, 4, 5, 6]
        const newValues = asEnumerable(values).chunk(2).toArray()

        expect(newValues).toEqual([ [1, 2], [3, 4], [5, 6] ])

    })

    itAsync("Size 2 Even", async () => {
        const values = [1, 2, 3, 4, 5, 6]
        const newValues = await asAsync(values).chunk(2).toArray()
        
        expect(newValues).toEqual([ [1, 2], [3, 4], [5, 6] ])
    })

    itParallel("Size 2 Even", async (asParallel) => {
        const values = [1, 2, 3, 4, 5, 6]
        const newValues = await asParallel(values).chunk(2).toArray()
        
        expect(newValues).toEqual([ [1, 2], [3, 4], [5, 6] ])
    })
})