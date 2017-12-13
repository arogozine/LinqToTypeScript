import { asAsync, expectAsync, itAsync, itEnumerable } from "./../TestHelpers"

describe("AsParallel", () => {
    itAsync("Basic", async () => {
        const value = asAsync([1, 2, 3]).asParallel()
        const items = await value.toArray()
        expect(items).toEqual([1, 2, 3])
    })
})
