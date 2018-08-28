import { from } from "../../src/index"
import { itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("whereAsync", () => {
    itEnumerable("Basic", (asEnumerable) => {
        const values = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const promise = trueFilter.toArray()
        expect(promise instanceof Promise).toBe(true)
    })

    itAsync("Basic", async () => {
        const values = from([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const asyncValues = await trueFilter.toArray()
        expect(values.toArray()).toEqual(asyncValues)
    })

    itParallel("Basic", async (asParallel) => {
        const values = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])

        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const asyncValues = await trueFilter.toArray()
        expect(await values.toArray()).toEqual(asyncValues)
    })
})
