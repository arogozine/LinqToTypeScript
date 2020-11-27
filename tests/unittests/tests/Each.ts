import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("each", () => {
    itEnumerable("Basic", (asEnumerable) => {
        const values = [1, 2, 3, 4, 5]

        let count = 0
        asEnumerable(values).each((x) => {
            expect(values.find((y) => y === x)).toBeTruthy()
            count++
        }).toArray()

        expect(count).toBe(values.length)
    })

    itAsync("Basic", async () => {
        const values = [1, 2, 3, 4, 5]

        let count = 0
        await asAsync(values).each((x) => {
            expect(values.find((y) => y === x)).toBeTruthy()
            count++
        }).toArray()

        expect(count).toBe(values.length)
    })

    itParallel("Basic", async (asParallel) => {
        const values = [1, 2, 3, 4, 5]

        let count = 0
        await asParallel(values).each((x) => {
            expect(values.find((y) => y === x)).toBeTruthy()
            count++
        }).toArray()

        expect(count).toBe(values.length)
    })
})
