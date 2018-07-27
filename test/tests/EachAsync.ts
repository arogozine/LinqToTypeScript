import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("eachAsync", () => {
    itEnumerableAsync("sync", async (asEnumerable) => {
        const values = [1, 2, 3, 4, 5]

        let count = 0
        await asEnumerable(values).eachAsync((x) => {
            return new Promise((resolve) => {
                expect(values.find((y) => y === x)).toBeTruthy()
                count++
                resolve()
            })
        }).toArray()

        expect(count).toBe(values.length)
    })

    itAsync("EachAsync", async () => {
        const values = [1, 2, 3, 4, 5]

        let count = 0
        await asAsync(values).eachAsync((x) => {
            return new Promise((resolve) => {
                expect(values.find((y) => y === x)).toBeTruthy()
                count++
                resolve()
            })
        }).toArray()

        expect(count).toBe(values.length)
    })

    itParallel("parrallel", async (asParallel) => {
        const values = [1, 2, 3, 4, 5]

        let count = 0
        await asParallel(values).eachAsync((x) => {
            return new Promise((resolve) => {
                expect(values.find((y) => y === x)).toBeTruthy()
                count++
                resolve()
            })
        }).toArray()

        expect(count).toBe(values.length)
    })
})
