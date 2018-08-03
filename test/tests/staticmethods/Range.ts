import { ArgumentOutOfRangeException, AsyncEnumerable, Enumerable, ParallelEnumerable } from "../../../src/index"
import { itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("range", () => {
    itEnumerable("1 to 10", () => {
        const oneToTen = Enumerable.range(1, 10).toArray()
        expect(oneToTen).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    itAsync("1 to 10", async () => {
        const oneToTen = await AsyncEnumerable.range(1, 10).toArray()
        expect(oneToTen).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    itParallel("1 to 10", async () => {
        const oneToTen = await ParallelEnumerable.range(1, 10).toArray()
        expect(oneToTen).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    itEnumerable("Invalid Input Throws", () => {
        expect(() => Enumerable.range(-1, 99)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("Invalid Input Throws", async () => {
        expect(() => AsyncEnumerable.range(-1, 99)).toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("Invalid Input Throws", async () => {
        expect(() => ParallelEnumerable.range(-1, 99)).toThrowError(ArgumentOutOfRangeException)
    })
})
