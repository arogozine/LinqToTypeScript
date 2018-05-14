import { asAsync, itAsync, itEnumerableAsync, itParallel } from "./../TestHelpers"

describe("countAsync", () => {
    itEnumerableAsync<boolean>("Count", async (asEnumerable) => {
        const array = asEnumerable([true, true, false])

        expect(await array.countAsync(async (x) => x)).toBe(2)
        expect(await array.countAsync(async (x) => !x)).toBe(1)
    })

    itAsync("Count Async", async () => {
        const array = asAsync([true, true, false])

        expect(await array.countAsync(async (x) => x)).toBe(2)
        expect(await array.countAsync(async (x) => !x)).toBe(1)
    })

    itParallel<boolean>("Count Parallel", async (asParallel) => {
        const array = asParallel([true, true, false])

        expect(await array.countAsync(async (x) => x)).toBe(2)
        expect(await array.countAsync(async (x) => !x)).toBe(1)

    })
})
