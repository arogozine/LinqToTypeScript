import { Enumerable } from "../../src/index"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("WhereAsync", () => {
    itEnumerable("Basic", (asEnumerable) => {
        const values = asEnumerable([1, 2, 3])
        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const promise = trueFilter.toArray()
        expect(promise instanceof Promise).toBe(true)
    })

    itAsync("From Enumerable", async () => {
        const values = Enumerable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const asyncValues = await trueFilter.toArray()
        expect(values.toArray()).toEqual(asyncValues)
    })

    itAsync("From Async", async () => {
        const values = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])

        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const asyncValues = await trueFilter.toArray()
        expect(await values.toArray()).toEqual(asyncValues)
    })

    itParallel("From", async (asParallel) => {
        const values = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])

        const trueFilter = values.whereAsync((x, i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const asyncValues = await trueFilter.toArray()
        expect(await values.toArray()).toEqual(asyncValues)
    })
})
