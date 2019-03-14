import { repeat as repeatAsync } from "linq-to-typescript/async"
import { ArgumentOutOfRangeException, repeat } from "linq-to-typescript"
import { repeat as repeatParallel } from "linq-to-typescript/parallel"
import { itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("repeat", () => {
    itEnumerable("Repeat 10", () => {
        const oneToTen = repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itAsync("Repeat 10", async () => {
        const oneToTen = await repeatAsync(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itParallel("Repeat 10", async () => {
        const oneToTen = await repeatParallel(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itEnumerable("Repeat Throws", () => {
        expect(() => repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("Repeat Throws", async () => {
        expect(() => repeatAsync(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("Repeat Throws", () => {
        expect(() => repeatParallel(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })
})
