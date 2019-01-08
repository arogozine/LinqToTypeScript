import { range as rangeAsync } from "../../../src/async"
import { ArgumentOutOfRangeException, range } from "../../../src/index"
import { range as rangeParallel } from "../../../src/parallel"
import { itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("range", () => {
    itEnumerable("1 to 10", () => {
        const oneToTen = range(1, 10).toArray()
        expect(oneToTen).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    itAsync("1 to 10", async () => {
        const oneToTen = await rangeAsync(1, 10).toArray()
        expect(oneToTen).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    itParallel("1 to 10", async () => {
        const oneToTen = await rangeParallel(1, 10).toArray()
        expect(oneToTen).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    itEnumerable("Invalid Input Throws", () => {
        expect(() => range(-1, 99)).toThrowError(ArgumentOutOfRangeException)

        expect(() => range(Number.MAX_SAFE_INTEGER - 10, 99))
            .toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("Invalid Input Throws", async () => {
        expect(() => rangeAsync(-1, 99)).toThrowError(ArgumentOutOfRangeException)

        expect(() => rangeAsync(Number.MAX_SAFE_INTEGER - 10, 99))
            .toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("Invalid Input Throws", async () => {
        expect(() => rangeParallel(-1, 99)).toThrowError(ArgumentOutOfRangeException)

        expect(() => rangeParallel(Number.MAX_SAFE_INTEGER - 10, 99))
            .toThrowError(ArgumentOutOfRangeException)
    })
})
