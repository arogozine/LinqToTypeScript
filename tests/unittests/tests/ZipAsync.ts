import { asAsync, itAsync, itEnumerableAsync, itParallel, randomTimeOut } from "../TestHelpers"

describe("zipAsync", () => {
    itEnumerableAsync("Basic", async (asEnumerable) => {
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

    itAsync("Basic", async () => {
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

    itParallel<string | number>("Basic", async (asParallel) => {
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

    itEnumerableAsync("different size", async (asEnumerable) => {
        const it1 = asEnumerable([1, 2])
        const it2 = asEnumerable([1, 2, 3])

        const zip1 = await it1.zipAsync(it2, (a, b) => randomTimeOut([a, b])).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = await it2.zipAsync(it1, (a, b) => randomTimeOut([a, b])).toArray()
        expect(zip2.length).toBe(2)
    })

    itAsync("different sizes", async () => {
        const it1 = asAsync([1, 2])
        const it2 = asAsync([1, 2, 3])

        const zip1 = await it1.zip(it2, (a, b) => randomTimeOut([a, b])).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = await it2.zip(it1, (a, b) => randomTimeOut([a, b])).toArray()
        expect(zip2.length).toBe(2)
    })

    itParallel("different sizes", async (asParallel) => {
        const it1 = asParallel([1, 2])
        const it2 = asParallel([1, 2, 3])

        const zip1 = await it1.zipAsync(it2, (a, b) => randomTimeOut([a, b])).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = await it2.zipAsync(it1, (a, b) => randomTimeOut([a, b])).toArray()
        expect(zip2.length).toBe(2)
    })

})
