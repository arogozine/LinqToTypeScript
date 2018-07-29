import { asAsync, itAsync, itEnumerableAsync } from "./../TestHelpers"

describe("asParallel", () => {
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
