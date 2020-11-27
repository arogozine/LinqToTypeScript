import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "./../TestHelpers"

describe("count", () => {

    it("String", () => {
        expect("abc".count()).toBe(3)
        expect("a b c".count(x => x !== " ")).toBe(3)
    })

    itEnumerable<boolean>("Count Predicate", (asEnumerable) => {
        const array = asEnumerable([true, true, false])

        expect(array.count((x) => x)).toBe(2)
        expect(array.count((x) => !x)).toBe(1)
    })

    itAsync("Count Predicate", async () => {
        const array = asAsync([true, true, false])

        expect(await array.count((x) => x)).toBe(2)
        expect(await array.count((x) => !x)).toBe(1)
    })

    itParallel<boolean>("Count Predicate", async (asParallel) => {
        const array = asParallel([true, true, false])

        expect(await array.count((x) => x)).toBe(2)
        expect(await array.count((x) => !x)).toBe(1)
    })

    itEnumerable("Empty array to be zero", (asEnumerable) =>
        expect(asEnumerable([]).count()).toBe(0))

    itAsync("Empty array to be zero", async () =>
        (await expectAsync(asAsync([]).count())).toBe(0))

    itParallel("Empty array to be zero", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).count())
        expect.toBe(0)
    })

    itEnumerable("Single element array to be one", (asEnumerable) =>
        expect(asEnumerable([1]).count()).toBe(1))

    itAsync("Single element array to be one", async () =>
        expect(await asAsync([1]).count()).toBe(1))

    itParallel("Single element array to be one", async (asParallel) =>
        expect(await asParallel([1]).count()).toBe(1))
})
