import { repeat as repeatAsync } from "../../../src/async/async"
import { ArgumentOutOfRangeException, ParallelEnumerable } from "../../../src/index"
import { repeat } from "../../../src/sync/sync"
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
        const oneToTen = await ParallelEnumerable.repeat(1, 10).toArray()
        expect(oneToTen).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })

    itEnumerable("Repeat Throws", () => {
        expect(() => repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    itAsync("Repeat Throws", async () => {
        expect(() => repeatAsync(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })

    itParallel("Repeat Throws", () => {
        expect(() => ParallelEnumerable.repeat(1, -1)).toThrowError(ArgumentOutOfRangeException)
    })
})
