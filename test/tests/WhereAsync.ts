import { Enumerable } from "../../src/index"
import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("WhereAsync", () => {
    itEnumerable("Basic", (asEnumerable) => {
        const values = asEnumerable([1, 2, 3])
        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const promise = trueFilter.toArray()
        expect(promise instanceof Promise).toBe(true)
    })

    itAsync("Basic 2", async () => {
        const values = Enumerable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const asyncValues = await trueFilter.toArray()
        expect(values.toArray()).toEqual(asyncValues)
    })
})
