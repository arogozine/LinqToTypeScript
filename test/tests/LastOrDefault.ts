import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("lastOrDefault", () => {
    itEnumerable("LastOrDefault", (asEnumerable) => {
        expect(asEnumerable([]).lastOrDefault()).toBeNull()
    })

    itAsync("LastOrDefaultAsync", async () => {
        expect(await asAsync([]).lastOrDefault()).toBeNull()
    })

    itAsync("LastOrDefaultParallel", async () => {
        expect(await asParallel([]).lastOrDefault()).toBeNull()
    })

    itEnumerable("LastOrDefaultPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()

        expect(asEnumerable([1, 2, 3]).lastOrDefault((x) => x === 3)).toBe(3)
    })

    itAsync("LastOrDefaultPredicateAsync", async () => {
        expect(await asAsync([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()
        expect(await asAsync([1, 2, 3]).lastOrDefault((x) => x === 3)).toBe(3)

    })

    itAsync("LastOrDefaultPredicateParallel", async () => {
        expect(await asParallel([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()
        expect(await asParallel([1, 2, 3]).lastOrDefault((x) => x === 3)).toBe(3)
    })
})
