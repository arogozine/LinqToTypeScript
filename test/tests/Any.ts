import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "./../TestHelpers"

describe("any", () => {
    itEnumerable("Empty", (asEnumerable) => {
        const array = asEnumerable([])

        expect(array.any()).toBe(false)
        expect(array.any((_) => true)).toBe(false)
        expect(array.any((_) => false)).toBe(false)
    })

    itAsync("Empty", async () => {
        const array = asAsync([])

        expect(await array.any()).toBe(false)
        expect(await array.any((_) => true)).toBe(false)
        expect(await array.any((_) => false)).toBe(false)
    })

    itParallel("Empty", async (asParallel) => {
        const array = asParallel([])

        expect(await array.any()).toBe(false)
        expect(await array.any((_) => true)).toBe(false)
        expect(await array.any((_) => false)).toBe(false)
    })

    itEnumerable("AnyExists", (asEnumerable) => {
        const array = asEnumerable([1, 2])

        expect(array.any()).toBe(true)
        expect(array.any((_) => true)).toBe(true)
        expect(array.any((_) => false)).toBe(false)

        expect(array.any((x) => x === 1)).toBe(true)
        expect(array.any((x) => x === 2)).toBe(true)
    })

    itAsync("AnyExists", async () => {
        const array = asAsync([1, 2])

        expect(await array.any()).toBe(true)
        expect(await array.any((_) => true)).toBe(true)
        expect(await array.any((_) => false)).toBe(false)

        expect(await array.any((x) => x === 1)).toBe(true)
        expect(await array.any((x) => x === 2)).toBe(true)
    })

    itParallel("AnyExists", async (asParallel) => {
        const array = asParallel([1, 2])

        expect(await array.any()).toBe(true)
        expect(await array.any((_) => true)).toBe(true)
        expect(await array.any((_) => false)).toBe(false)

        expect(await array.any((x) => x === 1)).toBe(true)
        expect(await array.any((x) => x === 2)).toBe(true)
    })

    itEnumerable("basic", (asEnumerable) => {
        expect(asEnumerable([1]).any()).toBe(true)
    })

    itAsync("basic", async () => {
        expect(await asAsync([1]).any()).toBe(true)
    })

    itParallel("basic", async (asParallel) => {
        expect(await asParallel([1]).any()).toBe(true)
    })

    itEnumerable("EmptyPredicate", (asEnumerable) => {
        expect(asEnumerable([]).any((x) => x === 0)).toBe(false)
    })

    itAsync("EmptyPredicate", async () => {
        const expect = await expectAsync(asAsync([]).any((x) => x === 0))
        expect.toBe(false)
    })

    itParallel("EmptyPredicate", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).any((x) => x === 0))
        expect.toBe(false)
    })

    itEnumerable("BasicPredicate", (asEnumerable) => {
        expect(asEnumerable([1]).any((x) => x === 1)).toBe(true)
        expect(asEnumerable([1]).any((x) => x === 0)).toBe(false)
    })

    itAsync("BasicPredicate", async () => {
        expect(await asAsync([1]).any((x) => x === 1)).toBe(true)
        expect(await asAsync([1]).any((x) => x === 0)).toBe(false)
    })

    itParallel("BasicPredicate", async (asParallel) => {
        expect(await asParallel([1]).any((x) => x === 1)).toBe(true)
        expect(await asParallel([1]).any((x) => x === 0)).toBe(false)
    })
})
