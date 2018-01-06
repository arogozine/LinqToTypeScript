import { InvalidOperationException } from "../../src/index"
import { asAsync, asParallel, asPromise, expectAsync, itAsync, itEnumerableAsync } from "../TestHelpers"

describe("LastAsync", () => {
    itEnumerableAsync("LastPredicate", async (asEnumerable) => {
        expect(await  asEnumerable([1, 2]).lastAsync((x) => asPromise(x === 1))).toBe(1)
    })

    itAsync("LastPredicateAsync", async () => {
        expect(await asAsync([1, 2]).lastAsync((x) => asPromise(x === 1))).toBe(1)
    })

    itAsync("LastPredicateParallel", async () => {
        expect(await asParallel([1, 2]).lastAsync((x) => asPromise(x === 1))).toBe(1)
    })
})
