import { EqualityComparer } from "linq-to-typescript"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("sequenceEquals", () => {
    itEnumerable("Sequence Equals Basic", (asEnumerable) => {
        const sequenceEquals = asEnumerable([1, 2, 3, 4, 5])
            .sequenceEquals(asEnumerable([1, 2, 3, 4, 5]))
        expect(sequenceEquals).toBe(true)
    })

    itAsync("Sequence Equals Basic", async () => {
        const sequenceEquals = await asAsync([1, 2, 3, 4, 5])
            .sequenceEquals(asAsync([1, 2, 3, 4, 5]))
        expect(sequenceEquals).toBe(true)
    })

    itParallel("Sequence Equals Basic", async (asParallel) => {
        const sequenceEquals = await asParallel([1, 2, 3, 4, 5])
            .sequenceEquals(asParallel([1, 2, 3, 4, 5]))
        expect(sequenceEquals).toBe(true)
    })

    itEnumerable<string | number>("Sequence Equals Weak Comparer Basic", (asEnumerable) => {
        const sequenceEquals = asEnumerable([1, "2", 3, 4, "5"])
            .sequenceEquals(asEnumerable([1, 2, 3, "4", 5]), EqualityComparer)
        expect(sequenceEquals).toBe(true)
    })

    itAsync("Sequence Equals Weak Comparer Basic", async () => {
        const sequenceEquals = await asAsync(["1", "2", 3, 4, 5])
            .sequenceEquals(asAsync([1, 2, 3, 4, "5"]), EqualityComparer)
        expect(sequenceEquals).toBe(true)
    })

    itParallel<string | number>("Sequence Equals Weak Comparer Basic", async (asParallel) => {
        const sequenceEquals = await asParallel([1, 2, 3, "4", "5"])
            .sequenceEquals(asParallel(["1", "2", "3", 4, 5]), EqualityComparer)
        expect(sequenceEquals).toBe(true)
    })
})
