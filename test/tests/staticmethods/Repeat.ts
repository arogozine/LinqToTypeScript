import { ArgumentOutOfRangeException, AsyncEnumerable, Enumerable, ParallelEnumerable } from "../../../src/index"
import { itAsync, itEnumerable } from "../../TestHelpers"

describe("repeat", () => {
    it("Repeat 10", () => {
        const oneToTen = Enumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itAsync("Repeat 10", async () => {
        const oneToTen = await AsyncEnumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itAsync("Repeat 10", async () => {
        const oneToTen = await ParallelEnumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    it("Repeat Throws", () => {
        expect(() => Enumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    it("Repeat Throws", () => {
        expect(() => AsyncEnumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    it("Repeat Throws", () => {
        expect(() => ParallelEnumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })
})
