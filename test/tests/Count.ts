import { asAsync, asParallel, expectAsync, itAsync, itEnumerable } from "./../TestHelpers"

describe("count", () => {
    itEnumerable<boolean>("Count Predicate", (asEnumerable) => {
        const array = asEnumerable([true, true, false])

        expect(array.count((x) => x)).toBe(2)
        expect(array.count((x) => !x)).toBe(1)
    })

    itAsync("CountPredicateAsync", async () => {
        const array = asAsync([true, true, false])

        expect(await array.count((x) => x)).toBe(2)
        expect(await array.count((x) => !x)).toBe(1)
    })

    itEnumerable("empty array to be zero", (asEnumerable) =>
        expect(asEnumerable([]).count()).toBe(0))

    itAsync("empty array to be zero async", async () =>
        (await expectAsync(asAsync([]).count())).toBe(0))

    itEnumerable("single element array to be one", (asEnumerable) =>
        expect(asEnumerable([1]).count()).toBe(1))

    itAsync("single element array to be one Async", async () =>
        expect(await asAsync([1]).count()).toBe(1))
})
