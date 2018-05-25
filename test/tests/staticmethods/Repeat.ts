import { ArgumentOutOfRangeException, AsyncEnumerable, Enumerable, ParallelEnumerable } from "../../../src/index"
import { itAsync, itEnumerable } from "../../TestHelpers"

describe("repeat", () => {
    it("Enumerable Repeat", () => {
        const oneToTen = Enumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    it("Enumerable Repeat Throws", () => {
        expect(() => Enumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("AsyncEnumerable Repeat", async () => {
        const oneToTen = await AsyncEnumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    it("AsyncEnumerable Repeat Throws", () => {
        expect(() => AsyncEnumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("ParallelEnumerable Repeat", async () => {
        const oneToTen = await ParallelEnumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    it("ParallelEnumerable Repeat Throws", () => {
        expect(() => ParallelEnumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })
})
