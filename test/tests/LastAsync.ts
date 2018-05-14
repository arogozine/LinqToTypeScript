import { InvalidOperationException } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("LastAsync", () => {
    itEnumerableAsync("LastPredicate", async (asEnumerable) => {
        expect(await  asEnumerable([1, 2]).lastAsync(async (x) => x === 1)).toBe(1)
    })

    itAsync("LastPredicateAsync", async () => {
        expect(await asAsync([1, 2]).lastAsync(async (x) => x === 1)).toBe(1)
    })

    itParallel("LastPredicateParallel", async (asParallel) => {
        expect(await asParallel([1, 2]).lastAsync(async (x) => x === 1)).toBe(1)
    })
})
