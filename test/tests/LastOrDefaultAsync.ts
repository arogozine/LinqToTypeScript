import { asAsync, asParallel, asPromise, itAsync, itEnumerableAsync } from "../TestHelpers"

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

    itAsync("IParallelEnumerable", async () => {
        expect(await asParallel([1, 2, 3]).lastOrDefaultAsync((x) => asPromise(x === 4))).toBeNull()
    })
})
