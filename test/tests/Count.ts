import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "./../TestHelpers"

describe("count", () => {
    itEnumerable<boolean>("Count Predicate", (asEnumerable) => {
        const array = asEnumerable([true, true, false])

        expect(array.count((x) => x)).toBe(2)
        expect(array.count((x) => !x)).toBe(1)
    })

    itAsync("Count Predicate Async", async () => {
        const array = asAsync([true, true, false])

        expect(await array.count((x) => x)).toBe(2)
        expect(await array.count((x) => !x)).toBe(1)
    })

    itParallel<boolean>("Count Predicate Async", async (asParallel) => {
        const array = asParallel([true, true, false])

        expect(await array.count((x) => x)).toBe(2)
        expect(await array.count((x) => !x)).toBe(1)
    })

    itEnumerable("empty array to be zero", (asEnumerable) =>
        expect(asEnumerable([]).count()).toBe(0))

    itAsync("empty array to be zero async", async () =>
        (await expectAsync(asAsync([]).count())).toBe(0))

    itParallel("empty array to be zero async", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).count())
        expect.toBe(0)
    })

    itEnumerable("single element array to be one", (asEnumerable) =>
        expect(asEnumerable([1]).count()).toBe(1))

    itAsync("single element array to be one Async", async () =>
        expect(await asAsync([1]).count()).toBe(1))

    itParallel("single element array to be one Async", async (asParallel) =>
        expect(await asParallel([1]).count()).toBe(1))
})
