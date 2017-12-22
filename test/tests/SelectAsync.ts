import { Enumerable } from "../../src/index"
import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("SelectAsync", () => {
    itEnumerable("Basic", (asEnumerable) => {
        const values = asEnumerable([1, 2, 3])
        const trueValues = values.selectAsync((x) => new Promise<boolean>((res) => res(true)))
        const promise = trueValues.toArray()
        expect(promise instanceof Promise).toBe(true)
    })

    itAsync("From Enumerable", async () => {
        const values = Enumerable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueValues = values.selectAsync((x) => new Promise<number>((res) => res(x + 1)))
        const asyncValues = await trueValues.toArray()
        expect(values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })

    itAsync("From Async", async () => {
        const values = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueValues = values.selectAsync((x) => new Promise<number>((res) => res(x + 1)))
        const asyncValues = await trueValues.toArray()
        expect(await values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })

    itAsync("From Parallel", async () => {
        const values = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueValues = values.selectAsync((x) => new Promise<number>((res) => res(x + 1)))
        const asyncValues = await trueValues.toArray()
        expect(await values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })
})
