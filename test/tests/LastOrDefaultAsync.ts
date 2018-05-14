import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("lastOrDefaultAsync", () => {
    itEnumerableAsync("IEnumerable", async (asEnumerable) => {
        expect(await asEnumerable([1, 2, 3]).lastOrDefaultAsync(async (x) => x === 4))
            .toBeNull()
        expect(await  asEnumerable([1, 2]).lastOrDefaultAsync(async (x) => x === 1))
            .toBe(1)
    })

    itAsync("IAsyncEnumerable", async () => {
        expect(await asAsync([1, 2, 3]).lastOrDefaultAsync(async (x) => x === 4)).toBeNull()
    })

    itParallel("IParallelEnumerable", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).lastOrDefaultAsync(async (x) => x === 4)).toBeNull()
    })
})
