import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("toSet", () => {
    itEnumerable("toSet", (asEnumerable) => {
        const set = asEnumerable([1, 2, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })

    itAsync("toSetAsync", async () => {
        const set = await asAsync([1, 2, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })

    itAsync("toSetParallel", async () => {
        const set = await asParallel([1, 2, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })
})
