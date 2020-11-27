import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("containsAsync", () => {
    // tslint:disable-next-line:triple-equals
    const EqualityComparer = async <T>(a: T, b: T) => a == b

    itEnumerableAsync<string | number>("Contains With Comparer", async (asEnumerable) => {
        const array = asEnumerable([1, "2", "3"])

        expect(await array.containsAsync(2, EqualityComparer)).toBe(true)
        expect(await array.containsAsync("2", EqualityComparer)).toBe(true)
        expect(await array.containsAsync(4, EqualityComparer)).toBe(false)
    })

    itAsync("Contains With Comparer", async () => {
        const array = asAsync([1, "2", "3"])

        expect(await array.containsAsync(2, EqualityComparer)).toBe(true)
        expect(await array.containsAsync("2", EqualityComparer)).toBe(true)
        expect(await array.containsAsync(4, EqualityComparer)).toBe(false)
    })

    itParallel<string | number>("Contains With Comparer", async (asParallel) => {
        const array = asParallel([1, "2", "3"])

        expect(await array.containsAsync(2, EqualityComparer)).toBe(true)
        expect(await array.containsAsync("2", EqualityComparer)).toBe(true)
        expect(await array.containsAsync(4, EqualityComparer)).toBe(false)
    })
})
