import { ArgumentOutOfRangeException, AsyncEnumerable, Enumerable } from "../../../src/index"
import { itAsync, itEnumerable } from "../../TestHelpers"

describe("range", () => {
    it("Enumerable Range", () => {
        const oneToTen = Enumerable.range(1, 10).toArray()
        expect(oneToTen).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it("Enumerable Range Throws", () => {
        expect(() => Enumerable.range(-1, 99)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("AsyncEnumerable Range", async () => {
        const oneToTen = await AsyncEnumerable.range(1, 10).toArray()
        expect(oneToTen).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it("AsyncEnumerable Range Throws", () => {
        expect(() => AsyncEnumerable.range(-1, 99)).toThrowError(ArgumentOutOfRangeException)
    })
})
