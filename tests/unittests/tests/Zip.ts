import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("zip", () => {
    itEnumerable<string | number>("Basic", (asEnumerable) => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = asEnumerable(it1).zip(asEnumerable(it2)).toArray()

        expect(zip.length).toBe(it1.length)

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val[0]).toBe(first)
            expect(val[1]).toBe(second)
        }
    })

    itAsync("Basic", async () => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const it1Async = asAsync(it1)
        const it2Async = asAsync(it2)

        const zip = await it1Async.zip(it2Async).toArray()

        expect(zip.length).toBe(it1.length)

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val[0]).toBe(first)
            expect(val[1]).toBe(second)
        }
    })

    itParallel<string | number>("Basic", async (asParallel) => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const it1Async = asParallel(it1)
        const it2Async = asParallel(it2)

        const zip = await it1Async.zip(it2Async).toArray()

        expect(zip.length).toBe(it1.length)

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val[0]).toBe(first)
            expect(val[1]).toBe(second)
        }
    })

    itEnumerable("zip selector", (asEnumerable) => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = asEnumerable(it1).zip(it2, (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })

    itAsync("zip selector", async () => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const it1Async = asAsync(it1)
        const it2Async = asAsync(it2)

        const zip = await it1Async.zip(it2Async, (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })

    itParallel<string | number>("zip selector", async (asParallel) => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const it1Async = asParallel(it1)
        const it2Async = asParallel(it2)

        const zip = await it1Async.zip(it2Async, (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })

    itEnumerable("different sizes", (asEnumerable) => {
        const it1 = asEnumerable([1, 2])
        const it2 = asEnumerable([1, 2, 3])

        const zip1 = it1.zip(it2).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = it2.zip(it1).toArray()
        expect(zip2.length).toBe(2)
    })

    itAsync("different sizes", async () => {
        const it1 = asAsync([1, 2])
        const it2 = asAsync([1, 2, 3])

        const zip1 = await it1.zip(it2).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = await it2.zip(it1).toArray()
        expect(zip2.length).toBe(2)
    })

    itParallel("different sizes", async (asParallel) => {
        const it1 = asParallel([1, 2])
        const it2 = asParallel([1, 2, 3])

        const zip1 = await it1.zip(it2).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = await it2.zip(it1).toArray()
        expect(zip2.length).toBe(2)
    })

    itEnumerable("different sizes selector", (asEnumerable) => {
        const it1 = asEnumerable([1, 2])
        const it2 = asEnumerable([1, 2, 3])

        const zip1 = it1.zip(it2, (a, b) => [a, b]).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = it2.zip(it1, (a, b) => [a, b]).toArray()
        expect(zip2.length).toBe(2)
    })

    itAsync("different sizes selector", async () => {
        const it1 = asAsync([1, 2])
        const it2 = asAsync([1, 2, 3])

        const zip1 = await it1.zip(it2, (a, b) => [a, b]).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = await it2.zip(it1, (a, b) => [a, b]).toArray()
        expect(zip2.length).toBe(2)
    })

    itParallel("different sizes selector", async (asParallel) => {
        const it1 = asParallel([1, 2])
        const it2 = asParallel([1, 2, 3])

        const zip1 = await it1.zip(it2, (a, b) => [a, b]).toArray()
        expect(zip1.length).toBe(2)

        const zip2 = await it2.zip(it1, (a, b) => [a, b]).toArray()
        expect(zip2.length).toBe(2)
    })
})
