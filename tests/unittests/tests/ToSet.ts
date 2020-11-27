import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("toSet", () => {
    it("String", () => {
        const set = "abc".toSet();
        expect(set instanceof Set).toBe(true)
        expect(set.has("a")).toBe(true)
        expect(set.has("b")).toBe(true)
        expect(set.has("c")).toBe(true)
        expect(set.size).toBe(3)
    })

    itEnumerable("Basic", (asEnumerable) => {
        const set = asEnumerable([1, 2, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })

    itEnumerable("Duplicate Values", (asEnumerable) => {
        const set = asEnumerable([1, 2, 3, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })

    itAsync("Basic", async () => {
        const set = await asAsync([1, 2, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })

    itParallel("Basic", async (asParallel) => {
        const set = await asParallel([1, 2, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })
})
