import { from } from "linq-to-typescript"
import { itAsync, itEnumerable, itParallel } from "../TestHelpers"

// tslint:disable:variable-name

describe("whereAsync", () => {
    itAsync("String", async () => {
        const values = await "alphabetagamma".whereAsync(async c => c === "a").toArray()
        expect(values).toEqual(["a", "a", "a", "a", "a"])
    })

    itAsync("String Index", async () => {
        const values = await "alphabetagamma".whereAsync(async (_, i) => i === 5).toArray()
        expect(values).toEqual(["b"])
    })


    itEnumerable("Basic", (asEnumerable) => {
        const values = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueFilter = values.whereAsync((_x, _i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const promise = trueFilter.toArray()
        expect(promise instanceof Promise).toBe(true)
    })

    itAsync("Basic", async () => {
        const values = from([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueFilter = values.whereAsync((_x, _i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const asyncValues = await trueFilter.toArray()
        expect(values.toArray()).toEqual(asyncValues)
    })

    itParallel("Basic", async (asParallel) => {
        const values = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])

        const trueFilter = values.whereAsync((_x, _i) => new Promise((e) => {
            setTimeout(() => e(true), 100)
        }))

        const asyncValues = await trueFilter.toArray()
        expect(await values.toArray()).toEqual(asyncValues)
    })
})
