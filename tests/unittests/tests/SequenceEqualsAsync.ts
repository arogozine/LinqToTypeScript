import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

// tslint:disable-next-line:triple-equals
const AsyncEqualityComparer = async <T>(x: T, y: T) => x == y

describe("sequenceEqualsAsync", () => {
    itEnumerableAsync<string | number>("Sequence Equals Basic", async (asEnumerable) => {
        const sequenceEquals = await asEnumerable([1, "2", 3, 4, "5"])
            .sequenceEqualsAsync(asEnumerable([1, 2, 3, "4", 5]), AsyncEqualityComparer)
        expect(sequenceEquals).toBe(true)
    })

    itAsync("Sequence Equals Basic", async () => {
        const sequenceEquals = await asAsync(["1", "2", 3, 4, 5])
            .sequenceEqualsAsync(asAsync([1, 2, 3, 4, "5"]), AsyncEqualityComparer)
        expect(sequenceEquals).toBe(true)
    })

    itParallel<string | number>("Sequence Equals Basic", async (asParallel) => {
        const sequenceEquals = await asParallel([1, 2, 3, "4", "5"])
            .sequenceEqualsAsync(asParallel(["1", "2", "3", 4, 5]), AsyncEqualityComparer)
        expect(sequenceEquals).toBe(true)
    })
})
