import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("toMap", () => {
    itEnumerable("toMap", (asEnumerable) => {
        const map = asEnumerable([1, 2, 3]).toMap((x) => `Key_${ x }`)
        for (const keyValue of map) {
            const key = keyValue[0]
            const value = keyValue[1]
            expect(key).toBe(`Key_${ value[0] }`)
        }
    })

    itAsync("toMap", async () => {
        const map = await asAsync([1, 2, 3]).toMap((x) => `Key_${ x }`)
        for (const keyValue of map) {
            const key = keyValue[0]
            const value = keyValue[1]
            expect(key).toBe(`Key_${ value[0] }`)
        }
    })

    itParallel("toMap", async (asParallel) => {
        const map = await asParallel([1, 2, 3]).toMap((x) => `Key_${ x }`)
        for (const keyValue of map) {
            const key = keyValue[0]
            const value = keyValue[1]
            expect(key).toBe(`Key_${ value[0] }`)
        }
    })
})
