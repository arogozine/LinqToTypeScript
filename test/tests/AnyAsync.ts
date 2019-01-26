import { asAsync, itAsync, itEnumerableAsync, itParallel } from "./../TestHelpers"

describe("anyAsync", () => {
    itEnumerableAsync("Empty", async (asEnumerable) => {
        const array = asEnumerable([])

        expect(await array.anyAsync(async (_) => true)).toBe(false)
        expect(await array.anyAsync(async (_) => false)).toBe(false)
    })

    itAsync("Empty", async () => {
        const array = asAsync([])

        expect(await array.anyAsync(async (_) => true)).toBe(false)
        expect(await array.anyAsync(async (_) => false)).toBe(false)
    })

    itParallel("Empty", async (asParallel) => {
        const array = asParallel([])

        expect(await array.anyAsync(async (_) => true)).toBe(false)
        expect(await array.anyAsync(async (_) => false)).toBe(false)
    })

    itEnumerableAsync("AnyExists", async (asEnumerable) => {
        const array = asEnumerable([1, 2])

        expect(await array.anyAsync(async (_) => true)).toBe(true)
        expect(await array.anyAsync(async (_) => false)).toBe(false)

        expect(await array.anyAsync(async (x) => x === 1)).toBe(true)
        expect(await array.anyAsync(async (x) => x === 2)).toBe(true)
    })

    itAsync("AnyExists", async () => {
        const array = asAsync([1, 2])

        expect(await array.anyAsync(async (_) => true)).toBe(true)
        expect(await array.anyAsync(async (_) => false)).toBe(false)

        expect(await array.anyAsync(async (x) => x === 1)).toBe(true)
        expect(await array.anyAsync(async (x) => x === 2)).toBe(true)
    })

    itParallel("AnyExists", async (asParallel) => {
        const array = asParallel([1, 2])

        expect(await array.anyAsync(async (_) => true)).toBe(true)
        expect(await array.anyAsync(async (_) => false)).toBe(false)

        expect(await array.anyAsync(async (x) => x === 1)).toBe(true)
        expect(await array.anyAsync(async (x) => x === 2)).toBe(true)
    })
})
