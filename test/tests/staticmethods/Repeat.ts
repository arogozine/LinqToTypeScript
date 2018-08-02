import { ArgumentOutOfRangeException, AsyncEnumerable, Enumerable, ParallelEnumerable } from "../../../src/index"
import { itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("repeat", () => {
    itEnumerable("Repeat 10", () => {
        const oneToTen = Enumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itAsync("Repeat 10", async () => {
        const oneToTen = await AsyncEnumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itParallel("Repeat 10", async () => {
        const oneToTen = await ParallelEnumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itEnumerable("Repeat Throws", () => {
        expect(() => Enumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("Repeat Throws", async () => {
        expect(() => AsyncEnumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("Repeat Throws", () => {
        expect(() => ParallelEnumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })
})
