import { asAsync, expectAsync, itAsync, itEnumerable, itEnumerableAsync } from "./../TestHelpers"

describe("AsParallel", () => {
    itEnumerableAsync("SyncBecomesParallel", async (asIEnumerable) => {
        const values = [1, 2, 3]
        const valuesTwo = await asIEnumerable(values).asParallel().toArray()
        expect(valuesTwo).toEqual(values)
    })

    itAsync("AsyncBecomesParallel", async () => {
        const value = asAsync([1, 2, 3]).asParallel()
        const items = await value.toArray()
        expect(items).toEqual([1, 2, 3])
    })
})
