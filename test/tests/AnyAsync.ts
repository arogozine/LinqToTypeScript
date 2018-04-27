import { asAsync, asPromise, expectAsync, itAsync, itEnumerableAsync, itParallel } from "./../TestHelpers"

describe("AnyAsync", () => {
    itEnumerableAsync("Empty", async (asEnumerable) => {
        const array = asEnumerable([])

        expect(await array.anyAsync((_) => asPromise(true))).toBe(false)
        expect(await array.anyAsync((_) => asPromise(false))).toBe(false)
    })

    itAsync("EmptyAsync", async () => {
        const array = asAsync([])

        expect(await array.anyAsync((_) => asPromise(true))).toBe(false)
        expect(await array.anyAsync((_) => asPromise(false))).toBe(false)
    })

    itParallel("EmptyParallel", async (asParallel) => {
        const array = asParallel([])

        expect(await array.anyAsync((_) => asPromise(true))).toBe(false)
        expect(await array.anyAsync((_) => asPromise(false))).toBe(false)
    })

    itEnumerableAsync("AnyExists", async (asEnumerable) => {
        const array = asEnumerable([1, 2])

        expect(await array.anyAsync((_) => asPromise(true))).toBe(true)
        expect(await array.anyAsync((_) => asPromise(false))).toBe(false)

        expect(await array.anyAsync((x) => asPromise(x === 1))).toBe(true)
        expect(await array.anyAsync((x) => asPromise(x === 2))).toBe(true)
    })

    itAsync("AnyExistsAsync", async () => {
        const array = asAsync([1, 2])

        expect(await array.anyAsync((_) => asPromise(true))).toBe(true)
        expect(await array.anyAsync((_) => asPromise(false))).toBe(false)

        expect(await array.anyAsync((x) => asPromise(x === 1))).toBe(true)
        expect(await array.anyAsync((x) => asPromise(x === 2))).toBe(true)
    })

    itParallel("AnyExistsParallel", async (asParallel) => {
        const array = asParallel([1, 2])

        expect(await array.anyAsync((_) => asPromise(true))).toBe(true)
        expect(await array.anyAsync((_) => asPromise(false))).toBe(false)

        expect(await array.anyAsync((x) => asPromise(x === 1))).toBe(true)
        expect(await array.anyAsync((x) => asPromise(x === 2))).toBe(true)
    })
})
