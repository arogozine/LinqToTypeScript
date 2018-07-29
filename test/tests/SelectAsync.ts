import { Enumerable } from "../../src/index"
import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("selectAsync", () => {
    itEnumerableAsync("Basic", async (asEnumerable) => {
        const values = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueValues = values.selectAsync(async (x) => x + 1)
        const asyncValues = await trueValues.toArray()
        expect(await values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })

    itAsync("Basic", async () => {
        const values = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueValues = values.selectAsync((x) => new Promise<number>((res) => res(x + 1)))
        const asyncValues = await trueValues.toArray()
        expect(await values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })

    itParallel("Basic", async (asParallel) => {
        const values = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueValues = values.selectAsync((x) => new Promise<number>((res) => res(x + 1)))
        const asyncValues = await trueValues.toArray()
        expect(await values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })

    itEnumerableAsync("Basic String Key", async (asEnumerable) => {
        const values = asEnumerable([1, 2, 3])
        const trueValues = values
            .select((x) => {
                return { strKey: (async () => x + 1)() }
            })
            .selectAsync("strKey")
        const asyncValues = await trueValues.toArray()
        expect(await values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })

    itAsync("From String Key", async () => {
        const values = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueValues = values
            .select((x) => {
                return { strKey: (async () => x + 1)() }
            })
            .selectAsync("strKey")
        const asyncValues = await trueValues.toArray()
        expect(await values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })

    itParallel("From String Key", async (asParallel) => {
        const values = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])
        const trueValues = values
            .select((x) => {
                return { strKey: (async () => x + 1)() }
            })
            .selectAsync("strKey")
        const asyncValues = await trueValues.toArray()
        expect(await values.select((x) => x + 1).toArray()).toEqual(asyncValues)
    })
})
