import { itEnumerableAsync, itParallel } from "./../TestHelpers"

describe("asAsync", () => {
    itEnumerableAsync("Basic", async (asIEnumerable) => {
        const values = [1, 2, 3]
        const valuesTwo = await asIEnumerable(values).asAsync().toArray()
        expect(valuesTwo).toEqual(values)
    })

    itParallel("Basic", async (asParallel) => {
        const values = [1, 2, 3]
        const valuesTwo = await asParallel(values).asAsync().toArray()
        expect(valuesTwo).toEqual(values)
    })
})
