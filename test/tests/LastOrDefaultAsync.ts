import { asAsync, asPromise, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("lastOrDefaultAsync", () => {
    itEnumerableAsync("IEnumerable", async (asEnumerable) => {
        expect(await asEnumerable([1, 2, 3]).lastOrDefaultAsync((x) => asPromise(x === 4)))
            .toBeNull()
        expect(await  asEnumerable([1, 2]).lastOrDefaultAsync((x) => asPromise(x === 1)))
            .toBe(1)
    })

    itAsync("IAsyncEnumerable", async () => {
        expect(await asAsync([1, 2, 3]).lastOrDefaultAsync((x) => asPromise(x === 4))).toBeNull()
    })

    itParallel("IParallelEnumerable", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).lastOrDefaultAsync((x) => asPromise(x === 4))).toBeNull()
    })
})
