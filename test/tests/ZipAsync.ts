import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("zipAsync", () => {
    itEnumerableAsync("zipAsync basic", async (asEnumerable) => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = await asEnumerable(it1).zipAsync(it2, async (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })

    itAsync("zip", async () => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const it1Async = asAsync(it1)
        const it2Async = asAsync(it2)

        const zip = await it1Async.zipAsync(it2Async, async (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })

    itParallel<string | number>("zip", async (asParallel) => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const it1Async = asParallel(it1)
        const it2Async = asParallel(it2)

        const zip = await it1Async.zipAsync(it2Async, async (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })
})
