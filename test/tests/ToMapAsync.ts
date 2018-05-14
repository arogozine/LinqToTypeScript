import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("toMapAsync", () => {
    itEnumerableAsync("toMap", async (asEnumerable) => {
        const map = await asEnumerable([1, 2, 3]).toMapAsync(async (x) => `Key_${ x }`)
        for (const keyValue of map) {
            const key = keyValue[0]
            const value = keyValue[1]
            expect(key).toBe(`Key_${ value[0] }`)
        }
    })

    itAsync("toMapAsync", async () => {
        const map = await asAsync([1, 2, 3]).toMapAsync(async (x) => `Key_${ x }`)
        for (const keyValue of map) {
            const key = keyValue[0]
            const value = keyValue[1]
            expect(key).toBe(`Key_${ value[0] }`)
        }
    })

    itParallel("toMapParallel", async (asParallel) => {
        const map = await asParallel([1, 2, 3]).toMapAsync(async (x) => `Key_${ x }`)
        for (const keyValue of map) {
            const key = keyValue[0]
            const value = keyValue[1]
            expect(key).toBe(`Key_${ value[0] }`)
        }
    })
})
